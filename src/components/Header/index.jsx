import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Icon } from "@iconify/react";
import { getAlerts, getAlertStats } from "../../api/alertapi";

export default function Header({ title, adminData, onViewDetail }) {
  const [showNotif, setShowNotif] = useState(false);
  const [filter, setFilter] = useState("All");
  const [alerts, setAlerts] = useState([]);
  const [totalAlertCount, setTotalAlertCount] = useState(0); 
  const filterNoticeCategory = ["All", "Starter", "Enterprise", "Professional"];
  const navigate = useNavigate();

  // Khusus fetch total count badge global dari statistik (di-run setiap dropdown dibuka atau init)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAlertStats();
        if (res && res.status === "success") {
          setTotalAlertCount(res.data.unread_alerts || 0);
        }
      } catch (err) {
        console.error("Gagal memuat statistik alert:", err);
      }
    };

    fetchStats();
  }, [showNotif]); // Hit ulang angka badge setiap kali lonceng diklik / dropdown interaksi

  // Khusus fetch daftar list item berdasarkan tab filter yang aktif
  useEffect(() => {
    const fetchAlertList = async () => {
      try {
        const res = await getAlerts(filter, 1); 
        console.log(res.data);
        
        if (res && res.status === "success") {
          setAlerts(res.data || []);
        }
      } catch (err) {
        console.error("Gagal memuat list notifikasi:", err);
      }
    };

    fetchAlertList();
  }, [filter, showNotif]); // Hit ulang jika tab filter diganti

  // Fungsi helper format tanggal dari BE
  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.toLocaleDateString("id-ID")} - ${date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
  };

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
          {/* Badge sekarang menggunakan total count murni dari endpoint stats */}
          {totalAlertCount > 0 && (
            <span className="notif-badge-count">
              {totalAlertCount}
            </span>
          )}
        </div>

        {/* Dropdown Notifikasi */}
        {showNotif && (
          <div className="notif-dropdown shadow-real-black">
            <div className="notif-header">
              <h4>Notification</h4>
              <span className="notif-count-label">
                {alerts.length} {/* Jumlah data yang tampil di tab saat ini */}
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
              {alerts.length > 0 ? (
                alerts.map((item) => (
                  <div
                    key={item.id}
                    className={`notif-item ${item.alert_is_read ? "read" : "unread"}`}
                    onClick={() => {
                      onViewDetail(item.id); 
                      setShowNotif(false);
                    }}
                  >
                    <div className="notif-icon-avatar">
                      <Icon icon="entypo:user" width="30" color="#630000" />
                    </div>
                    <div className="notif-text">
                      <div className="notif-row">
                        <span className="customer-id">{item.customer_code}</span>
                        <span className={`warning-tag ${item.alert_severity?.toLowerCase()}`}>
                          {"WARNING"}
                        </span>
                      </div>
                      <p className="notif-subtext">{item.alert_message}</p>
                      <span className="notif-time">{formatDateTime(item.created_at)}</span>
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