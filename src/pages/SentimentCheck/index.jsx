import React, { useEffect, useState } from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";

// icon
import SentimentSadIcon from "@iconify-react/material-symbols/sentiment-sad";
import SentimentCalmRoundedIcon from "@iconify-react/material-symbols/sentiment-calm-rounded";
import SentimentExcitedIcon from "@iconify-react/material-symbols/sentiment-excited";
import { checkSentiment } from "../../api/SentimentCheckApi";
import SentimentResult from "../../components/SentimentCheck/SentimentResult";
import LoadingScreen from "../../components/LoadingScreen";

export default function SentimentCheck({
    adminData,
    onNavChange,
    onProfileClick,
}) {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); 

        return () => clearTimeout(timer);
    }, [])

    const handleCheckSentiment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
        const response = await checkSentiment({ text });
        setResult(response.data);
        console.log(response.data);
        } catch (error) {
        console.log(error.message);
        } finally {
        setLoading(false);
        }
    };

    const renderSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case "Positif":
                return <SentimentExcitedIcon width="20px" className="sentiment-icon" />;
            case "Negatif":
                return <SentimentSadIcon width="20px" className="sentiment-icon" />;
            default:
                return <SentimentCalmRoundedIcon width="20px" className="sentiment-icon" />;
        }
    }

    return (
        <MainLayout
            title="Sentiment Check"
            activeNav="sentiment-check"
            adminData={adminData}
            onNavChange={onNavChange}
            onProfileClick={onProfileClick}
        >
            {loading && <LoadingScreen message="AI sedang membedah makna kalimat Anda..." />}
            <div className="sentiment-check-container">
                <div className="sentiment-icon-group">
                    <SentimentSadIcon className="sentiment-icon bad-icon" />
                    <SentimentCalmRoundedIcon className="sentiment-icon neutral-icon" />
                    <SentimentExcitedIcon className="sentiment-icon happy-icon" />
                </div>
                <div className="form-check-sentiment">
                    <form onSubmit={handleCheckSentiment}>
                        <div className="input-group">
                        <label style={{ fontSize: "0.8rem", color: "#888" }}>
                            Tuliskan Sentiment
                        </label>
                        <input
                            type="text"
                            className="filter-select"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={loading}
                        />
                        </div>
                        <button
                        className="btn-check-sentiment"
                        disabled={loading}
                        type="submit"
                        style={{ width: "100%", borderRadius: "8px" }}
                        >
                        Cek aja
                        </button>
                    </form>
                </div>
                {loading && (
                    <div
                        className="loading-container"
                        style={{ textAlign: "center", marginTop: "20px" }}
                    >
                        <p style={{ color: "#630000", fontWeight: "bold" }}>
                        AI sedang menganalisis kalimat Anda...
                        </p>
                    </div>
                )}
                {!loading && result && (
                    <SentimentResult
                        sentiment={result.sentiment}
                        probability={result.probability}
                        explainable={result.explainable}
                        icon={renderSentimentIcon(result.sentiment)}
                    />
                )}
            </div>
        </MainLayout>
    );
}
