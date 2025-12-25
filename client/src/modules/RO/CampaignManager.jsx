import React, { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { Plus, Upload, FileText, BarChart2, Calendar, Trash2, Edit, AlertCircle, CheckCircle, Save, X, List, TrendingUp, TrendingDown, Award, AlertTriangle, Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import BranchMap from '../Admin/BranchMap';
import iobLogo from '../../assets/iob_logo_opt.png';
import { formatDate, formatNumber } from '../../utils/formatters';
import './CampaignManager.css';
import './Infographics.css';

const CampaignManager = ({ user }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [myDepartments, setMyDepartments] = useState([]);
    const [branches, setBranches] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [msg, setMsg] = useState('');
    const [viewingCampaign, setViewingCampaign] = useState(null);
    const [activeTab, setActiveTab] = useState('data');

    // Manual Entry State
    const [showManualEntry, setShowManualEntry] = useState(false);
    const [manualForm, setManualForm] = useState({
        id: '', // SOL or Staff ID
        details: '',
        date: new Date().toISOString().split('T')[0],
        achievement: ''
    });

    // Form State for Creating/Editing
    const [form, setForm] = useState({
        title: '',
        description: '',
        department_code: '',
        startDate: '',
        endDate: '',
        type: 'Growth',
        unit: 'Count',
        image: '',
        overall_target: '', // Manual Region Target
        data: [], // Targets
        achievement_entries: [] // Detailed Transactions
    });

    const [uploadMode, setUploadMode] = useState('append'); // 'append' or 'replace'

    // Derived Permissions
    const canCreate = user?.departments && user.departments.length > 0;

    const formatNumber = (num) => {
        return Number(num || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    };

    useEffect(() => {
        fetchCampaigns();
        // Fetch Master Data for Lookups
        fetch('http://localhost:5000/api/branches').then(r => r.json()).then(setBranches).catch(console.error);
        fetch('http://localhost:5000/api/users/lookup').then(r => r.json()).then(setStaffList).catch(console.error);

        if (canCreate) {
            fetchMyDepartments();
        }
    }, [user]);

    const getName = (id, type) => {
        if (!id) return '-';
        const strId = String(id);

        // Try exact match first
        let b = branches.find(b => b.branch_code === strId);

        // If not found and looks like a short SOL (e.g. "376"), try padding to 4 chars
        if (!b && strId.length < 4) {
            b = branches.find(b => b.branch_code === strId.padStart(4, '0'));
        }

        if (b) return b.branch_name;

        // Fallback or Staff check
        const s = staffList.find(s => String(s.pf_number) === strId);
        if (s) return s.name;

        return id;
    };

    const fetchCampaigns = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/campaigns');
            if (res.ok) setCampaigns(await res.json());
        } catch (err) { console.error("Failed to fetch campaigns", err); }
    };

    const fetchMyDepartments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/departments');
            if (res.ok) {
                const allDepts = await res.json();
                const myDepts = allDepts.filter(d => user.departments.includes(d.code));
                setMyDepartments(myDepts);
            }
        } catch (err) { console.error(err); }
    };

    const handleEdit = (camp) => {
        setForm({
            title: camp.title,
            description: camp.description,
            department_code: camp.department_code,
            startDate: camp.startDate,
            endDate: camp.endDate,
            type: camp.type,
            unit: camp.unit,
            image: camp.image,
            overall_target: camp.overall_target,
            data: camp.data || [],
            achievement_entries: camp.achievement_entries || []
        });
        setSelectedCampaign(camp);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this campaign?')) return;
        await fetch(`http://localhost:5000/api/campaigns/${id}`, { method: 'DELETE' });
        fetchCampaigns();
    };

    const handleCreateClick = () => {
        setForm({
            title: '', description: '', department_code: myDepartments[0]?.code || '',
            startDate: '', endDate: '', type: 'Growth', unit: 'Count', image: '',
            data: [], achievement_entries: []
        });
        setIsEditing(false);
        setSelectedCampaign(null);
        setShowForm(true);
    };

    // Generic file parser
    const parseExcel = (file, callback) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(ws);
                callback(data);
            } catch (err) {
                console.error("Excel Parsing Error:", err);
                alert("Failed to parse Excel file.");
            }
        };
        reader.readAsBinaryString(file);
    };

    // Type 1: Upload Targets (Sets Data array)
    const handleTargetUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        parseExcel(file, (data) => {
            if (data.length === 0) return alert("File is empty");

            const parsedData = data.map(row => {
                const find = (keys) => {
                    for (let k of keys) {
                        const found = Object.keys(row).find(rk => rk.toLowerCase() === k.toLowerCase());
                        if (found) return row[found];
                    }
                    return null;
                };

                const branchCode = find(['SOL', 'Branch Code', 'Branch', 'BranchCode']);
                const staffRoll = find(['Staff Roll', 'Roll No', 'PF Number', 'StaffNo']);
                const target = find(['Target', 'Goal', 'Target Amount']);

                if ((branchCode || staffRoll) && target !== null) {
                    return {
                        branch_code: String(branchCode || ''),
                        staff_roll_number: String(staffRoll || ''),
                        target: Number(target),
                        achievement: 0, // Legacy field, kept 0. We compute from entries.
                        details: ''     // Legacy
                    };
                }
                return null;
            }).filter(Boolean);

            if (parsedData.length > 0) {
                if (confirm(`Found ${parsedData.length} records. This will REPLACE existing targets. Continue?`)) {
                    setForm(prev => ({ ...prev, data: parsedData }));
                }
            } else {
                alert("No valid Target data found. Columns needed: SOL/Roll No, Target");
            }
        });
    };

    // Type 2: Update Achievements (Appends to achievement_entries)
    const handleAchievementUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        parseExcel(file, (data) => {
            if (data.length === 0) return alert("File is empty");

            // Debug: Check headers of first row
            const headers = Object.keys(data[0]);
            console.log("Found Headers:", headers);

            const newEntries = [];
            const today = new Date().toISOString().split('T')[0];

            data.forEach(row => {
                const find = (keys) => {
                    for (let k of keys) {
                        const found = Object.keys(row).find(rk => rk.trim().toLowerCase() === k.toLowerCase());
                        if (found) return row[found];
                    }
                    return null;
                };

                const id = find(['SOL', 'Branch Code', 'Branch', 'BranchCode', 'Staff Roll', 'Roll No']);
                const achv = find(['Achievement', 'Actual', 'Done', 'Achieved', 'Amount']);
                let date = find(['Date', 'Txn Date']) || today;
                const details = find(['Details', 'Remarks', 'Description', 'Reference']) || 'Bulk Upload';

                // Helper to convert Excel Serial Date (e.g., 46011) to YYYY-MM-DD
                if (typeof date === 'number' && date > 20000) {
                    const excelEpoch = new Date(1899, 11, 30);
                    const dt = new Date(excelEpoch.getTime() + date * 86400000);
                    const y = dt.getFullYear();
                    const m = String(dt.getMonth() + 1).padStart(2, '0');
                    const d = String(dt.getDate()).padStart(2, '0');
                    date = `${y}-${m}-${d}`;
                }

                if (id && achv !== null) {
                    newEntries.push({
                        sol_or_staff: String(id),
                        date: String(date),
                        details: String(details),
                        amount: Number(achv)
                    });
                }
            });

            if (newEntries.length > 0) {
                setForm(prev => {
                    // Logic based on uploadMode
                    const updatedEntries = uploadMode === 'replace'
                        ? newEntries
                        : [...(prev.achievement_entries || []), ...newEntries];

                    return { ...prev, achievement_entries: updatedEntries };
                });
                alert(`${uploadMode === 'replace' ? 'Replaced with' : 'Appended'} ${newEntries.length} entries.`);
            } else {
                alert(`No valid Achievement data found.\n\nDetected Headers: ${headers.join(', ')}\n\nExpected Headers: SOL/Roll No, Achievement`);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing
            ? `http://localhost:5000/api/campaigns/${selectedCampaign.id}`
            : 'http://localhost:5000/api/campaigns';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error(await res.text() || res.statusText);

            const data = await res.json();
            if (data.success) {
                setShowForm(false);
                fetchCampaigns();

                // Refresh detail view if open
                if (viewingCampaign && viewingCampaign.id === data.campaign.id) {
                    // Update local state with the returned campaign, ensuring arrays exist
                    setViewingCampaign({
                        ...data.campaign,
                        data: data.campaign.data || [],
                        achievement_entries: data.campaign.achievement_entries || []
                    });
                }

                setMsg('Campaign Saved!');
                setTimeout(() => setMsg(''), 3000);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Submit Error:", err);
            alert(`Failed to save campaign: ${err.message}`);
        }
    };

    const handleView = (camp) => {
        // Ensure arrays exist
        setViewingCampaign({
            ...camp,
            data: camp.data || [],
            achievement_entries: camp.achievement_entries || []
        });
        setActiveTab('data');
    };

    const closeView = () => setViewingCampaign(null);

    // Compute Aggregated Data for 'Data' Tab
    // Returns array: [{ id, target, achievement, pct, details }] merged from targets (data) and achievement_entries
    const getAggregatedData = (camp) => {
        const map = new Map();

        // 1. Init from Targets
        camp.data.forEach(item => {
            const id = item.branch_code || item.staff_roll_number;
            const type = item.branch_code ? 'branch' : 'staff';
            map.set(id, { id, type, target: item.target, achievement: 0, details: [] });
        });

        // 2. Sum Achievements
        camp.achievement_entries.forEach(entry => {
            const id = entry.sol_or_staff;
            if (!map.has(id)) {
                // Infer type if possible from lookup existence (Branch priority)
                const isBranch = branches.some(b => b.branch_code === String(id));
                const type = isBranch ? 'branch' : 'staff';
                map.set(id, { id, type, target: 0, achievement: 0, details: [] });
            }
            const rec = map.get(id);
            rec.achievement += entry.amount;
            // Optionally we could store last few details, but for now we aggregate numbers
        });

        // Helper to resolve name with strict typing
        const getName = (id, type) => {
            const strId = String(id);
            const paddedId = strId.padStart(4, '0');

            // Quick lookup helpers
            const findBranch = (val) => branches.find(b => b.branch_code === val);
            const findStaff = (val) => staffList.find(u => u.roll_number === val);

            // If type is known, restrict lookup
            if (type === 'branch') {
                const b = findBranch(strId) || findBranch(paddedId);
                return b ? b.branch_name : '—';
            }
            if (type === 'staff') {
                const u = findStaff(strId) || findStaff(paddedId);
                return u ? u.full_name : '—';
            }

            // Fallback: Try both (Priority: Branch -> Staff)
            const b = findBranch(strId) || findBranch(paddedId);
            if (b) return b.branch_name;

            const u = findStaff(strId) || findStaff(paddedId);
            if (u) return u.full_name;
            return '—';
        };

        // Calculate per-row percentage against individual target, if any
        return Array.from(map.values()).map(r => ({
            ...r,
            name: getName(r.id, r.type),
            pct: r.target > 0 ? ((r.achievement / r.target) * 100).toFixed(1) : '—'
        }));
    };

    const aggregatedData = useMemo(() => {
        if (!viewingCampaign) return [];
        const data = getAggregatedData(viewingCampaign);
        // Sort by Achievement (Descending)
        return data.sort((a, b) => b.achievement - a.achievement);
    }, [viewingCampaign]);


    // Manual Entry Logic (Detail View)
    const openManualEntry = () => {
        setShowManualEntry(true);
        setManualForm({ id: '', details: '', date: new Date().toISOString().split('T')[0], achievement: '' });
    };

    const saveManualEntry = async () => {
        if (!manualForm.id || !manualForm.achievement) return alert("ID and Achievement are required");

        const newEntry = {
            sol_or_staff: manualForm.id,
            date: manualForm.date,
            details: manualForm.details,
            amount: Number(manualForm.achievement)
        };

        // Update Local State for UI
        const updatedCampaign = {
            ...viewingCampaign,
            achievement_entries: [...viewingCampaign.achievement_entries, newEntry]
        };
        setViewingCampaign(updatedCampaign);
        setShowManualEntry(false);

        // Persist
        try {
            await fetch(`http://localhost:5000/api/campaigns/${viewingCampaign.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ achievement_entries: updatedCampaign.achievement_entries })
            });
            fetchCampaigns(); // Refresh bg list
            setMsg('Entry Added!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err) {
            alert("Failed to save entry");
        }
    };


    // Render Detail View
    if (viewingCampaign) {
        const totalTarget = viewingCampaign.overall_target || 1;
        const totalAchv = aggregatedData.reduce((s, x) => s + x.achievement, 0);
        const percent = Math.min((totalAchv / totalTarget) * 100, 100).toFixed(1);
        const maxAchievement = Math.max(...aggregatedData.map(d => d.achievement), 1);

        return (
            <div className="campaign-detail-container fade-in">
                <button onClick={closeView} className="btn-back">
                    ← Back to Campaigns
                </button>

                <div className="campaign-detail-card">
                    <div className="detail-header">
                        <div className="detail-title-section">
                            <span className="dept-badge">{viewingCampaign.department_code}</span>
                            <h2>{viewingCampaign.title}</h2>
                            <p>{viewingCampaign.description}</p>
                            <div className="detail-meta">
                                <span className="meta-item"><Calendar size={14} /> {formatDate(viewingCampaign.startDate || viewingCampaign.start_date)} to {formatDate(viewingCampaign.endDate || viewingCampaign.end_date)}</span>
                                <span className={`type-badge ${viewingCampaign.type.toLowerCase()}`}>{viewingCampaign.type}</span>
                            </div>
                        </div>
                        {canCreate && user.departments.includes(viewingCampaign.department_code) && (
                            <div className="detail-actions">
                                <button onClick={() => { closeView(); handleEdit(viewingCampaign); }} className="btn btn-outline small">
                                    <Edit size={16} /> Edit
                                </button>
                                <button onClick={() => handleDelete(viewingCampaign.id)} className="btn btn-outline-danger small">
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="detail-tabs">
                        <button onClick={() => setActiveTab('data')} className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}>
                            Campaign Data
                        </button>
                        <button onClick={() => setActiveTab('details')} className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}>
                            Details (Transactions)
                        </button>
                        <button onClick={() => setActiveTab('infographics')} className={`tab-btn ${activeTab === 'infographics' ? 'active' : ''}`}>
                            Infographics
                        </button>

                    </div>

                    <div className="tab-content">
                        {/* Summary Data Tab */}
                        {activeTab === 'data' && (
                            <div className="animate-fade">
                                {canCreate && user.departments.includes(viewingCampaign.department_code) && (
                                    <div className="actions-bar">
                                        <button onClick={openManualEntry} className="btn btn-primary small">
                                            <Plus size={16} /> Add Performance
                                        </button>
                                    </div>
                                )}

                                <div className="data-table-wrapper">
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                {/* Dynamic Header Logic */}
                                                <th>{(() => {
                                                    const branchesCount = aggregatedData.filter(r => r.type === 'branch').length;
                                                    const staffCount = aggregatedData.filter(r => r.type === 'staff').length;
                                                    if (branchesCount > 0 && staffCount === 0) return 'SOL';
                                                    if (staffCount > 0 && branchesCount === 0) return 'Staff ID';
                                                    return 'SOL / Staff ID';
                                                })()}</th>
                                                <th>Branch / Staff Name</th>
                                                <th className="text-right">Target ({viewingCampaign.unit})</th>
                                                <th className="text-right">Achievement ({viewingCampaign.unit})</th>
                                                <th className="text-right">% Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {aggregatedData.map((row, i) => (
                                                <tr key={i}>
                                                    <td className="font-medium">{row.id}</td>
                                                    <td>{row.name}</td>
                                                    <td className="text-right mono">{formatNumber(row.target)}</td>
                                                    <td className="text-right mono bold" style={{ position: 'relative' }}>
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '10%',
                                                            bottom: '10%',
                                                            left: 0,
                                                            width: `${(row.achievement / maxAchievement) * 100}%`,
                                                            backgroundColor: '#e0f2fe',
                                                            zIndex: 0,
                                                            borderRadius: '0 4px 4px 0',
                                                            opacity: 0.6
                                                        }}></div>
                                                        <span style={{ position: 'relative', zIndex: 1 }}>{formatNumber(row.achievement)}</span>
                                                    </td>
                                                    <td className="text-right">
                                                        <span className={`status-badge ${Number(row.pct) >= 100 ? 'success' : 'pending'}`}>
                                                            {row.pct}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {aggregatedData.length === 0 && <tr><td colSpan="5" className="empty-state">No data available.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Details (Transactions) Tab */}
                        {activeTab === 'details' && (
                            <div className="animate-fade">
                                <div className="data-table-wrapper">
                                    <table className="styled-table small">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>SOL / Staff</th>
                                                <th>Details</th>
                                                <th className="text-right">Amount / Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...viewingCampaign.achievement_entries].reverse().map((entry, i) => (
                                                <tr key={i}>
                                                    <td>{formatDate(entry.date)}</td>
                                                    <td className="font-medium">{entry.sol_or_staff}</td>
                                                    <td>{entry.details}</td>
                                                    <td className="text-right mono bold">{formatNumber(entry.amount)}</td>
                                                </tr>
                                            ))}
                                            {viewingCampaign.achievement_entries.length === 0 && (
                                                <tr><td colSpan="4" className="empty-state">No transaction entries found.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Infographics Tab */}
                        {activeTab === 'infographics' && (
                            <div className="infographics-grid animate-fade">
                                {/* Row 1: Overall Stats */}
                                <div className="chart-card full-width-chart">
                                    <h3><BarChart2 size={20} /> Overall Performance</h3>
                                    <div className="big-stat-row">
                                        <div className="big-stat-item">
                                            <div className="stat-value">{percent}%</div>
                                            <div className="stat-label">Completion</div>
                                        </div>
                                        <div className="progress-bar-container large">
                                            <div className="progress-bar-fill" style={{ width: `${percent}%`, backgroundColor: Number(percent) >= 100 ? '#22c55e' : '#3b82f6' }}></div>
                                        </div>
                                        <div className="stat-boxes">
                                            <div className="stat-box">
                                                <div className="label">Region Target</div>
                                                <div className="value">{formatNumber(totalTarget)}</div>
                                            </div>
                                            <div className="stat-box highlight">
                                                <div className="label">Achievement</div>
                                                <div className="value">{formatNumber(totalAchv)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lists */}
                                {(() => {
                                    const sorted = [...aggregatedData].sort((a, b) => b.achievement - a.achievement);

                                    // Top 20% Logic
                                    const topCount20 = Math.ceil(aggregatedData.length * 0.20) || 1;
                                    const topData = sorted.slice(0, topCount20);

                                    // Bottom 20% Logic
                                    const sortedAsc = [...aggregatedData].sort((a, b) => a.achievement - b.achievement);
                                    const bottomData = sortedAsc.slice(0, topCount20);

                                    const achievers = aggregatedData
                                        .filter(r => r.target > 0 && r.achievement >= r.target)
                                        .sort((a, b) => {
                                            const pctA = (a.achievement / a.target) * 100;
                                            const pctB = (b.achievement / b.target) * 100;
                                            return pctB - pctA;
                                        });

                                    const nilPerformers = aggregatedData.filter(r => r.achievement === 0);


                                    const formatNumber = (num) => {
                                        return Number(num || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
                                    };

                                    const handleExport = async (panelId, title) => {
                                        const element = document.getElementById(panelId);
                                        if (!element) return;

                                        // Create wrapper
                                        const captureWrapper = document.createElement('div');
                                        captureWrapper.style.position = 'absolute';
                                        captureWrapper.style.left = '-9999px';
                                        captureWrapper.style.top = '0';
                                        captureWrapper.style.width = (element.offsetWidth + 40) + 'px'; // width + padding
                                        captureWrapper.style.backgroundColor = '#fff';
                                        captureWrapper.style.padding = '20px'; // Add margin around content
                                        document.body.appendChild(captureWrapper);

                                        // Inject Header
                                        // Layout: 
                                        // Row 1: Logo (Left) ... Campaign Image (Right)
                                        // Row 2: Title & Region
                                        const regionName = user?.region_name || user?.region_code ? `Region: ${user.region_name || user.region_code}` : '';

                                        const headerHtml = `
                                            <div style="padding:1rem;background:#fff;border-bottom:1px solid #e2e8f0;font-family:inherit;margin-bottom:1rem;">
                                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                                                    <img src="${iobLogo}" style="height:60px;object-fit:contain;" />
                                                    ${viewingCampaign.image ? `<img src="${viewingCampaign.image}" style="height:80px;width:auto;object-fit:contain;" />` : '<div></div>'}
                                                </div>
                                                <div style="text-align:center;">
                                                    <h3 style="font-size:1.8rem;color:#0f172a;margin:0 0 0.25rem 0;font-weight:700;line-height:1.2;">${viewingCampaign.title}</h3>
                                                    ${regionName ? `<p style="font-size:1rem;color:#64748b;margin:0;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${regionName}</p>` : ''}
                                                </div>
                                            </div>
                                        `;
                                        captureWrapper.innerHTML = headerHtml;

                                        // Clone Panel
                                        const clone = element.cloneNode(true);
                                        clone.style.margin = '0';
                                        clone.style.boxShadow = 'none';
                                        // Removed lines that stripped border and radius to preserve "Achievers" top bar style

                                        // Remove export button from clone
                                        const btn = clone.querySelector('.export-btn');
                                        if (btn) btn.remove();

                                        // Expand list to show all items
                                        const scrollArea = clone.querySelector('.list-scroll');
                                        if (scrollArea) {
                                            scrollArea.style.maxHeight = 'none';
                                            scrollArea.style.overflow = 'visible';
                                        }

                                        // Make Header Prominent
                                        const panelHeader = clone.querySelector('h4');
                                        if (panelHeader) {
                                            panelHeader.style.fontSize = '1.4rem';
                                            panelHeader.style.fontWeight = '800';
                                        }

                                        captureWrapper.appendChild(clone);

                                        try {
                                            const currentScrollY = window.scrollY;
                                            const canvas = await html2canvas(captureWrapper, {
                                                useCORS: true,
                                                scale: 2, // Retina quality
                                                backgroundColor: '#ffffff',
                                                scrollX: 0,
                                                scrollY: -window.scrollY // Offset the current scroll
                                            });
                                            const link = document.createElement('a');
                                            link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
                                            link.href = canvas.toDataURL('image/png');
                                            link.click();
                                            window.scrollTo(0, currentScrollY); // Restore just in case
                                        } catch (err) {
                                            console.error("Export failed", err);
                                            alert("Failed to export image. Please check console.");
                                        } finally {
                                            document.body.removeChild(captureWrapper);
                                        }
                                    };

                                    const ListPanel = ({ title, icon, color, data, className, showPercentage }) => {
                                        const panelId = `panel-${title.replace(/\s+/g, '-')}`;
                                        return (
                                            <div id={panelId} className={`list-panel card ${className || ''}`} style={{ borderTop: `4px solid ${color}` }}>
                                                <div className="panel-header">
                                                    <div className="icon-box" style={{ backgroundColor: `${color}20`, color: color }}>
                                                        {icon}
                                                    </div>
                                                    <h4 style={{ flex: 1 }}>{title} <span className="count-badge" style={{ backgroundColor: color }}>{data.length}</span></h4>
                                                    <button
                                                        className="export-btn"
                                                        onClick={() => handleExport(panelId, title)}
                                                        title="Export as Image"
                                                        style={{
                                                            marginLeft: 'auto',
                                                            padding: '0.4rem 0.6rem',
                                                            background: '#f1f5f9',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            color: '#64748b',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                                        }}
                                                    >
                                                        <Share2 size={18} />
                                                    </button>
                                                </div>
                                                <div className="list-scroll">
                                                    <table className="modern-list-table">
                                                        <tbody>
                                                            {data.map((r, i) => {
                                                                const maxVal = Math.max(...data.map(d => d.achievement || 0));
                                                                let width = 0;
                                                                if (maxVal > 0 && r.achievement > 0) {
                                                                    width = (r.achievement / maxVal) * 100;
                                                                }

                                                                const pct = r.target ? Math.round((r.achievement / r.target) * 100) : 0;

                                                                return (
                                                                    <tr key={i}>
                                                                        <td className="rank-col">
                                                                            <div className="rank-circle" style={{ borderColor: color, color: color }}>{i + 1}</div>
                                                                        </td>
                                                                        <td className="info-col">
                                                                            <div className="fw-600" style={{ fontSize: '0.95rem' }}>{r.name}</div>
                                                                        </td>
                                                                        <td className="val-col">
                                                                            <div className="val-text">
                                                                                {formatNumber(r.achievement)}
                                                                                {showPercentage && r.target > 0 && (
                                                                                    <span style={{ fontSize: '0.75rem', marginLeft: '6px', color: color, fontWeight: 700 }}>
                                                                                        ({pct}%)
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <div className="databar-bg">
                                                                                <div className="databar-fill" style={{ width: `${width}%`, backgroundColor: color }}></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                            {data.length === 0 && <tr><td colSpan="3" className="text-center text-muted p-4">No data available</td></tr>}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        );
                                    };

                                    // formatNumber is now imported from utils
                                    // handleExport and ListPanel are already defined above or need to be preserved if they were overwritten

                                    return (
                                        <div className="infographics-wrapper">
                                            <div className="infographics-grid animate-fade">
                                                {/* Overview Stats (Width: Full) */}
                                                <div className="chart-card full-width-chart">
                                                    <div className="big-stat-row">
                                                        <div className="stat-boxes flex-row-center">
                                                            <div className="stat-box">
                                                                <div className="label">Start Date</div>
                                                                <div className="value-sm">{formatDate(viewingCampaign.startDate || viewingCampaign.start_date)}</div>
                                                            </div>
                                                            <div className="stat-box">
                                                                <div className="label">End Date</div>
                                                                <div className="value-sm">{formatDate(viewingCampaign.endDate || viewingCampaign.end_date)}</div>
                                                            </div>
                                                            <div className="stat-box">
                                                                <div className="label">Region Target</div>
                                                                <div className="value">{formatNumber(totalTarget)}</div>
                                                            </div>
                                                            <div className="stat-box highlight">
                                                                <div className="label">Total Achievement</div>
                                                                <div className="value" style={{ color: Number(percent) >= 100 ? '#16a34a' : '#2563eb' }}>{formatNumber(totalAchv)}</div>
                                                            </div>
                                                        </div>
                                                        <div className="overall-progress">
                                                            <div className="progress-label-row">
                                                                <span>Completion Status</span>
                                                                <span className="fw-bold">{percent}%</span>
                                                            </div>
                                                            <div className="progress-bar-container large">
                                                                <div className="progress-bar-fill" style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: Number(percent) >= 100 ? '#22c55e' : '#3b82f6' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <ListPanel title="Top 20% Performers" icon={<TrendingUp size={20} />} color="#16a34a" data={topData} />
                                                <ListPanel title="Bottom 20% Performers" icon={<TrendingDown size={20} />} color="#dc2626" data={bottomData} />
                                                <ListPanel title="Achievers (100%+)" icon={<Award size={20} />} color="#ca8a04" data={achievers} showPercentage={true} />
                                                <ListPanel title="Nil Performers" icon={<AlertTriangle size={20} />} color="#64748b" data={nilPerformers} className="danger-striped" />
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div >

                {/* Manual Entry Modal */}
                {
                    showManualEntry && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Add Performance</h3>
                                    <button onClick={() => setShowManualEntry(false)} className="btn-icon"><X size={20} /></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>SOL / Staff ID</label>
                                        <input placeholder="e.g. 1001" value={manualForm.id} onChange={e => setManualForm({ ...manualForm, id: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="date" value={manualForm.date} onChange={e => setManualForm({ ...manualForm, date: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Achievement Added</label>
                                        <input type="number" placeholder="0" value={manualForm.achievement} onChange={e => setManualForm({ ...manualForm, achievement: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Details</label>
                                        <textarea placeholder="e.g. Bulk Deposit from Client X" value={manualForm.details} onChange={e => setManualForm({ ...manualForm, details: e.target.value })} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={saveManualEntry} className="btn btn-primary full-width">Save Entry</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        );
    }

    // List & Create Form Render
    return (
        <div className="campaign-manager-container fade-in">
            <div className="manager-header">
                <div>
                    <h2><BarChart2 /> Campaign Management</h2>
                    <p>Create, track, and manage departmental campaigns</p>
                </div>
                {canCreate && !showForm && (
                    <button onClick={handleCreateClick} className="btn btn-primary">
                        <Plus size={18} /> New Campaign
                    </button>
                )}
            </div>

            {msg && <div className="alert-success"><CheckCircle size={16} /> {msg}</div>}

            {showForm ? (
                <div className="campaign-form-card">
                    <div className="form-header">
                        <h3>{isEditing ? 'Edit Campaign' : 'Create Campaign'}</h3>
                        <button onClick={() => setShowForm(false)} className="btn-text">Cancel</button>
                    </div>

                    <form onSubmit={handleSubmit} className="campaign-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Campaign Title</label>
                                <input required placeholder="e.g. Q4 Deposit Drive" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Owning Department</label>
                                <select
                                    value={form.department_code}
                                    onChange={e => setForm({ ...form, department_code: e.target.value })}
                                    disabled={myDepartments.length === 1}
                                >
                                    {myDepartments.map(d => <option key={d.code} value={d.code}>{d.name} ({d.shortform})</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description & Objective</label>
                            <textarea placeholder="Describe the goal..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="date" required value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input type="date" required value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-row three-col">
                            <div className="form-group">
                                <label>Type</label>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                    <option value="Growth">Growth (Increase)</option>
                                    <option value="Reduction">Reduction (Decrease)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Unit</label>
                                <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
                                    <option value="Count">Count</option>
                                    <option value="Amount">Amount (₹)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <div className="file-input-wrapper">
                                    <input type="file" accept="image/*" onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setForm(prev => ({ ...prev, image: reader.result }));
                                            reader.readAsDataURL(file);
                                        }
                                    }} />
                                    {form.image && <img src={form.image} alt="Prev" className="mini-preview" />}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Region Overall Target (Manual)</label>
                            <input type="number" placeholder="Enter Region Target if different from sum" value={form.overall_target} onChange={e => setForm({ ...form, overall_target: e.target.value })} />
                            <small className="text-muted">If left empty, it will be auto-calculated from branch targets.</small>
                        </div>

                        <div className="form-section">
                            <h4><Upload size={16} /> Campaign Data Operations</h4>
                            <div className="form-row">
                                <div className="upload-box">
                                    <p className="upload-title">🎯 Set Branch Targets</p>
                                    <p className="upload-desc">Resets all branch targets.</p>
                                    <input type="file" accept=".xlsx, .xls" onChange={handleTargetUpload} />
                                </div>
                                <div className="upload-box secondary">
                                    <p className="upload-title">📈 Update Achievement</p>
                                    <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.85rem' }}>
                                        <label style={{ color: '#1e293b', fontWeight: '500' }}><input type="radio" name="upMode" checked={uploadMode === 'append'} onChange={() => setUploadMode('append')} /> Append (Add)</label>
                                        <label style={{ color: '#1e293b', fontWeight: '500' }}><input type="radio" name="upMode" checked={uploadMode === 'replace'} onChange={() => setUploadMode('replace')} /> Replace (Reset)</label>
                                    </div>
                                    <input type="file" accept=".xlsx, .xls" onChange={handleAchievementUpload} />
                                </div>
                            </div>

                            {/* Simple Preview Stats */}
                            <div className="upload-preview" style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc' }}>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    <b>Current Summary:</b> {form.data.length} Targets Defined | {form.achievement_entries.length} Transaction Entries
                                </p>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary full-width">
                            {isEditing ? 'Update Campaign' : 'Publish Campaign'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="campaign-list-wrapper">
                    {campaigns.length === 0 && <div className="empty-message">No active campaigns found.</div>}
                    <table className="styled-table campaign-list-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>Image</th>
                                <th>Campaign Details</th>
                                <th>Status</th>
                                <th style={{ width: '200px' }}>Target vs Achv</th>
                                <th>Top Performer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns
                                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                                .map(camp => {
                                    const entries = camp.achievement_entries || [];
                                    const totalAchv = entries.reduce((s, x) => s + x.amount, 0);
                                    const target = camp.overall_target || 1;
                                    const pct = Math.min((totalAchv / target) * 100, 100);

                                    // Status Logic
                                    const today = new Date();
                                    const start = new Date(camp.startDate || camp.start_date);
                                    const end = new Date(camp.endDate || camp.end_date);
                                    const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

                                    let status = 'Active';
                                    let statusClass = 'success';
                                    if (daysRemaining < 0) {
                                        status = 'Expired';
                                        statusClass = 'danger';
                                    } else if (daysRemaining <= 7) {
                                        status = 'Ending Soon';
                                        statusClass = 'warning';
                                    } else if (start > today) {
                                        status = 'Upcoming';
                                        statusClass = 'primary';
                                    }

                                    // Top Performer Logic
                                    const aggregated = entries.reduce((acc, curr) => {
                                        acc[curr.sol_or_staff] = (acc[curr.sol_or_staff] || 0) + curr.amount;
                                        return acc;
                                    }, {});
                                    let topPerformerId = '-';
                                    let topVal = 0;
                                    Object.entries(aggregated).forEach(([id, val]) => {
                                        if (val > topVal) {
                                            topVal = val;
                                            topPerformerId = id;
                                        }
                                    });


                                    // Yes, getName(id, type) is defined in component. Check if we can infer type.
                                    // Usually Sol is 4 digits, Staff is 6. Simple heuristic.
                                    const topName = getName ? getName(topPerformerId, topPerformerId.length === 4 ? 'branch' : 'staff') : topPerformerId;


                                    return (
                                        <tr key={camp.id} onClick={() => handleView(camp)} className="clickable-row">
                                            <td>
                                                <div className="camp-list-img">
                                                    {camp.image ? (
                                                        <img
                                                            src={camp.image}
                                                            alt="camp"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                                                        />
                                                    ) : (
                                                        <BarChart2 size={16} />
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="fw-bold">{camp.title}</div>
                                                <div className="text-muted small">
                                                    {formatDate(camp.startDate || camp.start_date)} - {formatDate(camp.endDate || camp.end_date)}
                                                </div>
                                                <div className="text-muted small" style={{ marginTop: '2px' }}>
                                                    {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Ended'}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${statusClass}`}>{status}</span>
                                            </td>
                                            <td>
                                                <div className="progress-section compact">
                                                    <div className="flex-row-sb small mb-1" style={{ flexDirection: 'column', gap: '2px' }}>
                                                        <div className="fw-bold text-primary">{pct.toFixed(0)}%</div>
                                                        <div className="text-muted small">{formatNumber(totalAchv)} / {formatNumber(target)}</div>
                                                    </div>
                                                    <div className="progress-bar small">
                                                        <div className="fill" style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? '#22c55e' : '#3b82f6' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {topPerformerId !== '-' ? (
                                                    <div>
                                                        <div className="fw-600 small">{topName}</div>
                                                        <div className="text-muted smaller">{formatNumber(topVal)}</div>
                                                    </div>
                                                ) : <span className="text-muted">-</span>}
                                            </td>
                                            <td>
                                                {canCreate && user.departments.includes(camp.department_code) && (
                                                    <div className="action-buttons" onClick={e => e.stopPropagation()}>
                                                        <button onClick={() => handleEdit(camp)} className="btn-icon small" title="Edit"><Edit size={16} /></button>
                                                        <button onClick={() => handleDelete(camp.id)} className="btn-icon small danger" title="Delete"><Trash2 size={16} /></button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CampaignManager;
