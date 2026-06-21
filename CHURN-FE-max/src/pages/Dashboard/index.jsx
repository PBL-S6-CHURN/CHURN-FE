import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout/";
import "./style.css";
import { getCustomerChurnStats, getCustomerRetentionStats, getCustomerRiskStats, getCustomers, getCustomersByType, getCustomerStats, searchCustomers, streamCustomerPredictions } from "../../api/customerApi";

// kumpulan component
import ChurnStatusCountCard from "../../components/DashboardComponents/ChurnStatusCountCard";
import RiskCountChurn from "../../components/DashboardComponents/RiskCountChurn";
import PlanPercentageCard from "../../components/DashboardComponents/PlanPercentageCard";
import CustomerTable from "../../components/DashboardComponents/CustomerTable";
import Pagination from "../../components/DashboardComponents/Pagination";
import SearchInput from "../../components/DashboardComponents/SearchInput";
import CustomSelect from "../../components/DashboardComponents/CustomSelect";
import LoadingScreen from "../../components/LoadingScreen";

function Dashboard({
  onProfileClick,
  adminData,
  onViewDetail,
  onNavChange
}) {
  const [customers, setCustomers] = useState([]);
  const [planStats, setPlanStats] = useState([]);
  const [churnStats, setChurnStats] = useState({ stayed: 0, churned: 0 });
  const [riskStats, setRiskStats] = useState({ low: 0, medium: 0, high: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [loading, setLoading] = useState(false);

  const planOptions = [
    { value: "starter",      label: "Starter" },
    { value: "professional", label: "Professional" },
    { value: "enterprise",   label: "Enterprise" },
  ];

  const riskOptions = [
    { value: "low",    label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high",   label: "High" },
  ];

  const getData = async () => {
    if (loading) return;
    setLoading(true);

    const startTime = Date.now();

    try {
      let response;
      if (searchTerm) {
        response = await searchCustomers(searchTerm, currentPage);
      } else if (selectedType) {
        response = await getCustomersByType(selectedType, currentPage);
      } else if (selectedRisk) {
        response = await getCustomerRetentionStats(selectedRisk, currentPage);
      } else {
        response = await getCustomers(currentPage);
      }

      // Ambil Array Customer
      let rawCustomers = [];
      if (response.data?.message?.customers) {
        rawCustomers = response.data.message.customers;
      } else if (Array.isArray(response.data)) {
        rawCustomers = response.data;
      }

      const totalPagesFromMeta =
        response.metadata?.total_pages ||
        response.data?.message?.totalPages ||
        1;

      if (rawCustomers.length > 0) {
        const normalizedCustomers = rawCustomers.map((customer) => {
          const prediction = customer.prediction_results || {};
          console.log(prediction);

          const isChurn =
            customer.score == 1 || prediction.score == 1;

          console.log(
            `ID: ${customer.customer_id} | Root Score: ${customer.score} | Pred Score: ${prediction.score}`
          );

          // ── RAW SCORE (SVM decision_function) ──────────────────────────────
          const rawRiskScore =
            customer.risk_score !== undefined
              ? customer.risk_score
              : (prediction.risk_score_pct ?? 0);

          // ── PLATT SCORE (predict_proba, 0–100%) ────────────────────────────
          // Backend mengembalikan platt_score_pct di dalam prediction_results
          const plattScorePct =
            customer.platt_score_pct !== undefined
              ? customer.platt_score_pct
              : (prediction.platt_score_pct ?? null);

          return {
            ...customer,
            customer_id: customer.customer_id || customer.customer_code,
            risk:        customer.risk || prediction.risk_level || "UNKNOWN",
            churn:       isChurn ? "YES" : "NO",

            // Raw SVM score — 6 desimal, bisa negatif
            risk_score:     Number(rawRiskScore).toFixed(6),

            // Platt probability 0–100%, 2 desimal
            // Tampil "-" jika backend belum mengirim field ini
            platt_score_pct: plattScorePct !== null
              ? `${Number(plattScorePct).toFixed(2)}%`
              : "-",

            cause:    customer.cause    || (prediction.churn_factors ? prediction.churn_factors.join(", ") : ""),
            solution: customer.solution || (prediction.solutions     ? prediction.solutions.join(", ")     : "")
          };
        });

        setCustomers(normalizedCustomers);
        setTotalPages(totalPagesFromMeta);
      } else {
        setCustomers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error mengambil data:", error);
      setCustomers([]);
      setTotalPages(1);
    } finally {
      const duration    = Date.now() - startTime;
      const minDuration = 600;
      if (duration < minDuration) {
        setTimeout(() => setLoading(false), minDuration - duration);
      } else {
        setLoading(false);
      }
    }
  };

  const getStatsData = async () => {
    try {
      const planRes = await getCustomerStats();
      setPlanStats(planRes.data.message);

      const churnRes = await getCustomerChurnStats();
      if (churnRes.data?.message?.summary) {
        const summary = churnRes.data.message.summary;
        setChurnStats({
          stayed:  summary.not_churn || 0,
          churned: summary.churn     || 0,
        });
      }

      const riskRes = await getCustomerRiskStats();
      if (riskRes.data?.summary) {
        setRiskStats({
          low:    riskRes.data.summary.low    || 0,
          medium: riskRes.data.summary.medium || 0,
          high:   riskRes.data.summary.high   || 0,
        });
      }
    } catch (error) {
      console.error("Gagal memuat statistik database:", error);
    }
  };

  // SSE — hanya untuk update card statistik
  useEffect(() => {
    setLoading(true);
    console.log("🔌 Membuka koneksi SSE...");

    getData();

    const closeStream = streamCustomerPredictions(
      (newData) => {
        console.log("SSE Log: Memproses", newData.customer_code);
        getStatsData();
      },
      (error) => {
        console.error("Koneksi stream terputus.");
      }
    );

    return () => { closeStream(); };
  }, []);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedType, selectedRisk]);
  useEffect(() => { getStatsData(); },  []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => { getData(); }, 500);
    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm, selectedType, selectedRisk]);

  return (
    <MainLayout
      title="Dashboard"
      activeNav="dashboard"
      onNavChange={onNavChange}
      adminData={adminData}
      onViewDetail={onViewDetail}
      onProfileClick={onProfileClick}
    >
      {loading && <LoadingScreen message="Progress..." />}

      {/* STATS */}
      <div className="stats-container">
        <div className="card churn-card">
          <h3>Churn Status</h3>
          <div className="churn-content">
            <ChurnStatusCountCard styleCard="churn-box-white"  titleCount="Stayed"  countChurn={churnStats.stayed}  />
            <ChurnStatusCountCard styleCard="churn-box-maroon" titleCount="Churned" countChurn={churnStats.churned} />
          </div>
        </div>

        <div className="risk-card">
          <div className="risk-header">Risk Category Count</div>
          <div className="risk-sections-container">
            <RiskCountChurn colorRisk="low"    titleRisk="Low"    countRisk={riskStats.low}    />
            <RiskCountChurn colorRisk="medium" titleRisk="Medium" countRisk={riskStats.medium} />
            <RiskCountChurn colorRisk="high"   titleRisk="High"   countRisk={riskStats.high}   />
          </div>
        </div>
      </div>

      {/* PLAN TYPE */}
      <div className="card plan-card-new">
        <h3>Plan Type Category</h3>
        {planStats.map((plan) => (
          <PlanPercentageCard
            key={plan.plan_name}
            plan_name={plan.plan_name}
            total_count={plan.total_count}
            percentage={plan.percentage}
          />
        ))}
      </div>

      {/* TOOLS + TABLE */}
      <div className="table-header-tools" style={{ marginTop: "50px" }}>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
          iconSearch="material-symbols:search"
        />
        <CustomSelect
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          options={planOptions}
          defaultLabel="Filter by Plan Type"
        />
        <CustomSelect
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value)}
          options={riskOptions}
          defaultLabel="Filter by Risk"
        />
      </div>

      {/*
        CustomerTable menerima prop `customers` yang kini punya field tambahan:
          risk_score      → raw SVM score (string 6 desimal, bisa negatif)
          platt_score_pct → probabilitas churn "xx.xx%" atau "-"
        Pastikan CustomerTable menampilkan kedua kolom ini berdampingan.
      */}
      <CustomerTable customers={customers} onViewDetail={onViewDetail} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </MainLayout>
  );
}

export default Dashboard;