import React from 'react'
import './style.css'

export default function LoadingScreen({ message = "AI sedang bekerja untuk Anda..." }) {
    return (
        <div className="loading-overlay">
            <div className="loading-content">
                {/* Spinner Animasi */}
                <div className="ai-spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
                </div>
                
                {/* Pesan Teks */}
                <p className="loading-text">{message}</p>
                
                {/* Progress Bar Sederhana */}
                <div className="progress-bar-container">
                <div className="progress-bar-fill"></div>
                </div>
            </div>
        </div>
    );
}
