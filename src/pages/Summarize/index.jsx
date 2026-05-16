import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Icon } from "@iconify/react";
import { getSummarizeData } from "../../api/summarizeApi";
import "./style.css";

function Summarize({
  onLogout,
  onProfileClick,
  adminData,
  onNavChange,
  highRiskCustomers,
}) {
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);
  const [sentimentPositive, setSentimentPositive] = useState("");
  const [sentimentNegative, setSentimentNegative] = useState("");
  const [totalComments, setTotalComments] = useState([]);

  const handleDataSummarize = async () => {
    try {
      const response = await getSummarizeData();

      setPositivePercentage(response.data.percentage.positif);
      setNegativePercentage(response.data.percentage.negatif);
      setSentimentPositive(response.data.summary.positif);
      setSentimentNegative(response.data.summary.negatif);
      setTotalComments(response.data.top5Comments);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    handleDataSummarize();
  }, [
    positivePercentage,
    negativePercentage,
    sentimentPositive,
    sentimentNegative,
    totalComments,
  ]);

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
            <h2>{positivePercentage}%</h2>
          </div>
          <div className="perc-card maroon">
            <p>Negatif</p>
            <h2>{negativePercentage}%</h2>
          </div>
        </div>
      </div>

      {/* Teks Summarize */}
      <div className="summarize-section summarize">
        <h3 className="sub-title-sm">Summarize</h3>
        <div className="text-content-sm">
          <div className="sm-item">
            <h4>Positif</h4>
            <p>{sentimentPositive}</p>
          </div>
          <div className="sm-item">
            <h4>Negatif</h4>
            <p>{sentimentNegative}</p>
          </div>
        </div>
      </div>

      {/* Komentar Section */}
      <div className="summarize-section" style={{ paddingTop: "50px" }}>
        <h3 className="sub-title-sm">Top 5 Comment</h3>
        <div className="comments-list">
          {totalComments.map((c) => (
            <div className="comment-card">
              <div className="comment-header">
                <div className="user-info">
                  {/* <div className="user-avatar-sm">👤</div> */}
                  <div className="user-avatar-sm">
                    {c.userImage ? (
                      <img src={c.userImage} width={28} height={28} style={{ borderRadius: "50%" }} alt="User Avatar" />
                    ) : (
                      "👤"
                    )}
                  </div>
                  <span className="user-name">{c.userName}</span>
                </div>
                <div className="rating">
                  <Icon
                    icon="material-symbols:star"
                    width="24"
                    height="24"
                    color="#630000"
                  />
                  {c.score.toFixed(1)}
                </div>
              </div>
              <p className="comment-text">{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Summarize;
