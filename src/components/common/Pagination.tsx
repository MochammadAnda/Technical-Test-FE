import { getVisiblePages } from '../../utils/productUtils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

/** Komponen presentasional: hanya menampilkan tombol, perhitungan halaman ada di utils. */
export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = getVisiblePages(currentPage, totalPages);

    return (
        <nav className="pagination" aria-label="Product pagination">
            <button
                type="button"
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
                Previous
            </button>

            <div className="pagination-pages">
                {pages.map((page, index) => {
                    const previousPage = pages[index - 1];
                    const hasGap = previousPage !== undefined && page - previousPage > 1;

                    return (
                        <span className="pagination-item" key={page}>
                            {hasGap && <span className="pagination-ellipsis">…</span>}

                            <button
                                type="button"
                                className={`pagination-number ${page === currentPage ? 'pagination-number-active' : ''}`}
                                aria-current={page === currentPage ? 'page' : undefined}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </span>
                    );
                })}
            </div>

            <button
                type="button"
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
                Next
            </button>
        </nav>
    );
}
