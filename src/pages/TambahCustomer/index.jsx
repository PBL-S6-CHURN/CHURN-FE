import React, { useRef, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { addCustomer, uploadCustomerExcel } from "../../api/customerApi";
import { Icon } from "@iconify/react";

function TambahCustomer({ adminData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // State untuk melacak mode pemrosesan batch AI via SSE
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
    percentage: 0,
    customerCode: '',
  });

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

  // REALTIME STREAMING AI (SSE) SETELAH UPLOAD EXCEL SUKSES
  const startPredictStream = () => {
    setIsProcessingAI(true);
    setLoading(true);

    // Sesuaikan URL EventSource ini dengan alamat endpoint SSE backend Anda
    const eventSource = new EventSource("http://localhost:5000/api/customers/stream");

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        console.log("[SSE] Batch prediksi AI selesai.");
        eventSource.close();
        setIsProcessingAI(false);
        setLoading(false);
        alert("🎉 Batch Prediksi Selesai! Semua data Excel telah sukses dihitung oleh AI.");
        navigate("/dashboard");
        return;
      }

      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData.status === "processing") {
          setProgress({
            current: parsedData.current,
            total: parsedData.total,
            percentage: parsedData.percentage,
            customerCode: parsedData.customer_code,
          });
        }
      } catch (err) {
        console.error("Gagal membaca chunk data stream:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Jalur pipa SSE mengalami kendala:", err);
      eventSource.close();
      setIsProcessingAI(false);
      setLoading(false);
      // Tetap arahkan ke dashboard jika terjadi gangguan visualisasi agar user tidak tertahan
      navigate("/dashboard"); 
    };
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      alert("Mohon unggah file format Excel (.xlsx, .xls, atau .csv)");
      return;
    }

    setLoading(true);
    try {
      // 1. Eksekusi Upload ke Postgres
      await uploadCustomerExcel(file);
      
      // 2. Tawarkan pengguna untuk eksekusi Prediksi AI otomatis
      const mauPrediksi = window.confirm(
        "Data Excel berhasil diimport ke Database!\n\nApakah Anda ingin lanjut menjalankan proses kalkulasi Prediksi Churn AI sekarang?"
      );

      if (mauPrediksi) {
        // Jika iya, jalankan fungsi SSE stream progres bar
        startPredictStream();
      } else {
        alert("Data disimpan tanpa kalkulasi AI tambahan.");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error?.message || "Gagal memproses file Excel.");
    } finally {
      if (!isProcessingAI) {
        setLoading(false);
      }
      e.target.value = null; // Reset nilai input file
    }
  };

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
      // Tambah data manual otomatis mentrigger prediksi live di backend Anda
      await addCustomer(formData);
      alert("Customer baru berhasil ditambahkan dan otomatis diprediksi oleh AI!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal menambahkan data customer.");
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
        {/* JIKA SEDANG MEMPROSES SSE AI: Tampilkan Tampilan Progress Bar khusus */}
        {isProcessingAI ? (
          <div className="sse-progress-box" style={{ padding: "24px", background: "#f0f7ff", borderRadius: "8px", border: "1px solid #d0e7ff", textAlign: "center" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "#0056b3" }}>🤖 AI Machine Learning Processing...</h3>
            
            {/* Progress Bar Track */}
            <div style={{ width: "100%", background: "#e0e0e0", borderRadius: "10px", height: "16px", overflow: "hidden", marginBottom: "12px" }}>
              <div 
                style={{ width: `${progress.percentage}%`, background: "#007bff", height: "100%", transition: "width 0.3s ease" }}
              ></div>
            </div>

            <div style={{ display: "flex", justifyContent: "between", fontSize: "14px", color: "#333", fontWeight: "500" }}>
              <p style={{ margin: 0 }}>Memproses: <b>{progress.customerCode || "-"}</b> ({progress.percentage}%)</p>
              <p style={{ margin: "0 0 0 auto" }}>{progress.current} dari {progress.total} Data</p>
            </div>
          </div>
        ) : (
          /* JIKA KONDISI NORMAL: Tampilkan Form Pengisian Data */
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Customer id</label>
                <input type="text" required placeholder="Contoh: C-1029" name="customer_id" onChange={handleChange} className="form-input" />
              </div>
              
              {/* PERBAIKAN: Menambahkan properti name dan onChange pada Select Option */}
              <div className="form-group">
                <label>Plan Type</label>
                <select name="plan_id" value={formData.plan_id} onChange={handleChange} className="form-input">
                  <option value={1}>Starter</option>
                  <option value={2}>Professional</option>
                  <option value={3}>Enterprise</option>
                </select>
              </div>
              <div className="form-group">
                <label>Contract Type</label>
                <select name="contract_id" value={formData.contract_id} onChange={handleChange} className="form-input">
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
                <label>Feature Adoption (%)</label>
                <input type="number" step="any" name="feature_adoption_pct" onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label>Support Tickets Last 90 Days</label>
                <input type="number" name="support_ticket_last_90d" onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label>Last Login Days Ago (day)</label>
                <input type="number" name="last_login_days_ago" onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label>NPS Score</label>
                <input type="number" name="nps_score" min="1" max="10" onChange={handleChange} className="form-input" />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-submit" type="submit" disabled={loading}>
                {loading ? "Memproses..." : "Tambahkan"}
              </button>
              <button className="btn-cancel" type="button" onClick={() => navigate(-1)} disabled={loading}>
                Batalkan
              </button>
            </div>

            <div className="form-divider">
              <span>OR</span>
            </div>

            <div className="form-upload">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx, .xls, .csv" style={{ display: "none" }} />
              <button type="button" onClick={handleExcelBtn} className="btn-excel" disabled={loading}>
                <Icon icon="material-symbols:upload-file-outline-rounded" width="24" height="24" />
                {loading ? "Mengupload..." : "Upload by Excel"}
              </button>
            </div>
          </form>
        )}
      </section>
    </MainLayout>
  );
}

export default TambahCustomer;
