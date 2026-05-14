import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Icon } from "@iconify/react";
import './style.css';

function Summarize({ onLogout, onProfileClick, adminData, onNavChange, highRiskCustomers }) {
  const comments = [
    {
      id: 1,
      name: "Jonathan",
      rating: 4.0,
      text: `Wkwkwkwk yg pada bngung gnti bahasa, ada disettingan... Klo udh pilih server dan masih di layar utama, pilih settingan di pojok kiri bawah terus pilih kolom tulisan kanan ke 2 nah itu ada ganti bahasa nya .. anjir kaget liat rating 1.9 cuma hanya gara" bahasa dan login sebelum server rilis`,
    },
    {
      id: 2,
      name: "Jonathan",
      rating: 4.0,
      text: `Wkwkwkwk yg pada bngung gnti bahasa, ada disettingan... Klo udh pilih server dan masih di layar utama, pilih settingan di pojok kiri bawah terus pilih kolom tulisan kanan ke 2 nah itu ada ganti bahasa nya .. anjir kaget liat rating 1.9 cuma hanya gara" bahasa dan login sebelum server rilis`,
    },
  ];

  return (
    <MainLayout
      title="Summarize"
      activeNav="summarize"
      onNavChange={onNavChange}
      onLogout={onLogout}
      adminData={adminData}
      onProfileClick={onProfileClick}
      highRiskCustomers={highRiskCustomers}
    >
      {/* Persentase Section */}
      <div className="summarize-section card-perc">
        <h3 className="sub-title-sm">Percentage</h3>
        <div className="percentage-container">
          <div className="perc-card white">
            <p>Positif</p>
            <h2>20%</h2>
          </div>
          <div className="perc-card maroon">
            <p>Negatif</p>
            <h2>80%</h2>
          </div>
        </div>
      </div>

      {/* Teks Summarize */}
      <div className="summarize-section summarize">
        <h3 className="sub-title-sm">Summarize</h3>
        <div className="text-content-sm">
          <div className="sm-item">
            <h4>Positif</h4>
            <p>
            Lorem ipsum dolor sit amet consectetur. Congue mi odio in est. Fames feugiat luctus quis at. Risus risus pretium congue quam non purus senectus massa. Urna elementum at ac blandit duis dui vitae. Non a libero nunc in elementum odio maecenas sed feugiat. Lacus magnis enim massa facilisis sed ut tortor eu. Euismod nec et elementum nisl in iaculis vitae velit.
            </p>
          </div>
          <div className="sm-item">
            <h4>Negatif</h4>
            <p>
            Lorem ipsum dolor sit amet consectetur. Congue mi odio in est. Fames feugiat luctus quis at. Risus risus pretium congue quam non purus senectus massa. Urna elementum at ac blandit duis dui vitae. Non a libero nunc in elementum odio maecenas sed feugiat. Lacus magnis enim massa facilisis sed ut tortor eu. Euismod nec et elementum nisl in iaculis vitae velit.
            </p>
          </div>
        </div>
      </div>

      {/* Komentar Section */}
      <div className="summarize-section" style={{ paddingTop: "50px" }}>
        <h3 className="sub-title-sm">Top 5 Comment</h3>
        <div className="comments-list">
          {comments.map((c) => (
            <div key={c.id} className="comment-card">
              <div className="comment-header">
                <div className="user-info">
                  <div className="user-avatar-sm">👤</div>
                  <span className="user-name">{c.name}</span>
                </div>
                <div className="rating">
                  <Icon icon="material-symbols:star" width="24" height="24" color="#630000" />
                  {c.rating.toFixed(1)}
                </div>
              </div>
              <p className="comment-text">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Summarize;
