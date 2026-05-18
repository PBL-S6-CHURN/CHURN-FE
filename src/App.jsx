import { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [adminData, setAdminData] = useState(null);

  // --- DATA SENTRAL (Agar Dashboard & Summarize sinkron) ---
  const allData = useMemo(() => {
    const plans = ["Starter", "Enterprise", "Professional"];
    const risks = ["Low", "Medium", "High"];
    return Array.from({ length: 40 }, (_, i) => ({
      id: `C-00${(i + 1).toString().padStart(2, "0")}`,
      plan: plans[Math.floor(Math.random() * plans.length)],
      contract: Math.random() > 0.5 ? "Monthly" : "Annual",
      users: Math.floor(Math.random() * 50) + 5,
      hours: (Math.random() * 200 + 20).toFixed(2),
      feature: (Math.random() * 100).toFixed(1),
      delay: Math.floor(Math.random() * 10),
      score: Math.floor(Math.random() * 100),
      risk: risks[Math.floor(Math.random() * risks.length)],
      churn: Math.random() > 0.5 ? "Yes" : "No",
    }));
  }, []);

  const highRiskCustomers = useMemo(
    () => allData.filter((c) => c.risk === "High"),
    [allData]
  );

  useEffect(() => {
    const storedAdminData = localStorage.getItem("token");
    if (storedAdminData && !adminData) {
      setAdminData({
        authenticated: true
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Router
          adminData={adminData}
          setAdminData={setAdminData}
          allData={allData}
          highRiskCustomers={highRiskCustomers}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
