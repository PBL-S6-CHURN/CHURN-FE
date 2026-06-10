import React from 'react'
import { generatePaginationRange } from '../../helper/generationPagination';

export default // Contoh implementasi di dalam komponen Pagination Anda
function Pagination({ currentPage, totalPages, setCurrentPage }) {
    // Panggil fungsi generator range di sini
    const paginationRange = generatePaginationRange(currentPage, totalPages);

    return (
        <div className="pagination-wrapper">
            {/* Tombol Previous */}
            <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="pagination-arrow"
            >
                &laquo; Prev
            </button>

            {/* Looping nomor halaman yang sudah dipotong */}
            {paginationRange.map((page, index) => {
                if (page === '...') {
                return <span key={`dots-${index}`} className="pagination-dots">...</span>;
                }

                return (
                <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                >
                    {page}
                </button>
                );
            })}

            {/* Tombol Next */}
            <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="pagination-arrow"
            >
                Next &raquo;
            </button>
        </div>
    );
}