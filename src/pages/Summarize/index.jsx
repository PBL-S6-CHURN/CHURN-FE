import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getSummarizeData } from "../../api/summarizeApi";
import "./style.css";
import PercentageCard from "../../components/SummarizeComponents/PercentageCard";
import SummarizeParagraf from "../../components/SummarizeComponents/SummarizeParagraf";
import TopReviewCard from "../../components/SummarizeComponents/TopReviewCard";

function Summarize({
  onProfileClick,
  adminData,
  onNavChange,
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
      adminData={adminData}
      onProfileClick={onProfileClick}
    >
      {/* Persentase Section */}
      <div className="summarize-section card-perc">
        <h3 className="sub-title-sm">Percentage</h3>
        <div className="percentage-container">
          <PercentageCard percentageTitle="Positif" percentage={positivePercentage} bgColor="white" />
          <PercentageCard percentageTitle="Netral" percentage={positivePercentage} bgColor="brown" />
          <PercentageCard percentageTitle="Negatif" percentage={negativePercentage} bgColor="maroon" />
        </div>
      </div>

      {/* Teks Summarize */}
      <div className="summarize-section summarize">
        <h3 className="sub-title-sm">Summarize</h3>
        <div className="text-content-sm">
          <SummarizeParagraf summarizeTitle="Positif" summarizeParaghraph={sentimentPositive} />
          <SummarizeParagraf summarizeTitle="Negatif" summarizeParaghraph={sentimentNegative} />
        </div>
      </div>

      {/* Komentar Section */}
      <div className="summarize-section" style={{ paddingTop: "50px" }}>
        <h3 className="sub-title-sm">Top 5 Comment</h3>
        <div className="comments-list">
          {totalComments.map((c) => (
            <TopReviewCard image={c.userImage} userName={c.userName} score={c.score} content={c.content} iconRate="material-symbols:star" />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Summarize;
