import React from 'react'

export default function SentimentResult({sentiment, probability, explainable, icon}) {
  return (
    <div className="sentiment-result">
        <div className="sentiment-result-item">
            <label className="sentiment-result-label">Sentiment</label>
            <div className="sentiment-result-value">
                <p>{sentiment}</p>
                {icon}
            </div>
        </div>
        <div className="sentiment-result-item">
            <label className="sentiment-result-label">Probability</label>
            <div className="sentiment-result-value">
                <p>{probability}</p>
            </div>
        </div>
        <div className="sentiment-result-item">
            <label className="sentiment-result-label">Expanable</label>
            <div className="sentiment-result-value">
                <p>{explainable}</p>
            </div>
        </div>
    </div>
  )
}
