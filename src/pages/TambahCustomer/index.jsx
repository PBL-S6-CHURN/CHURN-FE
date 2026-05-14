import React from "react";
// import logo from "../assets/logoChurn.png";
import MainLayout from "../../layouts/MainLayout";
import "./style.css";

function TambahCustomer({ adminData, highRiskCustomers }) {
  return (
    <MainLayout
      title="Tambah Customer"
      activeNav="add-customer"
      adminData={adminData}
      highRiskCustomers={highRiskCustomers}
    >
      <section className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label>Customer id</label>
            <input type="text" placeholder="" className="form-input" />
          </div>
          <div className="form-group">
            <label>Plan Type</label>
            <select className="form-input">
              <option>Starter</option>
              <option>Professional</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contract Type</label>
            <select className="form-input">
              <option>Monthly</option>
              <option>Annual</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tenure Months (month)</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label>Monthly Revenue ($)</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label>Payment Delay Count</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label>Monthly Usage Hours (hour)</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label>Total Users (user)</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label>Feature Adoption</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label>Support Tickets Last 90 Days (day)</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label>Last Login Days Ago (day)</label>
            <input type="number" className="form-input" />
          </div>
          <div className="form-group full-width">
            <label>NPS Score</label>
            <input type="number" className="form-input" />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-submit">Tambahkan</button>
          <button className="btn-cancel">Batalkan</button>
        </div>

        <div className="form-divider">
          <span>OR</span>
        </div>

        <div className="form-upload">
          <button className="btn-excel">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: "8px" }}
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            Upload by Excel
          </button>
        </div>
      </section>
    </MainLayout>
  );
}

export default TambahCustomer;
