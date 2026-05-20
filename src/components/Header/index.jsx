import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Icon } from "@iconify/react";

export default function Header({ title, adminData, onViewDetail }) {
  const [showNotif, setShowNotif] = useState(false);
  const [filter, setFilter] = useState("All");
  const filterNoticeCategory = ["All", "Starter", "Enterprise", "Professional"];
  const navigate = useNavigate();

  // Filter data berdasarkan kategori (contoh logic)
  // const filteredCustomers =
  //   filter === "All"
  //     ? highRiskCustomers
  //     : highRiskCustomers.filter((c) => c.plan_type === filter);

  return (
    <header className="top-bar">
      <h1 className="title">{title}</h1>
      <div className="user-actions" style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon
            icon="mdi:bell"
            width="26"
            height="26"
            color="#630000"
            onClick={() => setShowNotif(!showNotif)}
            style={{ cursor: "pointer" }}
          />
          {/* {highRiskCustomers.length > 0 && (
            <span className="notif-badge-count">
              {highRiskCustomers.length}
            </span>
          )} */}
        </div>

        {/* Dropdown Notifikasi */}
        {showNotif && (
          <div className="notif-dropdown shadow-real-black">
            <div className="notif-header">
              <h4>Notification</h4>
              <span className="notif-count-label">
                {highRiskCustomers.length}
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="notif-tabs">
              {filterNoticeCategory.map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${filter === tab ? "active" : ""}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="notif-body">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="notif-item"
                    onClick={() => {
                      onViewDetail(item);
                      setShowNotif(false);
                    }}
                  >
                    <div className="notif-icon-avatar">
                      <Icon icon="entypo:user" width="30" color="#630000" />
                    </div>
                    <div className="notif-text">
                        <div className="notif-row">
                            <span className="customer-id">{item.id}</span>
                            <span className="warning-tag">WARNING</span>
                        </div>
                        <p className="notif-subtext">Customer Churn</p>
                        <span className="notif-time">12/01/2026 - 15.00</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="notif-empty">No alerts for {filter}</div>
              )}
            </div>
          </div>
        )}

        <span className="profile-svg">
          {adminData?.profile_image ? (
            <img src={`http://localhost:8000/${adminData.profile_image}`} className="avatar-img-small" alt="p" onClick={() => navigate("/profile")} />
          ) : (
            <Icon
              icon="mingcute:user-4-fill"
              width="26"
              height="26"
              color="#630000"
              onClick={() => navigate("/profile")}
              style={{ cursor: "pointer" }}
            />
          )}
        </span>
      </div>
    </header>
  );
}
