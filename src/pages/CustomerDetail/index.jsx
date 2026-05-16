import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import MainLayout from "../../layouts/MainLayout";
import "./style.css"; // Pastikan ini mengarah ke file CSS di bawah
import InfoBox from "../../components/CustomerDetailComponents/InfoBox";
import PredictBox from "../../components/CustomerDetailComponents/PredictBox";
import ContactButton from "../../components/CustomerDetailComponents/ContactButton";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../../api/customerApi";

function CustomerDetail({ onBack, adminData, onProfileClick, onNavChange, highRiskCustomers }) {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchDetail = async() => {
      try {
        const response = await getCustomerById(id);
        setCustomer(response.data.message);
        console.log(response.data.message);
        
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) fetchDetail();
  }, [id])
  
  if (loading || !customer) {
    return (
      <MainLayout
        adminData={adminData}
        onProfileClick={onProfileClick}
        activeNav="dashboard"
        onNavChange={onNavChange}
        highRiskCustomers={highRiskCustomers}
      >
        <div>Loading...</div>
      </MainLayout>
    );
  }

  const breadcrumbContent = (
    <div className="breadcrumb-wrapper">
      <span onClick={onBack}>Detail_{customer.customer_id}</span>
    </div>
  );


  return (
    <MainLayout
      adminData={adminData}
      title={breadcrumbContent}
      onProfileClick={onProfileClick}
      activeNav="dashboard"
      onNavChange={onNavChange}
      highRiskCustomers={highRiskCustomers}
    >
      <div className="detail-container">
        <div className="detail-top-section">
          {/* KIRI: FOTO & STATUS */}
          <div className="detail-card-photo">
            <div className="photo-inner-box">
              <Icon icon="entypo:user" className="user-avatar-icon" />
            </div>
            <h4 className="status-text">
              {/* Status : {customer.churn === "Yes" ? "Churned" : "Stayed"} */}
            </h4>
          </div>

          {/* KANAN: GRID INFO */}
          <div className="detail-grid">
            <InfoBox label="Plan Type" value={customer.plan_name} />
            <InfoBox label="Contract Type" value={customer.contract_name} />
            <InfoBox label="Monthly Revenue" value={customer.monthly_revenue} unit="$" />
            <InfoBox label="Tenure Months" value={customer.tenure_months} unit="Months" />
            <InfoBox label="Payment Delay Count" value={customer.payment_delay_count} unit="Times" />
            <InfoBox label="Monthly Usage Hours" value={customer.monthly_usage_hours} unit="Hours" />
            <InfoBox label="Total User" value={customer.total_users} unit="User" />
            <InfoBox label="Feature Adoption Pct" value={customer.feature_adoption_pct} unit="Pct" />
            <InfoBox label="Support Tickets" value={customer.support_tickets_last_90d} unit="Days" />
            <InfoBox label="Last Login" value={customer.last_login_days_ago} unit="Days Ago" />
            <InfoBox label="Nps Score" value={customer.nps_score} /> 
          </div>
        </div>

        {/* PREDICTION SECTION */}
        <div className="prediction-section">
          <div className="prediction-card">
            <h3 className="section-title">Prediction Result</h3>
            <div className="prediction-grid">
              {/* <PredictBox title="Risk" value={customer.risk.toUpperCase()} isRisk={true} /> */}
              <PredictBox title="Churn Factor" value="Keterangan faktor churn customer ini berdasarkan analisis data penggunaan..." />
              <PredictBox title="Solution" value="Berikan penawaran diskon loyalty atau upgrade fitur gratis selama 1 bulan." />
            </div>
          </div>
        </div>

        {/* CONTACT ACTIONS */}
        <div className="contact-section">
          <h2 className="contact-header">Contact</h2>
          <div className="contact-btn-group">
            <ContactButton
              icon="ic:baseline-whatsapp"
              label="WhatsApp"
              color="#25D366"
              onClick={() => window.open(`https://wa.me/6281385169580`, "_blank")}
            />
            <ContactButton
              icon="material-symbols:mail"
              label="Email"
              color="#630000"
              onClick={() => (window.location.href = `mailto:customer@churncenter.id`)}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CustomerDetail;