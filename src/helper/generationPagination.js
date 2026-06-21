export const generatePaginationRange = (currentPage, totalPages) => {
    const current = currentPage;
    const last = totalPages;
    const delta = 2; // Jumlah halaman yang tampil di kiri & kanan halaman aktif
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
        if (i - l === 2) {
            rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
            rangeWithDots.push('...');
        }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
};