export const generateReferenceNumber = (type, regionCode, branchCode) => {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Format: Month/Year/Type/Region/Branch
    return `${month}/${year}/${type}/${regionCode}/${branchCode}`;
};
