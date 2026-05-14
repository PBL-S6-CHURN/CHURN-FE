import React from "react";
import { Icon } from "@iconify/react";
import MainLayout from "../../layouts/MainLayout";
import "./style.css"; // Pastikan ini mengarah ke file CSS di bawah
import InfoBox from "../../components/CustomerDetailComponents/InfoBox";
import PredictBox from "../../components/CustomerDetailComponents/PredictBox";
import ContactButton from "../../components/CustomerDetailComponents/ContactButton";

function CustomerDetail({ customer, onBack, onLogout, adminData, onProfileClick, onNavChange, highRiskCustomers }) {
  if (!customer) return null;

  const breadcrumbContent = (
    <div className="breadcrumb-wrapper">
      <span onClick={onBack}>Detail_{customer.id}</span>
    </div>
  );

  return (
    <MainLayout
      adminData={adminData}
      title={breadcrumbContent}
      onLogout={onLogout}
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
              Status : {customer.churn === "Yes" ? "Churned" : "Stayed"}
            </h4>
          </div>

          {/* KANAN: GRID INFO */}
          <div className="detail-grid">
            <InfoBox label="Plan Type" value={customer.plan} />
            <InfoBox label="Contract Type" value={customer.contract} />
            <InfoBox label="Monthly Revenue" value="19" unit="$" />
            <InfoBox label="Tenure Months" value="19" unit="Months" />
            <InfoBox label="Payment Delay Count" value={customer.delay} unit="Times" />
            <InfoBox label="Monthly Usage Hours" value={customer.hours} unit="Hours" />
            <InfoBox label="Total User" value={customer.users} unit="User" />
            <InfoBox label="Feature Adoption Pct" value={customer.feature} unit="Pct" />
            <InfoBox label="Support Tickets" value="0" unit="Days" />
            <InfoBox label="Last Login" value="34" unit="Days Ago" />
            <InfoBox label="Nps Score" value={customer.score} />
          </div>
        </div>

        {/* PREDICTION SECTION */}
        <div className="prediction-section">
          <div className="prediction-card">
            <h3 className="section-title">Prediction Result</h3>
            <div className="prediction-grid">
              <PredictBox title="Risk" value={customer.risk.toUpperCase()} isRisk={true} />
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