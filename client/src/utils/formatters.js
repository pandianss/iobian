export const formatDate = (dateString) => {
    if (!dateString) return '-';
    // Handle excel serial numbers or different formats if necessary, 
    // but assuming ISO YYYY-MM-DD from DB for now.
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

export const formatNumber = (num) => {
    return Number(num || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
};
