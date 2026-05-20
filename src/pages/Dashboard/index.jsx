import { useState, useMemo, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout/";
import "./style.css";
import { getCustomers, getCustomersByType, getCustomerStats, searchCustomers } from "../../api/customerApi";

// kompulan component
import ChurnStatusCountCard from "../../components/DashboardComponents/ChurnStatusCountCard";
import RiskCountChurn from "../../components/DashboardComponents/RiskCountChurn";
import PlanPercentageCard from "../../components/DashboardComponents/PlanPercentageCard";
import CustomerTable from "../../components/DashboardComponents/CustomerTable";
import Pagination from "../../components/DashboardComponents/Pagination";
import SearchInput from "../../components/DashboardComponents/SearchInput";
import CustomSelect from "../../components/DashboardComponents/CustomSelect";

function Dashboard({
  onProfileClick,
  adminData,
  onViewDetail,
  onNavChange
}) {
  const [customers, setCustomers] = useState([]);
  const [planStats, setPlanStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [loading, setLoading] = useState(false);
  // Data opsi untuk Plan Type
  const planOptions = [
    { value: "starter", label: "Starter" },
    { value: "professional", label: "Professional" },
    { value: "enterprise", label: "Enterprise" },
  ];

  // Data opsi untuk Risk (bisa dikembangkan nanti statenya)
  const riskOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      let response;

      if (searchTerm) {
        response = await searchCustomers(searchTerm, currentPage);
      } else if(selectedType) {
        response = await getCustomersByType(selectedType, currentPage) 
      } else {
        response = await getCustomers(currentPage);
      }

      setCustomers(response.data);
      setTotalPages(response.metadata.total_pages);
    } catch (error) {
      // Melempar error agar bisa ditangkap oleh komponen UI
      throw error.response?.data?.message || "Terjadi kesalahan saat mengambil data pelanggan";
    }
  }

  const getStatsData = async () => {
    try {
      const response = await getCustomerStats();
      setPlanStats(response.data.message);
    } catch (error) {
      // Melempar error agar bisa ditangkap oleh komponen UI
      throw error.response?.data?.message || "Terjadi kesalahan saat mengambil data statistik pelanggan";
    }
  }

  const allData = useMemo(() => {
    const plans = ["Starter", "Enterprise", "Professional"];
    const risks = ["Low", "Medium", "High"];
    return Array.from({ length: 40 }, (_, i) => ({
      id: `C-00${(i + 1).toString().padStart(2, "0")}`,
      plan: plans[Math.floor(Math.random() * plans.length)],
      contract: Math.random() > 0.5 ? "Monthly" : "Annual",
      tenure: Math.floor(Math.random() * 24) + 1,
      revenue: (Math.random() * 500 + 50).toFixed(2),
      users: Math.floor(Math.random() * 50) + 5,
      hours: (Math.random() * 200 + 20).toFixed(2),
      feature: (Math.random() * 100).toFixed(1),
      delay: Math.floor(Math.random() * 10),
      support: Math.floor(Math.random() * 15),
      nps: Math.floor(Math.random() * 10),
      score: Math.floor(Math.random() * 100),
      risk: risks[Math.floor(Math.random() * risks.length)],
      churn: Math.random() > 0.7 ? "Yes" : "No",
    }));
  }, []);

  const stayedCount = allData.filter((item) => item.churn === "No").length;
  const churnedCount = allData.filter((item) => item.churn === "Yes").length;
  const lowRiskCount = allData.filter((item) => item.risk === "Low").length;
  const medRiskCount = allData.filter((item) => item.risk === "Medium").length;
  const highRiskCount = allData.filter((item) => item.risk === "High").length;

  useEffect(() => {
    getStatsData();
  }, []);

  // Jalankan setiap kali currentPage berubah
  useEffect(() => {
    // Memberikan sedikit jeda (debounce) agar tidak menembak API setiap huruf diketik
    const delayDebounce = setTimeout(() => {
      getData();
    }, 500); // 500ms jeda

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm, selectedType]);


  return (
    <MainLayout
      title="Dashboard"
      activeNav="dashboard"
      onNavChange={onNavChange}
      adminData={adminData}
      onViewDetail={onViewDetail}
      onProfileClick={onProfileClick}
    >
      {/* STATS, PLAN TYPE, TOOLS, TABLE */}
      <div className="stats-container">
        <div className="card churn-card">
          <h3>Churn Status</h3>
          <div className="churn-content">
            <ChurnStatusCountCard styleCard="churn-box-white" titleCount="Stayed" countChurn={stayedCount} />
            <ChurnStatusCountCard styleCard="churn-box-maroon" titleCount="Churned" countChurn={churnedCount} />
          </div>
        </div>
        <div class="risk-card">
          <div class="risk-header">Risk Category Count</div>

          <div class="risk-sections-container">
            <RiskCountChurn colorRisk="low" titleRisk="Low" countRisk={lowRiskCount} />
            <RiskCountChurn colorRisk="medium" titleRisk="Medium" countRisk={medRiskCount} />
            <RiskCountChurn colorRisk="high" titleRisk="High" countRisk={highRiskCount} />
          </div>
        </div>
      </div>

      <div className="card plan-card-new">
        <h3>Plan Type Category</h3>
        {planStats.map((plan) => (
          <PlanPercentageCard plan_name={plan.plan_name} total_count={plan.total_count} percentage={plan.percentage} />
        ))}
      </div>

      <div className="table-header-tools" style={{ marginTop: "50px" }}>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} iconSearch="material-symbols:search" />
        <CustomSelect value={selectedType} onChange={(e) => setSelectedType(e.target.value)} options={planOptions} defaultLabel="Filter by Plan Type" />
        <CustomSelect value={selectedRisk} onChange={(e) => setSelectedRisk(e.target.value)} options={riskOptions} defaultLabel="Filter by Risk" />
      </div>

      <CustomerTable customers={customers} onViewDetail={onViewDetail} />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </MainLayout>
  );
}

export default Dashboard;