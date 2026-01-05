import React, { useEffect, useState, useMemo } from 'react';
import { Settings, ChevronDown, ChevronRight, Save, X, Plus, RefreshCw, AlertTriangle, FileText, Database, Sprout, Coins, Banknote, RotateCcw, Handshake, Download } from 'lucide-react';
import { calculateSanctions, DEFAULT_SCHEMES } from './sanctionsUtils';
import './Scorecard.css';

// Consolidated Table Component
const ConsolidatedTable = ({ data }) => {
    // Calculate max values for databars (excluding totals row for scaling purposes? Or include? usually exclude totals)
    const maxValues = useMemo(() => {
        const maxs = {};
        if (!data || data.length === 0) return maxs;

        // Keys to ignore for databars
        const ignore = ['sNo', 'sol', 'date', 'branch'];

        // Find keys from first row
        const keys = Object.keys(data[0]);

        keys.forEach(k => {
            if (ignore.includes(k)) return;
            // Get max from non-total rows (sNo !== 0) to avoid skewing charts by the huge total
            maxs[k] = Math.max(...data.filter(r => r.sNo !== 0).map(r => parseFloat(r[k]) || 0));
        });
        return maxs;
    }, [data]);

    const getBarStyle = (key, value) => {
        if (!maxValues[key] || !value) return {};
        const pct = Math.min(100, Math.max(0, (Math.abs(value) / maxValues[key]) * 100));
        return {
            background: `linear-gradient(to right, #e0f2fe ${pct}%, transparent ${pct}%)`
        };
    };

    return (
        <div className="card consolidated-table-container">
            <div className="consolidated-table-header">
                <h4>Consolidated Branch Performance</h4>
            </div>
            <table className="consolidated-table">
                <thead>
                    <tr>
                        <th className="sticky-th sticky-col col-sno">S No</th>
                        <th className="sticky-th sticky-col col-sol">SOL</th>
                        <th className="sticky-th sticky-col col-date">Date</th>
                        <th className="sticky-th sticky-col col-branch">Branch</th>

                        {/* Business Figures (Blue) */}
                        {['SB', 'CD', 'CASA', 'TD', 'RTD', 'Total Dep', 'Adv', 'Business'].map(h => <th key={h} className="sticky-th bg-blue-50">{h}</th>)}

                        {/* Core Performance (Purple) */}
                        {['Core Retail', 'Core Agri', 'Core MSME'].map(h => <th key={h} className="sticky-th bg-purple-50">{h}</th>)}

                        {/* Agri & FI (Green) */}
                        {['KCC', 'SHG', 'Agri JL', 'Gov Schemes'].map(h => <th key={h} className="sticky-th bg-green-50">{h}</th>)}

                        {/* Retail Products (Orange) */}
                        {['Housing', 'Vehicle', 'Education', 'Personal', 'Mortgage', 'Liquirent', 'Jewel', 'Retail JL', 'Other Retail'].map(h => <th key={h} className="sticky-th bg-orange-50">{h}</th>)}

                        {/* MSME & Others (Gray) */}
                        {['Mudra', 'Other Schematic'].map(h => <th key={h} className="sticky-th bg-gray-50">{h}</th>)}

                        {/* Cash Management (Cyan) */}
                        {['Total Cash', 'Cash on Hand', 'ATM Cash', 'BNA Cash', 'Cash with BC'].map(h => <th key={h} className="sticky-th bg-cyan-50">{h}</th>)}

                        {/* Asset Quality (Red) */}
                        {['NPA', 'Slippage', 'Upgradation', 'Net Slippage', 'Recovery', 'OTS'].map(h => <th key={h} className="sticky-th bg-red-50">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className={`table-row ${row.sNo === 0 ? 'totals-row' : ''}`}>
                            <td className="table-cell sticky-col col-sno">{row.sNo}</td>
                            <td className="table-cell sticky-col col-sol">{row.sol}</td>
                            <td className="table-cell sticky-col col-date">{row.date}</td>
                            <td className="table-cell sticky-col col-branch text-left">{row.branch}</td>

                            {/* Key Params with Databars. We match columns by manual mapping or order. 
                                Since manual mapping is used below, we apply style there.
                            */}

                            {/* Business Figures */}
                            {['sb', 'cd', 'casa', 'td', 'rtd', 'totalDep', 'adv', 'business'].map(k => (
                                <td key={k} className={`table-cell bg-blue-50 ${['casa', 'totalDep', 'business'].includes(k) ? 'font-bold' : ''}`} style={row.sNo !== 0 ? getBarStyle(k, row[k]) : {}}>{typeof row[k] === 'number' ? row[k].toFixed(2) : row[k]}</td>
                            ))}

                            {/* Core Performance */}
                            {['coreRetail', 'coreAgri', 'coreMsme'].map(k => (
                                <td key={k} className="table-cell bg-purple-50 font-bold" style={row.sNo !== 0 ? getBarStyle(k, row[k]) : {}}>{typeof row[k] === 'number' ? row[k].toFixed(2) : row[k]}</td>
                            ))}

                            {/* Agri & FI */}
                            {['kcc', 'shg', 'agriJl', 'govSchemes'].map(k => (
                                <td key={k} className="table-cell bg-green-50" style={row.sNo !== 0 ? getBarStyle(k, row[k]) : {}}>{typeof row[k] === 'number' ? row[k].toFixed(2) : row[k]}</td>
                            ))}

                            {/* Retail Products */}
                            {['housing', 'vehicle', 'education', 'personal', 'mortgage', 'liquirent', 'jewel', 'retailJl', 'otherRetail'].map(k => (
                                <td key={k} className="table-cell bg-orange-50" style={row.sNo !== 0 ? getBarStyle(k, row[k]) : {}}>{typeof row[k] === 'number' ? row[k].toFixed(2) : row[k]}</td>
                            ))}

                            {/* MSME & Others */}
                            {['mudra', 'otherSchematic'].map(k => (
                                <td key={k} className="table-cell bg-gray-50" style={row.sNo !== 0 ? getBarStyle(k, row[k]) : {}}>{typeof row[k] === 'number' ? row[k].toFixed(2) : row[k]}</td>
                            ))}

                            {/* Cash Management */}
                            {['totalCash', 'cashOnHand', 'atmCash', 'bnaCash', 'cashWithBc'].map(k => (
                                <td key={k} className="table-cell bg-cyan-50" style={row.sNo !== 0 ? getBarStyle(k, row[k]) : {}}>{typeof row[k] === 'number' ? row[k].toFixed(2) : row[k]}</td>
                            ))}

                            {/* Asset Quality */}
                            {['npa', 'slippage', 'upgradation', 'netSlippage', 'recovery', 'ots'].map(k => (
                                <td key={k} className={`table-cell bg-red-50 ${k === 'netSlippage' ? 'font-bold' : ''} ${k === 'npa' || k === 'slippage' ? 'text-red' : ''} ${k === 'upgradation' || k === 'recovery' ? 'text-green' : ''} ${k === 'ots' ? 'text-blue' : ''}`} style={row.sNo !== 0 ? getBarStyle(k, row[k]) : {}}>{typeof row[k] === 'number' ? row[k].toFixed(2) : row[k]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Data Update Settings Component (Preserved as is)
const DataUpdateSettings = ({
    onClose, onSyncDowngraded, onSyncSanctions, onSyncGeneric,
    syncingState, metaData, schemes, onUpdateSchemes,
    reportDate, onReportDateChange
}) => {
    const [expandedSchemes, setExpandedSchemes] = useState(false);
    const [localSchemes, setLocalSchemes] = useState(schemes || {});
    const [newInputs, setNewInputs] = useState({});

    useEffect(() => { if (schemes) setLocalSchemes(schemes); }, [schemes]);

    const handleRemoveCode = (category, code) => {
        setLocalSchemes(prev => ({ ...prev, [category]: prev[category].filter(c => c !== code) }));
    };

    const handleAddCode = (category) => {
        const val = newInputs[category]?.trim();
        if (val) {
            if (localSchemes[category].includes(val)) { alert("Code already exists!"); return; }
            setLocalSchemes(prev => ({ ...prev, [category]: [...prev[category], val] }));
            setNewInputs(prev => ({ ...prev, [category]: '' }));
        }
    };

    const handleSchemeSave = () => { onUpdateSchemes(localSchemes); alert("Schemes updated!"); };
    const formatDate = (isoString) => {
        if (!isoString) return 'Never';
        try { return new Date(isoString).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
        catch (e) { return isoString; }
    };

    const SyncCard = ({ title, type, icon: Icon }) => (
        <div
            className={`sync-card ${syncingState[type] ? 'processing' : ''}`}
            onClick={() => { if (!syncingState[type]) { if (type === 'downgraded') onSyncDowngraded(); else if (type === 'sanctions') onSyncSanctions(); else onSyncGeneric(type); } }}
        >
            <div className={`sync-status-indicator ${metaData[type]?.lastSync || metaData.downgraded?.lastSync || metaData.sanctions?.lastSyncTime ? 'synced' : ''}`}></div>
            <div className="sync-card-icon">
                {Icon ? <Icon size={24} /> : <RefreshCw size={24} />}
            </div>
            <div className="sync-title">{title}</div>
            <div className="sync-meta">
                {syncingState[type] ? 'Syncing...' : (
                    type === 'downgraded' ? formatDate(metaData.downgraded?.lastSync) :
                        type === 'sanctions' ? formatDate(metaData.sanctions?.lastSyncTime) :
                            formatDate(metaData[type]?.lastSync)
                )}
            </div>
        </div>
    );

    return (
        <div className="data-update-overlay">
            <div className="data-update-modal">
                <button className="modal-close-floating" onClick={onClose} title="Close">
                    <X size={24} />
                </button>
                <div className="modal-scroll-content">
                    <h4 className="modal-header" style={{ marginTop: 0 }}>Update Data Parameters</h4>

                    {/* Report Date Config */}
                    <div className="report-date-config">
                        <div className="report-date-label">Scorecard Report Date</div>
                        <input
                            type="date"
                            value={reportDate}
                            onChange={(e) => onReportDateChange(e.target.value)}
                            className="report-date-input"
                        />
                    </div>

                    <div className="sync-grid">
                        <SyncCard title="Downgraded Accts" type="downgraded" icon={AlertTriangle} />
                        <SyncCard title="Sanctions" type="sanctions" icon={FileText} />
                        <SyncCard title="Key Params" type="key-params" icon={Database} />
                        <SyncCard title="Core Agri" type="core-agri" icon={Sprout} />
                        <SyncCard title="Bulk Deposit" type="bulk-deposit" icon={Coins} />
                        <SyncCard title="Cash" type="cash" icon={Banknote} />
                        <SyncCard title="Recovery" type="recovery" icon={RotateCcw} />
                        <SyncCard title="OTS" type="ots" icon={Handshake} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div className="scheme-config-container">
                            <div onClick={() => setExpandedSchemes(!expandedSchemes)} className="scheme-config-header">
                                <span style={{ fontWeight: '600', color: '#333' }}>Scheme Logic Configuration</span>
                                {expandedSchemes ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </div>
                            {expandedSchemes && (
                                <div className="scheme-config-body">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {Object.entries(localSchemes).map(([category, codes]) => (
                                            <div key={category} className="scheme-category">
                                                <div className="scheme-category-title">{category}</div>
                                                <div className="scheme-tags-container">
                                                    {codes.map((code, idx) => (<span key={idx} className="scheme-tag">{code} <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveCode(category, code)} /></span>))}
                                                    <input placeholder="+" className="scheme-input"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                const val = e.target.value.toUpperCase().trim();
                                                                if (val && !localSchemes[category].includes(val)) { setLocalSchemes(p => ({ ...p, [category]: [...p[category], val] })); e.target.value = ''; }
                                                            }
                                                        }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '1rem', textAlign: 'right' }}><button onClick={handleSchemeSave} className="btn btn-primary"><Save size={14} /> Save</button></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Scorecard = ({ divisionId, user }) => {
    const [data, setData] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [activeTab, setActiveTab] = useState('mis');
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [schemeData, setSchemeData] = useState(DEFAULT_SCHEMES);
    const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);

    const [allData, setAllData] = useState({
        downgraded: [], downgradedMeta: {}, upgraded: [], upgradedMeta: {}, sanctions: [], sanctionsMeta: {},
        keyParams: [], keyParamsMeta: {}, coreAgri: [], coreAgriMeta: {}, bulkDeposit: [], bulkDepositMeta: {}, cash: [], cashMeta: {},
        recovery: [], recoveryMeta: {}, ots: [], otsMeta: {}
    });

    const [syncingState, setSyncingState] = useState({
        downgraded: false, sanctions: false, 'key-params': false, 'core-agri': false, 'bulk-deposit': false, 'cash': false,
        recovery: false, ots: false
    });

    const fetchGeneric = async (type, key, metaKey) => {
        try {
            const res = await fetch(`http://localhost:5000/api/pms/${type}`);
            const result = await res.json();
            if (result.success) setAllData(prev => ({ ...prev, [key]: result.data, [metaKey]: result.meta }));
        } catch (e) { console.error(`Failed to fetch ${type}`, e); }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/api/pms/${divisionId || 'general'}`).then(res => res.json()).then(setData);
        fetch('http://localhost:5000/api/branches').then(res => res.json()).then(setBranchList);
        fetchGeneric('key-params', 'keyParams', 'keyParamsMeta');
        fetchGeneric('core-agri', 'coreAgri', 'coreAgriMeta');
        fetchGeneric('bulk-deposit', 'bulkDeposit', 'bulkDepositMeta');
        fetchGeneric('cash', 'cash', 'cashMeta');
        fetchGeneric('recovery', 'recovery', 'recoveryMeta');
        fetchGeneric('ots', 'ots', 'otsMeta');
        fetch('http://localhost:5000/api/pms/downgraded').then(res => res.json()).then(result => {
            if (result.success) setAllData(prev => ({ ...prev, downgraded: result.data || [], downgradedMeta: result.meta, upgraded: result.upgradedData || [], upgradedMeta: result.upgradedMeta }));
        });
        fetch('http://localhost:5000/api/pms/sanctions').then(res => res.json()).then(result => {
            if (result.success) setAllData(prev => ({ ...prev, sanctions: result.data || [], sanctionsMeta: result.meta }));
        });
    }, [divisionId]);

    const handleSyncGeneric = async (type) => {
        setSyncingState(prev => ({ ...prev, [type]: true }));
        try {
            const res = await fetch(`http://localhost:5000/api/pms/${type}/sync`, { method: 'POST' });
            const result = await res.json();
            if (result.success) {
                let key, metaKey;
                if (type === 'key-params') { key = 'keyParams'; metaKey = 'keyParamsMeta'; }
                if (type === 'core-agri') { key = 'coreAgri'; metaKey = 'coreAgriMeta'; }
                if (type === 'bulk-deposit') { key = 'bulkDeposit'; metaKey = 'bulkDepositMeta'; }
                if (type === 'cash') { key = 'cash'; metaKey = 'cashMeta'; }
                if (type === 'recovery') { key = 'recovery'; metaKey = 'recoveryMeta'; }
                if (type === 'ots') { key = 'ots'; metaKey = 'otsMeta'; }
                if (type === 'sanctions') { key = 'sanctions'; metaKey = 'sanctionsMeta'; }

                if (type === 'downgraded') {
                    const dRes = await fetch('http://localhost:5000/api/pms/downgraded');
                    const dResult = await dRes.json();
                    if (dResult.success) {
                        setAllData(prev => ({ ...prev, downgraded: dResult.data || [], downgradedMeta: dResult.meta, upgraded: dResult.upgradedData || [], upgradedMeta: dResult.upgradedMeta }));
                        alert("Downgraded Accounts Synced Successfully!");
                    }
                } else if (key) {
                    await fetchGeneric(type, key, metaKey);
                    alert(`${type} Synced Successfully!`);
                }
            } else alert('Sync Failed: ' + result.message);
        } catch (error) { console.error("Sync Error", error); alert("Sync Error"); }
        finally { setSyncingState(prev => ({ ...prev, [type]: false })); }
    };

    const branchCodeMap = useMemo(() => {
        const map = {};
        branchList.forEach(b => { if (b.branch_code) map[String(b.branch_code)] = b.branch_name; });
        return map;
    }, [branchList]);

    const resolveBranch = (row) => {
        const code = row['Br Code'] || row['SOL'] || row['SOL ID'] || row['SOL_ID'] || row['Branch Code'] || row['sol'];
        if (code && branchCodeMap[String(code).trim()]) return branchCodeMap[String(code).trim()];
        const name = row['Br Name'] || row['Branch Name'];
        if (name && name !== 'Unknown' && name.trim() !== '') return name;
        return code ? String(code).trim() : 'Unknown';
    };

    const calculateMetrics = (downgraded, upgraded) => {
        const monthMap = {};
        const branchMap = {};
        const allAccounts = [];
        let totalSlippage = 0, totalUpgraded = 0;

        downgraded.forEach(row => {
            const file = row['Source File'] || '';
            const monthMatch = file.match(/(\d{4})(\d{2})/);
            const monthKey = monthMatch ? `${monthMatch[1]}-${monthMatch[2]}` : 'Unknown';
            if (!monthMap[monthKey]) monthMap[monthKey] = { slipAmt: 0, slipCnt: 0, upAmt: 0, upCnt: 0 };
            const amt = Math.abs(parseFloat(row['Clear Balance'] || 0));
            monthMap[monthKey].slipAmt += amt;
            monthMap[monthKey].slipCnt += 1;
            totalSlippage += amt;
            const branch = resolveBranch(row);
            if (!branchMap[branch]) branchMap[branch] = { val: 0, count: 0 };
            branchMap[branch].val += amt;
            branchMap[branch].count += 1;
            allAccounts.push({ name: row['Account Name'], accNo: row['Account Number'], branch: branch, amt: amt, scheme: row['Scheme Code'] });
        });

        upgraded.forEach(row => {
            const file = row['Source File'] || '';
            const monthMatch = file.match(/(\d{4})(\d{2})/);
            const monthKey = monthMatch ? `${monthMatch[1]}-${monthMatch[2]}` : 'Unknown';
            if (!monthMap[monthKey]) monthMap[monthKey] = { slipAmt: 0, slipCnt: 0, upAmt: 0, upCnt: 0 };
            const amt = Math.abs(parseFloat(row['Clear Balance'] || 0));
            monthMap[monthKey].upAmt += amt;
            monthMap[monthKey].upCnt += 1;
            totalUpgraded += amt;
        });

        const monthlyStats = Object.keys(monthMap).sort().map(key => ({ month: key, original: key, label: key, ...monthMap[key] }));
        const allBranches = Object.entries(branchMap).map(([name, data]) => ({ name, val: data.val, count: data.count })).sort((a, b) => b.val - a.val);
        const topAccounts = allAccounts.sort((a, b) => b.amt - a.amt).slice(0, 10);
        return { monthlyStats, allBranches, topAccounts, totalSlippage, totalUpgraded, nilFyCount: 0, nilMonthCount: 0, latestMonthLabel: 'N/A' };
    };

    const metrics = useMemo(() => calculateMetrics(allData.downgraded, allData.upgraded), [allData.downgraded, allData.upgraded, branchCodeMap]);
    const sanctionsMetrics = useMemo(() => calculateSanctions(allData.sanctions, schemeData), [allData.sanctions, schemeData]);

    // Consolidated Data Logic (Moved to Top Level)
    const consolidatedData = useMemo(() => {
        const solMap = {};

        // 0. Seed from Branch Network
        const targetRegion = user?.linked_region_code || (divisionId && divisionId !== 'general' ? divisionId : null);

        branchList.forEach(b => {
            // Filter by region if applicable
            if (targetRegion && String(b.region_code) !== String(targetRegion)) return;

            const solId = String(b.branch_code).trim().replace(/^0+/, '');
            if (!solId) return;

            solMap[solId] = {
                sNo: 0, sol: solId, date: reportDate, branch: b.branch_name,
                sb: 0, cd: 0, td: 0, adv: 0, bulk: 0, coreAgri: 0,
                totalCash: 0, cashOnHand: 0, atmCash: 0, bnaCash: 0, cashWithBc: 0, // Cash
                shg: 0, kcc: 0, // Core Agri breakdowns
                totalDep: 0, // Added explicit Total Dep field from source
                slippage: 0, upgradation: 0, recovery: 0, ots: 0, sanctions: []
            };
        });

        const getSolId = (row) => {
            return row['Branch Code'] || row['SOL'] || row['SOL ID'] || row['SOL_ID'] || row['Sol Id'] ||
                row['Br Code'] || row['solId'] || row['sol'] || row['Code'];
        };

        const getEntry = (rowOrId) => {
            let id = typeof rowOrId === 'object' ? getSolId(rowOrId) : rowOrId;
            id = String(id || '').trim();
            // Normalize ID: Remove leading zeros (e.g. '0174' -> '174')
            id = id.replace(/^0+/, '');

            if (!id && typeof rowOrId === 'object') {
                // Try Name resolution if ID missing
                const name = rowOrId['Br Name'] || rowOrId['Branch Name'];
                if (name) {
                    // Reverse lookup in solMap? Expensive.
                    // Let's iterate solMap to find matching name
                    const found = Object.values(solMap).find(e => e.branch === name);
                    if (found) return found;
                }
            }

            if (!id) return null;

            if (!solMap[id]) {
                // If branch not in network list but in data, we can optionally add it or ignore.
                // Current logic implies adding it.
                // Resolving name
                const bName = resolveBranch({ 'SOL_ID': id });
                solMap[id] = {
                    sNo: 0, sol: id, date: reportDate, branch: bName,
                    sb: 0, cd: 0, td: 0, adv: 0, bulk: 0, coreAgri: 0,
                    totalCash: 0, cashOnHand: 0, atmCash: 0, bnaCash: 0, cashWithBc: 0,
                    shg: 0, kcc: 0,
                    slippage: 0, upgradation: 0, recovery: 0, ots: 0, sanctions: []
                };
            }
            return solMap[id];
        };

        // Helper to parse numbers (handle commas)
        const parseNumber = (val) => {
            if (typeof val === 'number') return val;
            if (!val) return 0;
            return parseFloat(String(val).replace(/,/g, '').trim()) || 0;
        };

        // 1. Process Key Params (Verified Headers)
        // 1. Process Key Params (Verified Headers)

        (allData.keyParams || []).forEach(row => {
            const entry = getEntry(row);
            if (entry) {
                // Ensure date is set from source if available
                if (row['Period']) entry.date = row['Period'];

                // If Branch Name is available in source, use it (Fixes "Numbers as Names" issue)
                // REVERTED: User requested Branch Network value.
                // if (row['Branch Name']) entry.branch = row['Branch Name'];

                // Values are in Crores. Convert to Raw Rupees (* 10^7) so downstream logic (Step 3: /100000) shows Lakhs.
                // 1 Cr = 100 Lakhs. 
                // Currently: Value(Cr) * 10^7 / 10^5 = Value(Cr) * 100 = Value(Lakhs). Correct.
                const CR_TO_RAW = 10000000;

                entry.sb = parseNumber(row['Savings Bank'] || row['SB']) * CR_TO_RAW;
                entry.cd = parseNumber(row['Current Deposits'] || row['CD']) * CR_TO_RAW;
                entry.td = parseNumber(row['Term Deposits'] || row['TD']) * CR_TO_RAW;
                entry.adv = parseNumber(row['Advances'] || row['ADVANCES']) * CR_TO_RAW;

                // Map explicit 'Deposits' column to totalDep
                if (row['Deposits']) entry.totalDep = parseNumber(row['Deposits']) * CR_TO_RAW;

                // Business might be explicit
                if (row['Business']) entry.business = parseNumber(row['Business']) * CR_TO_RAW;
            }
        });

        (allData.bulkDeposit || []).forEach(row => {
            const entry = getEntry(row);
            if (entry) entry.bulk += parseNumber(row['BALANCE'] || row['Balance'] || row['Amount']);
        });

        (allData.coreAgri || []).forEach(row => {
            const entry = getEntry(row);
            // Source is in Crores (often negative). Convert to Positive Raw Units (x10000000)
            const amountInCrores = Math.abs(parseNumber(row['TOTAL BALANCE(In Crores)'] || row['Amount'] || row['Balance']));
            if (entry) {
                entry.coreAgri += amountInCrores * 10000000;

                // Check for SHG / KCC from Core Agri source using 'LOAN TYPE'
                // User requirement: 
                // shg is B.SHG LOANS
                // kcc is A.KCC-CROP LOANS
                const loanType = (row['LOAN TYPE'] || row['Loan Type'] || '').trim().toUpperCase();

                // Flexible check for exact match or substring if needed, user gave exact strings but casing might vary
                if (loanType === 'B.SHG LOANS') entry.shg += amountInCrores * 10000000;
                if (loanType === 'A.KCC-CROP LOANS') entry.kcc += amountInCrores * 10000000;
            }
        });

        (allData.cash || []).forEach(row => {
            const entry = getEntry(row);
            // Source is in Lakhs, convert to Raw Units (x100000) so display logic (which divides by 100000) works
            if (entry) {
                entry.totalCash += parseNumber(row['Total Cash'] || row['Cash on Hand'] || row['Balance']) * 100000;
                entry.cashOnHand += parseNumber(row['Cash on Hand']) * 100000;
                entry.atmCash += parseNumber(row['ATM Cash']) * 100000;
                entry.bnaCash += parseNumber(row['Bulk Note Acceptance']) * 100000;
                entry.cashWithBc += parseNumber(row['Cash With BC']) * 100000;
            }
        });

        (allData.sanctions || []).forEach(row => {
            const entry = getEntry(row);
            if (entry) entry.sanctions.push(row);
        });

        // New Aggregations
        (allData.downgraded || []).forEach(row => {
            const entry = getEntry(row);
            if (entry) entry.slippage += Math.abs(parseFloat(row['Clear Balance'] || 0));
        });

        (allData.upgraded || []).forEach(row => {
            const entry = getEntry(row['SOL ID'] || row['Branch Code']);
            if (entry) entry.upgradation += Math.abs(parseFloat(row['Clear Balance'] || 0));
        });

        (allData.recovery || []).forEach(row => {
            const entry = getEntry(row['SOL ID'] || row['Branch Code']);
            if (entry) entry.recovery += parseFloat(row['Amount'] || row['Recovery Amount'] || 0);
        });

        (allData.ots || []).forEach(row => {
            const entry = getEntry(row['SOL ID'] || row['Branch Code']);
            if (entry) entry.ots += parseFloat(row['Amount'] || row['OTS Amount'] || 0);
        });

        const rowsRaw = Object.values(solMap)
            .sort((a, b) => parseInt(a.sol) - parseInt(b.sol));

        // Calculate Totals (on Raw Values)
        const totalsRaw = rowsRaw.reduce((acc, row) => {
            const rowMetrics = calculateSanctions(row.sanctions, schemeData);
            const coreRetail = rowMetrics.housing + rowMetrics.vehicle + rowMetrics.personal + rowMetrics.mortgage + rowMetrics.education + rowMetrics.liquirent + rowMetrics.otherRetail;
            const coreMsme = rowMetrics.coreMsme; // coreMsme is already calculated inside rowMetrics correctly? No, calculateSanctions returns it. 
            // Wait, calculateMetrics in map below re-runs calculateSanctions.
            // Let's optimize: First map to enhanced objects with metrics, THEN sum.

            return acc; // logic moved below
        }, {});

        // Step 1: Enhance rows with calculated metrics (still raw units)
        const enhancedRows = rowsRaw.map((e) => {
            const sMetrics = calculateSanctions(e.sanctions, schemeData);
            const casa = e.sb + e.cd;
            const rtd = e.td - e.bulk;
            // Use explicit Total Dep if available, otherwise calculate
            const totalDep = e.totalDep || (casa + e.td);
            // Re-calculate Business if need consistency or use source?
            // If source has Business, e.business is set.
            const business = e.business || (totalDep + e.adv);
            const coreRetail = sMetrics.housing + sMetrics.vehicle + sMetrics.personal + sMetrics.mortgage + sMetrics.education + sMetrics.liquirent + sMetrics.otherRetail;
            const coreMsme = sMetrics.coreMsme;
            const netSlippage = e.slippage - e.upgradation;

            return {
                ...e, casa, rtd, totalDep, business,
                ...sMetrics,
                shg: e.shg, kcc: e.kcc, // Explicitly use Core Agri values (overwriting sMetrics if any)
                coreRetail, coreMsme, netSlippage,
                date: reportDate
            };
        });

        // Step 2: Calculate Totals from Enhanced Rows (Exclude Region Office 3933 to avoid double counting)
        const dataRows = enhancedRows.filter(r => r.sol !== '3933');

        const totals = dataRows.reduce((acc, row) => {
            Object.keys(row).forEach(key => {
                if (typeof row[key] === 'number' && key !== 'sNo') {
                    acc[key] = (acc[key] || 0) + row[key];
                }
            });
            return acc;
        }, {});

        // Step 3: Convert Rows to Lakhs and add S No
        const finalRows = dataRows.map((row, idx) => {
            const converted = { ...row, sNo: idx + 1 };
            Object.keys(converted).forEach(key => {
                // Convert all numeric monetary fields to Lakhs
                if (typeof converted[key] === 'number' && key !== 'sNo') {
                    converted[key] = converted[key] / 100000;
                }
            });
            return converted;
        });

        // Step 4: Create Total Row in Crores
        const totalRow = {
            ...totals,
            sNo: 0,
            sol: '3933',
            date: reportDate,
            branch: 'Dindigul Region'
        };

        Object.keys(totalRow).forEach(key => {
            // Convert all numeric monetary fields to Crores
            if (typeof totalRow[key] === 'number' && key !== 'sNo') {
                totalRow[key] = totalRow[key] / 10000000;
            }
        });

        return [totalRow, ...finalRows];
    }, [allData, resolveBranch, schemeData, branchList, user, divisionId, reportDate]);


    const getBranchDetails = (branchName) => {
        const branchRows = allData.downgraded.filter(r => resolveBranch(r) === branchName);
        const customerMap = {};
        branchRows.forEach(r => {
            const custId = r['Customer Id'] || r['Account Number'] || Math.random();
            const name = r['Account Name'] || 'Unknown';
            if (!customerMap[custId]) customerMap[custId] = { id: custId, name, count: 0, totalAmt: 0, schemes: new Set() };
            customerMap[custId].count++;
            customerMap[custId].totalAmt += Math.abs(parseFloat(r['Clear Balance'] || 0));
            customerMap[custId].schemes.add(r['Scheme Code']);
        });
        return Object.values(customerMap).sort((a, b) => b.totalAmt - a.totalAmt);
    };

    if (!data) return <div>Loading Scorecard...</div>;

    return (
        <div className="scorecard-container">
            {showSettings && <DataUpdateSettings
                onClose={() => setShowSettings(false)}
                onSyncDowngraded={() => handleSyncGeneric('downgraded')}
                onSyncSanctions={() => handleSyncGeneric('sanctions')}
                onSyncGeneric={handleSyncGeneric}
                syncingState={syncingState}
                metaData={{
                    downgraded: allData.downgradedMeta,
                    sanctions: allData.sanctionsMeta,
                    'key-params': allData.keyParamsMeta,
                    'core-agri': allData.coreAgriMeta,
                    'bulk-deposit': allData.bulkDepositMeta,
                    'cash': allData.cashMeta,
                    'recovery': allData.recoveryMeta,
                    'ots': allData.otsMeta
                }}
                schemes={schemeData}
                onUpdateSchemes={setSchemeData}
                reportDate={reportDate}
                onReportDateChange={setReportDate}
            />}

            <div className="page-header">
                <h3>Performance Scorecard</h3>
                {user?.role === 'RO' && user?.departments?.includes('1002') && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={() => {
                            const exportData = {
                                data: consolidatedData,
                                date: reportDate
                            };
                            fetch('http://localhost:5000/api/pms/scorecard/export', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(exportData)
                            })
                                .then(res => res.json())
                                .then(res => {
                                    if (res.success) alert(res.message);
                                    else alert('Export Failed: ' + res.message);
                                })
                                .catch(err => {
                                    console.error(err);
                                    alert('Export Error');
                                });
                        }} className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Download size={16} /> Export JSON
                        </button>
                        <button onClick={() => setShowSettings(true)} className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Settings size={16} /> Update Data
                        </button>
                    </div>
                )}
            </div>

            <div className="tabs-container">
                {[{ id: 'mis', label: 'MIS' }, { id: 'dpc', label: 'Data Processing Centre' }].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab: MIS (KPIs) */}
            <div className={`kpi-grid ${activeTab === 'mis' ? '' : 'hidden'}`} style={{ display: activeTab === 'mis' ? 'grid' : 'none' }}>
                <div className="card" style={{ background: 'var(--primary-color)', color: 'white' }}><div>Overall Score</div><div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{data.score}</div></div>
                {data.kpis.map((k, i) => <div key={i} className="card"><div>{k.name}</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{k.value}</div></div>)}
            </div>

            {/* Tab: DPC (Table) - Kept mounted for performance */}
            <div style={{ display: activeTab === 'dpc' ? 'flex' : 'none', flexDirection: 'column', gap: '2rem', flex: 1, minHeight: 0, overflow: 'hidden' }}>
                <ConsolidatedTable data={consolidatedData} />
            </div>
        </div>
    );
};

export default Scorecard;
