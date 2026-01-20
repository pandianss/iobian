import { Map, Plus, Edit2, Trash2, X, Globe, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';
import ModuleLayout from '../../components/Common/ModuleLayout';

const RegionManager = () => {
    const [regions, setRegions] = useState([]);
    const [form, setForm] = useState({ region_code: '', region_name: '', region_name_hindi: '' });
    const [originalCode, setOriginalCode] = useState(null);
    const [view, setView] = useState('list'); // 'list', 'form'
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/regions');
            const data = await res.json();
            setRegions(data);
        } catch (err) {
            console.error("Failed to fetch regions");
        } finally {
            setLoading(false);
        }
    };

    const handleEditAction = (r) => {
        setForm({
            region_code: r.region_code,
            region_name: r.region_name,
            region_name_hindi: r.region_name_hindi || ''
        });
        setOriginalCode(r.region_code);
        setView('form');
        setMsg('');
    };

    const handleCancel = () => {
        setForm({ region_code: '', region_name: '', region_name_hindi: '' });
        setOriginalCode(null);
        setView('list');
        setMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        const isEditing = !!originalCode;
        const url = isEditing
            ? `http://localhost:5000/api/regions/${originalCode}`
            : 'http://localhost:5000/api/regions';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg(isEditing ? 'Region Updated Successfully' : 'Region Added Successfully');
                handleCancel();
                fetchRegions();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network error');
        }
    };

    const handleDelete = async (code) => {
        if (!window.confirm('Are you sure you want to delete this region?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/regions/${code}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                fetchRegions();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err) {
            alert('Network Error');
        }
    };

    const actions = (
        <div className="flex gap-2">
            {view === 'list' ? (
                <Button variant="primary" icon={Plus} onClick={() => { setOriginalCode(null); setForm({ region_code: '', region_name: '', region_name_hindi: '' }); setView('form'); }}>Add Region</Button>
            ) : (
                <Button variant="ghost" icon={X} onClick={handleCancel}>Cancel</Button>
            )}
        </div>
    );

    return (
        <ModuleLayout
            title="Regional Office Manager"
            icon={Globe}
            actions={actions}
            isLoading={loading}
        >
            {view === 'form' ? (
                <div className="flex justify-center">
                    <Card className="max-w-xl w-full" title={originalCode ? 'Modify Regional Office' : 'Register Regional Office'}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="form-group flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Region Digital Code</label>
                                <input
                                    value={form.region_code}
                                    onChange={e => setForm({ ...form, region_code: e.target.value })}
                                    placeholder="e.g. 3933"
                                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm font-mono"
                                    required
                                />
                                <p className="text-[10px] text-slate-400">4-digit unique identifier for the RO</p>
                            </div>

                            <div className="form-group flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Region Name (English)</label>
                                <input
                                    value={form.region_name}
                                    onChange={e => setForm({ ...form, region_name: e.target.value })}
                                    placeholder="e.g. Mumbai Metro Region"
                                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                    required
                                />
                            </div>

                            <div className="form-group flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Region Name (Hindi/Local)</label>
                                <input
                                    value={form.region_name_hindi}
                                    onChange={e => setForm({ ...form, region_name_hindi: e.target.value })}
                                    placeholder="क्षेत्र का नाम (हिंदी में)"
                                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-3 mt-4">
                                <Button type="submit" variant="primary" className="py-3 h-auto text-base">
                                    {originalCode ? 'Update Configuration' : 'Establish Region'}
                                </Button>
                                <Button type="button" variant="ghost" onClick={handleCancel}>Discard Changes</Button>
                            </div>

                            {msg && (
                                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${msg.includes('Error') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                                    {msg.includes('Error') ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                                    {msg}
                                </div>
                            )}
                        </form>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regions.filter(r => !r.is_deleted).map(r => (
                        <Card key={r.region_code} className="hover:shadow-lg transition-all group border-l-4 border-l-primary-color">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-50 text-primary-color rounded-lg group-hover:bg-primary-color group-hover:text-white transition-colors">
                                    <Building2 size={24} />
                                </div>
                                <span className="text-lg font-black text-slate-300 group-hover:text-primary-color transition-colors tracking-tighter">#{r.region_code}</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h4 className="text-xl font-bold text-slate-800 leading-tight">{r.region_name}</h4>
                                <p className="text-sm font-medium text-slate-500">{r.region_name_hindi}</p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">States Covered</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {r.states_covered && r.states_covered.length > 0 ? (
                                        r.states_covered.map(s => (
                                            <span key={s} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 rounded uppercase border border-slate-200">{s}</span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">No jurisdictions assigned</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <Button variant="secondary" size="sm" className="flex-1 text-xs" icon={Edit2} onClick={() => handleEditAction(r)}>Edit</Button>
                                <Button variant="ghost" size="sm" className="text-error-color hover:bg-red-50 text-xs" icon={Trash2} onClick={() => handleDelete(r.region_code)} />
                            </div>
                        </Card>
                    ))}

                    <button
                        onClick={() => { setOriginalCode(null); setForm({ region_code: '', region_name: '', region_name_hindi: '' }); setView('form'); }}
                        className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary-color hover:bg-blue-50/30 transition-all group min-h-[250px]"
                    >
                        <div className="p-4 bg-slate-50 text-slate-400 rounded-full group-hover:bg-primary-color group-hover:text-white transition-all shadow-sm">
                            <Plus size={32} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-600 group-hover:text-primary-color transition-colors">Add New Region</p>
                            <p className="text-xs text-slate-400">Expand the RO network</p>
                        </div>
                    </button>
                </div>
            )}
        </ModuleLayout>
    );
};
    );
};

export default RegionManager;
