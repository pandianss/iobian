// Scheme Code Arrays from VB Script (Default Configuration)
export const DEFAULT_SCHEMES = {
    mudra: ["SLMUD", "CCMUD", "CCWMS", "TLWMS"],
    housing: [
        "AHPAP", "CCSUB", "RHDEC", "RHISL", "RHLGJ", "RHNRI", "RHNRR", "NRITU", "NRIGN",
        "RHPMA", "RNHBL", "RSPH1", "RSPH2", "RSUBH", "STShl", "RGEWS", "RGLIG", "RGMI1",
        "RGMI2", "RSTOP", "HOMAD", "RMOGR", "RAHTN", "RBLTN", "GNEXT", "CRH01", "CBH01",
        "CEC01", "HLELM", "RHLG2", "HLKKI"
    ],
    vehicle: ["RPUSH", "RTN2W", "RVL2W", "SVL2W", "SVL4W", "RGRVL", "RGR2W"],
    agriJl: ["AGEJL", "AGTAJ", "JLSWS", "KCAJL", "KCCJL"], // Requires Sector = AGRI
    retailJl: ["GLDPC", "JLOTH", "JLSTF", "JLSUV", "JLSWL"], // Requires Sector = RETAIL
    jewel: [
        "AGEJL", "AGTAJ", "CCCAJ", "CSGLD", "JLOTH", "JLSME", "JLSTF", "JLSWL", "JLSWS",
        "KCCJL", "GLDPC", "KCAJL", "JLSUV", "CIF01", "CPR01"
    ],
    personal: ["DLCLN", "RPLOT", "RPTOP", "RROYL"],
    mortgage: ["RHNIL", "RRVML"],
    education: [
        "NFEDU", "NKEDU", "RDREM", "REVOC", "RSCLR", "RVIDJ", "RSURA", "RSRTA", "RSRTB",
        "RNCTD", "BSCCS", "RSKILL", "PMVLS"
    ],
    liquirent: ["RLLIQ"],
    otherRetail: [
        "CCAKS", "CCDEP", "CDSTF", "DLFAP", "DLPEN", "DLIPL", "RABHI", "RAKSH", "RALNK",
        "RPASS", "SBCGA", "SBCRP", "SBDNC", "SBESY", "SBFCR", "SBGLO", "SBGLT", "SBLTS",
        "SBNRE", "SBNRO", "SBPLT", "SBPUB", "SBSLO", "SBSLT", "SBSTF", "SBSTR", "SBSTU",
        "SBTOD", "SFCL2", "SFDEC", "SFNDE", "SJLGO", "STDPN", "STDRL", "STFCC", "STFFA",
        "STFFL", "STFML", "STFWL", "SURYA", "CCCOR", "CCSUV", "SBKIT", "CABCA", "CCJLG",
        "CCPRM", "CCSFA", "CDSPL", "CFITL", "CMHLS", "CSL01", "DLFLX", "DLPIP", "ECL1E",
        "ECL2E", "ECL3E", "NFMSY", "RKSHG", "RPSGB", "STCOV", "STGAD", "DLDEP", "DLNSC"
    ],
    jlSchemes: ["JLOTH", "JLSME", "CSGLD"], // Requires Sector = SME or SME_NP (jlLoans)
    govSchemes: [
        "AGINF", "TLFME", "CCFME", "AHITL", "CCITL", "TLCBG", "CCCBG", "TLMAS", "CCMAS"
    ],
    otherSchematic: [
        "TLKVR", "CCKVR", "TLKRP", "CCKRP", "TLSAR", "CCSAR", "TLSRP", "CCSRP", "TLAGM",
        "CCAGM", "TLFSH", "CCFSH", "CCIFS", "TLWSH", "AGJLG", "CCJLG", "AGDRY", "AGDTP",
        "TLDTP", "TLFPR", "CCFPR", "AGPLT", "CCPLT", "AGTPT"
    ],
    kcc: ["KCCJL", "KCAJL", "KCC", "AGTAJ"], // Added KCC specific codes
    shg: ["RKSHG", "TLSHG", "CCSHG", "SHG", "JLG", "AGJLG", "CCJLG"], // Added SHG/JLG codes
    npa: ["33750", "33850", "33950", "33999"] // Checks NPA Code column (J in VB)
};

export const calculateSanctions = (data, schemes = DEFAULT_SCHEMES) => {
    const results = {
        mudra: 0, housing: 0, vehicle: 0, agriJl: 0, retailJl: 0, jewel: 0,
        personal: 0, mortgage: 0, education: 0, liquirent: 0, totalRetail: 0,
        otherRetail: 0, jlLoans: 0, govSchemes: 0, otherSchematic: 0, npa: 0,
        totalSme: 0, coreMsme: 0,
        shg: 0, kcc: 0 // New Fields
    };

    if (!data || data.length === 0) return results;

    data.forEach(row => {
        // Map VB columns (assumed keys based on standard data or new upload)
        // Check both original keys and backend normalized keys
        const scheme = (row['schemeCode'] || row['Scheme Code'] || '').toUpperCase();

        // Use 'balance' from backend or 'Clear Balance' from old uploads
        const amt = Math.abs(parseFloat(row['balance'] || row['Clear Balance'] || row['Balance'] || row['Sanction Limit'] || 0) || 0);

        const sector = (row['type'] || row['Sector'] || row['sector'] || '').toUpperCase();
        const glCode = (row['glSubHeadCode'] || row['GL Sub Head Code'] || '').toUpperCase();
        const npaCode = String(row['NPA Code'] || row['npaCode'] || row['Asset Code'] || ''); // Column J equivalent

        // 1. Mudra
        if (schemes.mudra.includes(scheme)) results.mudra += amt;

        // 2. Housing
        if (schemes.housing.includes(scheme)) results.housing += amt;

        // 3. Vehicle
        if (schemes.vehicle.includes(scheme)) results.vehicle += amt;

        // 4. Agri JL (Sector = AGRI)
        if (schemes.agriJl.includes(scheme) && sector === 'AGRI') results.agriJl += amt;

        // 5. Retail JL (Sector = RETAIL)
        if (schemes.retailJl.includes(scheme) && sector === 'RETAIL') results.retailJl += amt;

        // 6. Jewel (General)
        if (schemes.jewel.includes(scheme)) results.jewel += amt;

        // 7. Personal
        if (schemes.personal.includes(scheme)) results.personal += amt;

        // 8. Mortgage
        if (schemes.mortgage.includes(scheme)) results.mortgage += amt;

        // 9. Education
        if (schemes.education.includes(scheme)) results.education += amt;

        // 10. Liquirent
        if (schemes.liquirent.includes(scheme)) results.liquirent += amt;

        // 11. Total Retail (Sector = RETAIL)
        if (sector === 'RETAIL') results.totalRetail += amt;

        // 12. Other Retail (Sector = RETAIL)
        if (schemes.otherRetail.includes(scheme) && sector === 'RETAIL') results.otherRetail += amt;

        // 13. JL Schemes (Sector = SME or SME_NP) (Using jlsch array, labeled 'jloans' in VB)
        // Check map key 'jlSchemes' from default/passed object for scheme list
        if (schemes.jlSchemes.includes(scheme) && (sector === 'SME' || sector === 'SME_NP' || sector === 'MSME')) results.jlLoans += amt;

        // 14. Gov Schemes
        // VB uses ws3 (CoreAgri) for Gov Sch? VB: ws3.Range("e:e") sum, ws3.Range("b:b") criteria.
        // If data is all in one file, we assume row has these. 
        // If Gov Schemes are in a separate sheet/file, this might be tricky.
        // Assuming single file flat structure for now or that these codes exist in main data.
        if (schemes.govSchemes.includes(scheme)) results.govSchemes += amt;

        // 15. Other Schematic
        if (schemes.otherSchematic.includes(scheme)) results.otherSchematic += amt;

        // 16. NPA
        if (schemes.npa.includes(glCode)) results.npa += amt;

        // 17. Total SME (for Core MSME calculation)
        if (sector === 'SME' || sector === 'SME_NP' || sector === 'MSME') results.totalSme += amt;

        // 18. SHG
        if (schemes.shg.includes(scheme)) results.shg += amt;

        // 19. KCC
        if (schemes.kcc.includes(scheme)) results.kcc += amt;
    });

    results.coreMsme = results.totalSme - results.jlLoans;

    return results;
};
