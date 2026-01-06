import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Users,
    Calendar,
    FileText,
    TrendingUp,
    BookOpen,
    Phone,
    MapPin,
    Briefcase,
    Mountain,
    Landmark,
    Menu,
    X,
    Lock,
    ChevronRight,
    ChevronDown,
    ArrowRight
} from 'lucide-react';
import { generateAvatarSVG } from '../../utils/avatarGenerator';
import BranchMap from '../../components/BranchMap';

const RegionTemplate = () => {
    const { regionId } = useParams(); // Get region code from URL
    const [regionInfo, setRegionInfo] = useState({ name: 'Loading...', code: regionId });
    // State for View Navigation
    const [activeView, setActiveView] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // PMS Data State
    const [pmsData, setPmsData] = useState({ score: 'Loading...', rank: '-' });

    // Stats Data State
    const [stats, setStats] = useState({
        totalBusiness: 0,
        branchCount: 'Loading...',
        staffStrength: 'Loading...',
        nextReview: "Jan 10, '26"
    });

    // Org Data State
    const [orgData, setOrgData] = useState({ head: null, team: [], branches: [] });
    const [expandedBranches, setExpandedBranches] = useState({});

    const toggleBranch = (code) => {
        setExpandedBranches(prev => ({
            ...prev,
            [code]: !prev[code]
        }));
    };

    // Login Modal State
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLoginSuccess = (userData) => {
        localStorage.setItem('user_session', JSON.stringify(userData));
        window.location.reload(); // Refresh to trigger App.jsx state update
    };

    // Fetch PMS, Stats, and Org Data
    useEffect(() => {
        fetch('http://localhost:5000/api/pms/general')
            .then(res => res.json())
            .then(data => {
                if (data && data.score) {
                    setPmsData({
                        score: data.score,
                        rank: '4/12'
                    });
                }
            })
            .catch(err => console.error("Failed to load PMS data", err));

        fetch('http://localhost:5000/api/public/dindigul-stats')
            .then(res => res.json())
            .then(data => {
                if (data.success) setStats(data.stats);
            })
            .catch(err => console.error("Failed to load stats", err));

        fetch('http://localhost:5000/api/public/dindigul-org')
            .then(res => res.json())
            .then(data => {
                if (data.success) setOrgData({ head: data.head, team: data.team });
            })
            .catch(err => console.error("Failed to load org data", err));
    }, []);

    // Fetch region-specific data using generic endpoints
    useEffect(() => {
        if (!regionId) return;

        // Fetch stats
        fetch(`http://localhost:5000/api/public/region/${regionId}/stats`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStats(data.stats);
                    setRegionInfo({ name: data.regionName, code: data.regionCode });
                }
            })
            .catch(err => console.error("Failed to load stats", err));

        // Fetch organization data
        fetch(`http://localhost:5000/api/public/region/${regionId}/org`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setOrgData({ head: data.head, team: data.team, branches: data.branches });
                }
            })
            .catch(err => console.error("Failed to load org data", err));
    }, [regionId]);

    // Navigation Handler
    const navigateTo = (view) => {
        setActiveView(view);
        setIsMenuOpen(false);
        window.scrollTo(0, 0); // Ensure reset
    };

    // --- View Components ---

    const HomeView = () => (
        <div className="relative min-h-[calc(100vh-80px)] md:min-h-screen flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="/assets/dindigul_bg.png" alt="Dindigul Region" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75 mix-blend-multiply"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in-up py-20">
                <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-blue-50 text-sm font-medium mb-6">
                    Excellence in Banking Operations
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">{regionInfo.name}</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Empowering financial growth across the Lock City and the Cardamom Hills.
                    Your gateway to regional performance metrics, circulars, and operational excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => navigateTo('about')} className="bg-white text-blue-900 px-8 py-3.5 rounded-full font-bold hover:bg-blue-50 transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2">
                        Explore Region <ArrowRight size={18} />
                    </button>
                    <button onClick={() => navigateTo('performance')} className="bg-blue-700/50 backdrop-blur text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700/70 transition-all active:scale-95">
                        View Dashboard
                    </button>
                    <button onClick={() => navigateTo('organization')} className="bg-blue-700/50 backdrop-blur text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700/70 transition-all active:scale-95">
                        My Team
                    </button>
                </div>
            </div>
        </div>
    );


    const AboutView = () => (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4 py-20">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Jurisdiction</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Serving the diverse landscapes of Dindigul and Theni districts.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Dindigul Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
                        <div className="h-48 relative overflow-hidden">
                            <img src="/assets/dindigul_bg.png" alt="Dindigul" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                                <span className="text-white font-bold text-xl flex items-center gap-2"><Landmark size={20} /> Dindigul District</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-800 mb-4 text-sm leading-relaxed font-medium">
                                Known as the "Lock City", Dindigul is an industrial and agricultural powerhouse.
                                Home to 70% of the workforce in agriculture and the famous Oddanchatram vegetable market.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Tag label="Textiles" color="orange" />
                                <Tag label="Locks" color="orange" />
                                <Tag label="Agriculture" color="orange" />
                            </div>
                        </div>
                    </div>
                    {/* Theni Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
                        <div className="h-48 relative overflow-hidden">
                            <img src="/assets/theni_bg.png" alt="Theni" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                                <span className="text-white font-bold text-xl flex items-center gap-2"><Mountain size={20} /> Theni District</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-800 mb-4 text-sm leading-relaxed font-medium">
                                A pristine hub at the Western Ghats foothills. Known for the Cumbum Valley's grapes
                                and Bodinayakanur's cardamoms. A vital trade gateway connecting Tamil Nadu to Kerala.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Tag label="Cardamom" color="green" />
                                <Tag label="Tea Estates" color="green" />
                                <Tag label="Tourism" color="green" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const PerformanceView = () => (
        <div className="min-h-[calc(100vh-80px)] bg-slate-900 text-white flex items-center justify-center p-4 py-20 relative overflow-hidden">
            {/* Decorative BG elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-6xl w-full relative z-10">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-2">Regional Performance</h2>
                    <p className="text-slate-400">Live metrics from the Performance Management System</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Live PMS Card */}
                    <div className="lg:col-span-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                        <div className="flex items-center gap-3 mb-6 text-green-300">
                            <TrendingUp size={24} /> <span className="uppercase tracking-wider text-sm font-bold">Live Score</span>
                        </div>
                        <div className="text-6xl font-extrabold text-white mb-2 tracking-tighter">
                            {typeof pmsData.score === 'number' ? pmsData.score.toFixed(2) : pmsData.score}
                        </div>
                        <div className="text-slate-400 font-medium mb-6">Regional PMS Score</div>

                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-2">
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: typeof pmsData.score === 'number' ? `${pmsData.score}%` : '50%' }}></div>
                        </div>
                        <div className="text-sm text-slate-400 flex justify-between w-full px-2">
                            <span>0</span>
                            <span>Rank: {pmsData.rank}</span>
                            <span>100</span>
                        </div>
                    </div>

                    {/* At a Glance Stats */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 content-center">
                        <StatCard icon={<Briefcase />} label="Total Business" value={`₹ ${stats.totalBusiness ? Number(stats.totalBusiness).toLocaleString('en-IN') : '0'} Cr`} sub="CASA + Term + Advances" />
                        <StatCard icon={<MapPin />} label="Branch Network" value={`${stats.branchCount} Branches`} sub={`Across ${regionInfo.name}`} />
                        <StatCard icon={<Users />} label="Staff Strength" value={`${stats.staffStrength}`} sub="Officers & Clerks" />
                        <StatCard icon={<Calendar />} label="Next Review" value={stats.nextReview} sub="Performance Meeting" />
                    </div>
                </div>
            </div>
        </div>
    );

    const UpdatesView = () => (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4 py-20">
            <div className="max-w-6xl w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Updates & Events</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Circulars */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FileText className="text-orange-500" /> Latest Circulars
                        </h3>
                        <ul className="space-y-4">
                            <CircularItem title="Guidelines for Q4 Loan Recovery Drive 2026" date="Jan 02, 2026" />
                            <CircularItem title="Holiday List 2026 for Tamil Nadu Branches" date="Dec 30, 2025" />
                            <CircularItem title="Revised Interest Rates for Domestic Deposits" date="Dec 28, 2025" />
                        </ul>
                    </div>

                    {/* Events */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Calendar className="text-purple-500" /> Upcoming Events
                        </h3>
                        <div className="space-y-6">
                            <EventItem day="10" month="JAN" title="Q3 Performance Review" type="Meeting" />
                            <EventItem day="15" month="JAN" title="SME Loan Mela - Dindigul" type="Outreach" />
                            <EventItem day="26" month="JAN" title="Republic Day Flag Hoisting" type="Celebration" />
                        </div>
                    </div>

                    {/* Magazine */}
                    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all h-full flex flex-col justify-center">
                        <div className="relative z-10">
                            <BookOpen className="mb-4" size={32} />
                            <h3 className="text-2xl font-bold mb-2">IOB Dindigul Voice</h3>
                            <p className="text-teal-100 mb-6">January 2026 Edition is out now!</p>
                            <span className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block text-center">Read Magazine</span>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                            <BookOpen size={120} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const OrganizationView = () => {
        const renderStaffCard = (member, isHead = false) => (
            <div key={member.email || member.mobile} className={`flex items-center gap-4 p-3 bg-white rounded-xl border ${isHead ? 'border-orange-200 bg-orange-50' : 'border-gray-100'} shadow-sm mb-2`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                    <img
                        src={member.photo ? `http://localhost:5000${member.photo}` : generateAvatarSVG(member.full_name)}
                        alt={member.full_name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{member.full_name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{member.designation}</p>
                    {member.departments && member.departments.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                            {member.departments.map((dept, idx) => (
                                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 font-medium">
                                    {dept}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-right">
                    <a href={`tel:${member.mobile}`} className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                        <Phone size={14} /> <span>{member.mobile}</span>
                    </a>
                </div>
            </div>
        );

        // Group team members by hierarchy (heads vs officers) - each user appears once
        const groupByHierarchy = () => {
            const heads = [];
            const officers = [];
            const seen = new Set();

            orgData.team.forEach(member => {
                // Avoid duplicates - each user appears only once
                if (seen.has(member.full_name)) return;
                seen.add(member.full_name);

                if (member.is_department_head) {
                    heads.push(member);
                } else {
                    officers.push(member);
                }
            });

            return { heads, officers };
        };

        const { heads, officers } = groupByHierarchy();

        return (
            <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center p-4 py-20">
                <div className="max-w-5xl w-full">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Regional Organization</h2>
                        <p className="text-gray-600">Organizational Hierarchy & Contact Directory</p>
                    </div>

                    {/* Tree Root: Regional Office */}
                    <div className="relative">
                        {/* Vertical Line for hierarchy */}
                        <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gray-300 border-l border-dashed border-gray-400"></div>

                        {/* Node: Regional Head */}
                        <div className="relative z-10 mb-8">
                            <div className="bg-white rounded-2xl shadow-lg border-l-4 border-orange-500 p-6 flex flex-col md:flex-row items-center gap-6 transform hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-24 h-24 rounded-full border-4 border-orange-100 shadow-inner overflow-hidden">
                                    <img
                                        src={orgData.head?.photo ? `http://localhost:5000${orgData.head.photo}` : generateAvatarSVG(orgData.head?.full_name || 'Head')}
                                        alt="Regional Head"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2 inline-block">REGIONAL HEAD</span>
                                    <h3 className="text-2xl font-bold text-gray-900">{orgData.head?.full_name || 'Not Assigned'}</h3>
                                    <p className="text-gray-600 font-medium">{orgData.head?.designation}</p>
                                    <div className="mt-3 flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><MapPin size={16} /> Regional Office</span>
                                        <a href={`tel:${orgData.head?.mobile}`} className="flex items-center gap-1 text-green-600 font-bold hover:bg-green-50 px-2 py-1 rounded-md transition-colors"><Phone size={16} /> {orgData.head?.mobile}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RO Staff Hierarchy - Organic Tree */}
                        {(heads.length > 0 || officers.length > 0) && (
                            <div className="ml-8 pb-8 relative">
                                <h4 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                    Regional Office Staff
                                </h4>

                                {/* Department Heads - Highlighted */}
                                {heads.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="h-px flex-1 bg-gradient-to-r from-orange-300 to-transparent"></div>
                                            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border-2 border-orange-300">Department Head{heads.length > 1 ? 's' : ''}</span>
                                            <div className="h-px flex-1 bg-gradient-to-l from-orange-300 to-transparent"></div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {heads.map(member => renderStaffCard(member, true))}
                                        </div>
                                    </div>
                                )}

                                {/* Officers - Branching from Heads like Tree Roots */}
                                {officers.length > 0 && (
                                    <div className="relative pl-16">
                                        {/* Tree Root SVG - Central trunk with organic branches */}
                                        <svg className="absolute left-0 top-0" width="64" height="100%" style={{ minHeight: `${Math.ceil(officers.length / 2) * 160}px` }}>
                                            <defs>
                                                <linearGradient id="trunk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#8b7355', stopOpacity: 0.8 }} />
                                                    <stop offset="100%" style={{ stopColor: '#6b5444', stopOpacity: 0.4 }} />
                                                </linearGradient>
                                                <linearGradient id="branch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" style={{ stopColor: '#8b7355', stopOpacity: 0.6 }} />
                                                    <stop offset="100%" style={{ stopColor: '#a0826d', stopOpacity: 0.2 }} />
                                                </linearGradient>
                                            </defs>

                                            {/* Central trunk */}
                                            <path
                                                d={`M 8 0 Q 8 20, 10 40 L 10 ${Math.ceil(officers.length / 2) * 160 - 40} Q 10 ${Math.ceil(officers.length / 2) * 160 - 20}, 8 ${Math.ceil(officers.length / 2) * 160}`}
                                                stroke="url(#trunk-grad)"
                                                strokeWidth="3"
                                                fill="none"
                                            />

                                            {/* Organic branches to each officer */}
                                            {officers.map((_, idx) => {
                                                const row = Math.floor(idx / 2);
                                                const col = idx % 2;
                                                const yPos = row * 160 + 80;
                                                const xEnd = col === 0 ? 48 : 64;

                                                // Create organic branching path
                                                const branchPath = col === 0
                                                    ? `M 10 ${yPos - 10} Q 15 ${yPos - 5}, 20 ${yPos} Q 30 ${yPos + 2}, ${xEnd} ${yPos + 5}`
                                                    : `M 10 ${yPos + 10} Q 15 ${yPos + 8}, 22 ${yPos + 5} Q 35 ${yPos + 3}, ${xEnd} ${yPos}`;

                                                return (
                                                    <path
                                                        key={idx}
                                                        d={branchPath}
                                                        stroke="url(#branch-grad)"
                                                        strokeWidth="2.5"
                                                        fill="none"
                                                        opacity="0.7"
                                                    />
                                                );
                                            })}
                                        </svg>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-1 rounded">Officer{officers.length > 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {officers.map(member => renderStaffCard(member))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Branches Section */}
                        <div className="ml-8 pl-8 border-l-2 border-dashed border-gray-300">
                            <h4 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                                Branches ({orgData.branches?.length || 0})
                            </h4>

                            <div className="space-y-6">
                                {orgData.branches && orgData.branches.map(branch => {
                                    const isExpanded = expandedBranches[branch.branch_code];
                                    return (
                                        <div key={branch.branch_code} className="relative">
                                            {/* Branch Node */}
                                            <div
                                                onClick={() => toggleBranch(branch.branch_code)}
                                                className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${isExpanded ? 'border-orange-500 shadow-md ring-2 ring-orange-100' : 'border-gray-200 shadow-sm hover:border-orange-300'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-lg ${isExpanded ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600'} transition-colors`}>
                                                        <Landmark size={20} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                                                            {branch.branch_name}
                                                            <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">Code: {branch.branch_code}</span>
                                                        </h5>
                                                        {branch.head && (
                                                            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                                Head: <span className="font-medium text-gray-700">{branch.head.full_name}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {branch.head && (
                                                        <a href={`tel:${branch.head.mobile}`} onClick={(e) => e.stopPropagation()} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Call Branch Head">
                                                            <Phone size={18} />
                                                        </a>
                                                    )}
                                                    <ChevronDown className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                                </div>
                                            </div>

                                            {/* Branch Children (Staff) - Organic Tree */}
                                            {isExpanded && (
                                                <div className="mt-6 ml-8 animate-fadeIn relative">
                                                    {/* Branch Head - Highlighted */}
                                                    {branch.head && (
                                                        <div className="mb-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
                                                                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full border-2 border-orange-300">Branch Head</span>
                                                                <div className="h-px flex-1 bg-gradient-to-l from-orange-400 to-transparent"></div>
                                                            </div>
                                                            {renderStaffCard(branch.head, true)}
                                                        </div>
                                                    )}

                                                    {/* Other Staff - Branching from Head like Tree Roots */}
                                                    {branch.team.length > 0 && (
                                                        <div className="relative pl-16">
                                                            {/* Tree Root SVG - Central trunk with organic branches */}
                                                            <svg className="absolute left-0 top-0" width="64" height="100%" style={{ minHeight: `${branch.team.length * 80}px` }}>
                                                                <defs>
                                                                    <linearGradient id={`trunk-${branch.branch_code}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                                        <stop offset="0%" style={{ stopColor: '#d97706', stopOpacity: 0.7 }} />
                                                                        <stop offset="100%" style={{ stopColor: '#b45309', stopOpacity: 0.3 }} />
                                                                    </linearGradient>
                                                                    <linearGradient id={`branch-${branch.branch_code}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                                        <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.6 }} />
                                                                        <stop offset="100%" style={{ stopColor: '#fb923c', stopOpacity: 0.2 }} />
                                                                    </linearGradient>
                                                                </defs>

                                                                {/* Central trunk */}
                                                                <path
                                                                    d={`M 8 0 Q 8 15, 10 30 L 10 ${branch.team.length * 80 - 30} Q 10 ${branch.team.length * 80 - 15}, 8 ${branch.team.length * 80}`}
                                                                    stroke={`url(#trunk-${branch.branch_code})`}
                                                                    strokeWidth="3"
                                                                    fill="none"
                                                                />

                                                                {/* Organic branches to each staff member */}
                                                                {branch.team.map((_, idx) => {
                                                                    const yPos = idx * 80 + 40;
                                                                    const side = idx % 2; // Alternate sides

                                                                    // Create organic branching path
                                                                    const branchPath = side === 0
                                                                        ? `M 10 ${yPos - 8} Q 18 ${yPos - 4}, 25 ${yPos} Q 38 ${yPos + 3}, 52 ${yPos + 5}`
                                                                        : `M 10 ${yPos + 8} Q 18 ${yPos + 5}, 26 ${yPos + 3} Q 40 ${yPos + 1}, 56 ${yPos}`;

                                                                    return (
                                                                        <path
                                                                            key={idx}
                                                                            d={branchPath}
                                                                            stroke={`url(#branch-${branch.branch_code})`}
                                                                            strokeWidth="2.5"
                                                                            fill="none"
                                                                            opacity="0.7"
                                                                        />
                                                                    );
                                                                })}
                                                            </svg>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide bg-orange-50 px-2 py-1 rounded">Staff Members</span>
                                                            </div>
                                                            <div className="space-y-3">
                                                                {branch.team.map(member => renderStaffCard(member))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {!branch.head && branch.team.length === 0 && (
                                                        <p className="text-gray-400 italic text-sm py-2">No staff members assigned.</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ContactView = () => (
        <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center p-4 py-20">
            <div className="max-w-4xl w-full text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-full mb-6">
                    <Phone size={32} className="text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-12">Get in Touch</h2>

                <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
                    <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-2">Visit Us</h4>
                        <p className="text-gray-900 text-sm font-medium">Regional Office, 123 Main Road,<br />Near Bus Stand, Dindigul<br />Tamil Nadu - 624001</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-2">Call Us</h4>
                        <p className="text-gray-900 text-lg font-mono font-bold">0451 - 2435678</p>
                        <p className="text-gray-700 text-xs font-semibold">Mon-Sat, 10am - 5pm</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-2">Email Us</h4>
                        <p className="text-gray-900 font-bold text-lg">dindigulro@iob.in</p>
                        <p className="text-gray-700 text-xs font-semibold">For official queries</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
                    <p>© 2026 Indian Overseas Bank, Dindigul Region.</p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <button className="hover:text-blue-600 transition-colors">Privacy</button>
                        <button className="hover:text-blue-600 transition-colors">Terms</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
            {/* Navbar (Fixed/Sticky) */}
            <nav className="bg-white shadow-md z-50 sticky top-0 h-20">
                <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
                        <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                            <MapPin size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-blue-900">
                            IOB {regionInfo.name} <span className="opacity-75 font-normal text-sm ml-1 text-gray-500">{regionInfo.code}</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-full">
                        {['Home', 'About', 'Organization', 'Map', 'Performance', 'Updates', 'Contact'].map((item) => {
                            const key = item.toLowerCase();
                            const isActive = activeView === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => navigateTo(key)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>

                    <div className="hidden md:block">
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                        >
                            <Lock size={16} /> Staff Login
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-600 p-2">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-2 z-50">
                        {['Home', 'About', 'Organization', 'Performance', 'Updates', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => navigateTo(item.toLowerCase())}
                                className={`text-left px-4 py-3 rounded-lg text-sm font-medium ${activeView === item.toLowerCase() ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                {activeView === 'home' && <HomeView />}
                {activeView === 'about' && <AboutView />}
                {activeView === 'organization' && <OrganizationView />}
                {activeView === 'map' && (
                    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center p-4 py-20">
                        <div className="max-w-6xl w-full">
                            <BranchMap branches={orgData.branches} regionName={regionInfo.name} />
                        </div>
                    </div>
                )}
                {activeView === 'performance' && <PerformanceView />}
                {activeView === 'updates' && <UpdatesView />}
                {activeView === 'contact' && <ContactView />}
            </main>

            {/* Login Modal */}
            {isLoginOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
                        <button
                            onClick={() => setIsLoginOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 text-blue-600">
                                    <Lock size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Secure Staff Login</h2>
                                <p className="text-gray-500 text-sm mt-1">Authorized Personnel Only</p>
                            </div>

                            <LoginForm onSuccess={handleLoginSuccess} />
                        </div>
                        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
                            By logging in, you agree to the Acceptable Use Policy.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Internal Login Form Component to match Landing Design
const LoginForm = ({ onSuccess }) => {
    const [step, setStep] = useState(1);
    const [rollNumber, setRollNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userPreview, setUserPreview] = useState(null);

    const validateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/auth/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roll_number: rollNumber })
            });
            const data = await res.json();
            if (data.success) {
                setUserPreview(data.user);
                setStep(2);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Connection failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roll_number: rollNumber, password })
            });
            const data = await res.json();
            if (data.success) {
                onSuccess(data.user);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Connection refused');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {step === 1 ? (
                <form onSubmit={validateUser} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                        <input
                            type="text"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value.replace(/\D/g, '').slice(0, 5))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-mono"
                            placeholder="Enter 5-digit ID"
                            autoFocus
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading || rollNumber.length !== 5}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-95 flex justify-center"
                    >
                        {loading ? <span className="animate-pulse">Validating...</span> : 'Continue'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleLogin} className="space-y-4 animate-fade-in-up">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <div className="font-bold text-gray-900">{userPreview.full_name}</div>
                            <div className="text-xs text-gray-500">{userPreview.designation}</div>
                        </div>
                        <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-600 hover:underline font-medium">Change</button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                            autoFocus
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-95 flex justify-center"
                    >
                        {loading ? <span className="animate-pulse">Authenticating...</span> : 'Access Dashboard'}
                    </button>
                </form>
            )}
        </div>
    );
};

// Sub-components for cleaner internal code
const StatCard = ({ icon, label, value, sub, delay }) => (
    <div className={`bg-white/10 backdrop-blur border border-white/10 p-6 rounded-2xl hover:bg-white/15 transition-colors`}>
        <div className="text-blue-300 mb-4">{React.cloneElement(icon, { size: 28 })}</div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-slate-300 font-medium mb-1">{label}</div>
        <div className="text-xs text-slate-500">{sub}</div>
    </div>
);

const Tag = ({ label, color }) => {
    const colors = {
        orange: 'bg-orange-50 text-orange-700 border-orange-100',
        green: 'bg-green-50 text-green-700 border-green-100',
        blue: 'bg-blue-50 text-blue-700 border-blue-100'
    };
    return (
        <span className={`text-xs px-2.5 py-1 rounded-md border font-medium ${colors[color] || colors.blue}`}>
            {label}
        </span>
    );
};

const CircularItem = ({ title, date }) => (
    <li className="group cursor-pointer">
        <div className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-1">{title}</div>
        <div className="text-xs text-gray-400 mt-1">{date}</div>
    </li>
);

const EventItem = ({ day, month, title, type }) => (
    <div className="flex gap-4 items-center">
        <div className="flex-shrink-0 bg-purple-50 text-purple-700 rounded-lg p-2 text-center min-w-[3.5rem] border border-purple-100">
            <div className="text-xs font-bold uppercase tracking-wider">{month}</div>
            <div className="text-xl font-bold leading-none mt-0.5">{day}</div>
        </div>
        <div>
            <div className="font-bold text-gray-800 text-sm leading-tight">{title}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{type}</div>
        </div>
    </div>
);

export default RegionTemplate;
