import React, { useRef, useState } from "react";
// import logo from "../assets/logoChurn.png";
<Icon />
import MainLayout from "../../layouts/MainLayout";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { addCustomer, uploadCustomerExcel } from "../../api/customerApi";
import { Icon } from "@iconify/react";

function TambahCustomer({ adminData,  }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    customer_id: "",
    plan_id: 1,
    contract_id: 1,
    monthly_usage_hrs: 0,
    feature_adoption_pct: 0,
    payment_delay_count: 0,
    support_ticket_last_90d: 0,
    nps_score: 0,
    tenure_months: 0,
    last_login_days_ago: 0,
    monthly_revenue: 0,
    total_users: 0,
  });

  const handleExcelBtn = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi sederhana: pastikan file adalah Excel
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      alert("Mohon unggah file format Excel (.xlsx, .xls, atau .csv)");
      return;
    }

    setLoading(true);
    try {
      await uploadCustomerExcel(file);
      alert("Data berhasil diimpor dari Excel!");
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      e.target.value = null; // Reset input file
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    const val = name === "customer_id" ? value : (value === "" ? 0 : Number(value));

    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await addCustomer(formData);
      alert("Customer berhasil ditambahkan!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout
      title="Tambah Customer"
      activeNav="add-customer"
      adminData={adminData}
    >
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Customer id</label>
              <input type="text" placeholder="" name="customer_id" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Plan Type</label>
              <select className="form-input">
                <option value={1}>Starter</option>
                <option value={2}>Professional</option>
                <option value={3}>Enterprise</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contract Type</label>
              <select className="form-input">
                <option value={1}>Monthly</option>
                <option value={2}>Annual</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tenure Months (month)</label>
              <input type="number" name="tenure_months" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Monthly Revenue ($)</label>
              <input type="number" step="any" name="monthly_revenue" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Payment Delay Count</label>
              <input type="number" name="payment_delay_count" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Monthly Usage Hours (hour)</label>
              <input type="number" step="any" name="monthly_usage_hrs" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Total Users (user)</label>
              <input type="number" name="total_users" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Feature Adoption</label>
              <input type="number" step="any" name="feature_adoption_pct" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Support Tickets Last 90 Days (day)</label>
              <input type="number" name="support_ticket_last_90d" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Last Login Days Ago (day)</label>
              <input type="number" name="last_login_days_ago" onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group full-width">
              <label>NPS Score</label>
              <input type="number" name="nps_score" onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-submit" type="submit">Tambahkan</button>
            <button className="btn-cancel" onClick={() => navigate(-1)}>Batalkan</button>
          </div>

          <div className="form-divider">
            <span>OR</span>
          </div>

          <div className="form-upload">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx, .xls, .csv" style={{ display: "none" }} />
            <button type="button" onClick={handleExcelBtn} className="btn-excel">
              <Icon icon="material-symbols:upload-file-outline-rounded" width="24" height="24" />
              Upload by Excel
            </button>
          </div>
        </form>
      </section>
    </MainLayout>
  );
}

export default TambahCustomer;
