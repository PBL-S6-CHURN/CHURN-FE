import { useState, useMemo, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout/";
import { Icon } from "@iconify/react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getCustomers, getCustomersByType, getCustomerStats, searchCustomers } from "../../api/customerApi";

function Dashboard({
  onProfileClick,
  adminData,
  onViewDetail,
  onNavChange,
  handleLogout
}) {
  const [customers, setCustomers] = useState([]);
  const [planStats, setPlanStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      onLogout={handleLogout}
      adminData={adminData}
      highRiskCustomers={[]}
      onViewDetail={onViewDetail}
      onProfileClick={onProfileClick}
    >
      {/* STATS, PLAN TYPE, TOOLS, TABLE */}
      <div className="stats-container">
        <div className="card churn-card">
          <h3>Churn Status</h3>
          <div className="churn-content">
            <div className="churn-box-white">
              <span>Stayed</span>
              <span className="number">{stayedCount}</span>
            </div>
            <div className="churn-box-maroon">
              <span>Churned</span>
              <span className="number">{churnedCount}</span>
            </div>
          </div>
        </div>
        <div class="risk-card">
          <div class="risk-header">Risk Category Count</div>

          <div class="risk-sections-container">
            <div class="risk-section">
              <span class="risk-label low">Low</span>
              <span class="risk-count">{lowRiskCount}</span>
            </div>

            <div class="risk-section">
              <span class="risk-label medium">Medium</span>
              <span class="risk-count">{medRiskCount}</span>
            </div>

            <div class="risk-section">
              <span class="risk-label high">High</span>
              <span class="risk-count">{highRiskCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card plan-card-new">
        <h3>Plan Type Category</h3>
        {planStats.map((plan) => (
          <div className="plan-item">
            <div className="plan-info">
              <span>{plan.plan_name}</span>
              <span>{plan.total_count} Customer</span>
            </div>
            <div className="progress-container">
              <div
                className="progress-bar-maroon"
                style={{ width: `${plan.percentage}%` }}
              ></div>
            </div>
            <span className="percent">{Math.round(plan.percentage)}%</span>
          </div>
        ))}
      </div>

      <div className="table-header-tools" style={{ marginTop: "50px" }}>
        <div className="search-bar-new">
          <Icon
            icon="material-symbols:search"
            width="24"
            height="24"
            color="#610000"
          />
          <input
            type="text"
            placeholder="Search ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div class="custom-select">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value)
              setSearchTerm('')
              setCurrentPage(1)
            }}
          >
            <option value="" selected>
              Filter by Plan Type
            </option>
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <span class="custom-arrow"></span>
        </div>

        <div class="custom-select">
          <select>
            <option value="" selected>
              Filter by Risk
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span class="custom-arrow"></span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer_id</th>
              <th>Plan Type</th>
              <th>Contract Type</th>
              <th>Tenure Months</th>
              <th>Monthly Revenue</th>
              <th>Total Users</th>
              <th>Monthly Usage Hours</th>
              <th>Feature Adoption Pct</th>
              <th>Payment Delay Count</th>
              <th>Support Tickets Last 90d</th>
              <th>NPS Score</th>
              <th>Score</th>
              <th>Risk</th>
              <th>Churn</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((row) => (
              <tr key={row.id}>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onViewDetail(row);
                    navigate(`/detail/${row.id}`);
                  }}
                  className="clickable-id"
                >
                  {row.customer_id}
                </td>
                <td>{row.plan_name}</td>
                <td>{row.contract_name}</td>
                <td className="text-center">{row.tenure_months} m</td>
                <td className="text-center">${row.monthly_revenue}</td>
                <td className="text-center">{row.total_users}</td>
                <td className="text-center">{row.monthly_usage_hrs}h</td>
                <td className="text-center">{row.feature_adoption_pct} %</td>
                <td className="text-center">{row.payment_delay_count}</td>
                <td className="text-center">{row.support_ticket_last_90d}</td>
                <td className="text-center">{row.nps_score}</td>
                <td className="text-center">100</td>
                {/* <td
                  className={`text-center risk-text ${row.risk.toLowerCase()}`}
                >
                  high
                </td> */}
                <td
                  className={`text-center risk-text high`}
                >
                  High
                </td>
                <td className="text-center">Yes</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-new">
        <div className="pages">
          <span
            className="nav-arrow"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            style={{ cursor: "pointer" }}
          >
            ‹
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active-p" : ""}
              style={{ cursor: "pointer" }}
            >
              {i + 1}
            </span>
          ))}
          <span
            className="nav-arrow"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            style={{ cursor: "pointer" }}
          >
            ›
          </span>
        </div>
        <div className="page-info">
          Page {currentPage} of {totalPages || 1}
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
