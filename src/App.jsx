import { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [adminData, setAdminData] = useState(null);

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
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
