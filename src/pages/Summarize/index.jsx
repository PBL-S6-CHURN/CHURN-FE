import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getSummarizeData } from "../../api/summarizeApi";
import "./style.css";
import PercentageCard from "../../components/SummarizeComponents/PercentageCard";
import SummarizeParagraf from "../../components/SummarizeComponents/SummarizeParagraf";
import TopReviewCard from "../../components/SummarizeComponents/TopReviewCard";
import LoadingScreen from "../../components/LoadingScreen";

function Summarize({
  onProfileClick,
  adminData,
  onNavChange,
}) {
  const [loading, setLoading] = useState(false);
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);
  const [netralPercentage, setNetralPercentage] = useState(0);
  const [sentimentPositive, setSentimentPositive] = useState("");
  const [sentimentNegative, setSentimentNegative] = useState("");
  const [sentimentNetral, setSentimentNetral] = useState("");
  const [totalComments, setTotalComments] = useState([]);

  const handleDataSummarize = async () => {
    if (loading) return; 
    
    setLoading(true);
    try {
      const response = await getSummarizeData();
      
      setPositivePercentage(response.data.percentage.positif);
      setNegativePercentage(response.data.percentage.negatif);
      setNetralPercentage(response.data.percentage.netral);
      setSentimentPositive(response.data.summary.positif);
      setSentimentNegative(response.data.summary.negatif);
      setSentimentNetral(response.data.summary.netral);
      setTotalComments(response.data.top5Comments);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDataSummarize();
  }, []);

  return (
    <MainLayout
      title="Summarize"
      activeNav="summarize"
      onNavChange={onNavChange}
      adminData={adminData}
      onProfileClick={onProfileClick}
    >
      {loading && <LoadingScreen message="Menganalisis ribuan ulasan pelanggan..." />}
      {/* Persentase Section */}
      <div className="summarize-section card-perc">
        <h3 className="sub-title-sm">Percentage</h3>
        <div className="percentage-container">
          <PercentageCard percentageTitle="Positif" percentage={positivePercentage} bgColor="white" />
          <PercentageCard percentageTitle="Netral" percentage={netralPercentage} bgColor="brown" />
          <PercentageCard percentageTitle="Negatif" percentage={negativePercentage} bgColor="maroon" />
        </div>
      </div>

      {/* Teks Summarize */}
      <div className="summarize-section summarize">
        <h3 className="sub-title-sm">Summarize</h3>
        <div className="text-content-sm">
          <SummarizeParagraf summarizeTitle="Positif" summarizeParaghraph={sentimentPositive} />
          <SummarizeParagraf summarizeTitle="Netral" summarizeParaghraph={sentimentNetral} />
          <SummarizeParagraf summarizeTitle="Negatif" summarizeParaghraph={sentimentNegative} />
        </div>
      </div>

      {/* Komentar Section */}
      <div className="summarize-section" style={{ paddingTop: "50px" }}>
        <h3 className="sub-title-sm">Top 5 Comment</h3>
        <div className="comments-list">
          {totalComments.map((c) => (
            <TopReviewCard image={c.userImage} userName={c.userName} score={c.rating} content={c.content} iconRate="material-symbols:star" />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Summarize;
