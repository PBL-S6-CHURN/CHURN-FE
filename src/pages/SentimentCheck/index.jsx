import React from "react";
import "./style.css";
import MainLayout from "../../layouts/MainLayout";

// icon
import SentimentSadIcon from '@iconify-react/material-symbols/sentiment-sad';
import SentimentCalmRoundedIcon from '@iconify-react/material-symbols/sentiment-calm-rounded';
import SentimentExcitedIcon from '@iconify-react/material-symbols/sentiment-excited';

export default function SentimentCheck({
    adminData,
    onNavChange,
    onProfileClick,
}) {
    return (
        <MainLayout
        title="Sentiment Check"
        activeNav="sentiment-check"
        adminData={adminData}
        onNavChange={onNavChange}
        onProfileClick={onProfileClick}
        >
            <div className="sentiment-check-container">
                <div className="sentiment-icon-group">
                    <SentimentSadIcon className="sentiment-icon bad-icon" />
                    <SentimentCalmRoundedIcon className="sentiment-icon neutral-icon" />
                    <SentimentExcitedIcon className="sentiment-icon happy-icon" />
                </div>
                <div className="form-check-sentiment">
                    <form action="">
                        <div className='input-group'>
                            <label style={{ fontSize: '0.8rem', color: '#888' }}>Tuliskan Sentiment</label>
                            <input 
                                type="text" 
                                className="filter-select" 
                                // value={""}
                                onChange={() => {}}
                            />
                        </div>
                        <button 
                            className="btn-check-sentiment" 
                            style={{ width: '100%', borderRadius: '8px' }}
                            onClick={() => alert("Sentiment ditampilkan")}
                        >
                            Cek aja
                        </button>
                    </form>
                </div>
                <div className="sentiment-result">
                    <div className="sentiment-result-item">
                        <label className="sentiment-result-label">Sentiment</label>
                        <div className="sentiment-result-value">
                            <p>Positif</p>
                            <SentimentExcitedIcon width="20px" className="happy-icon" />
                        </div>
                    </div>
                    <div className="sentiment-result-item">
                        <label className="sentiment-result-label">Probability</label>
                        <div className="sentiment-result-value">
                            <p>90%</p>
                        </div>
                    </div>
                    <div className="sentiment-result-item">
                        <label className="sentiment-result-label">Expanable</label>
                        <div className="sentiment-result-value">
                            <p>Kalimat ini mengandung negatif karena ada kata jelek dan sinyal negatif dsjdska dksadjsaklj</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
