import React from 'react'

export default function Pagination({currentPage, totalPages, setCurrentPage }) {
    return (
        <div className="pagination-new">
            <div className="pages">
                <span
                    className="nav-arrow"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    style={{ cursor: "pointer" }}
                >
                    ‹
                </span>
            {[...Array(totalPages)].map((_, i) => (
                <span
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active-p" : ""}
                style={{ cursor: "pointer" }}
                >
                {i + 1}
                </span>
            ))}
            <span
                className="nav-arrow"
                onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                style={{ cursor: "pointer" }}
            >
                ›
            </span>
            </div>
            <div className="page-info">
                Page {currentPage} of {totalPages || 1}
            </div>
        </div>
    )
}
