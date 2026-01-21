import { Users, Plus, Edit2, Trash2, X, Building, CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';
import ModuleLayout from '../../components/Common/ModuleLayout';

const DepartmentManager = () => {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ code: '', name: '', name_hindi: '', shortform: '' });
    const [originalCode, setOriginalCode] = useState(null);
    const [view, setView] = useState('list'); // 'list', 'form'
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/departments');
            const data = await res.json();
            setDepartments(data);
        } catch (err) {
            console.error("Failed to fetch departments");
        } finally {
            setLoading(false);
        }
    };

    const handleEditAction = (d) => {
        setForm({
            code: d.code,
            name: d.name,
            name_hindi: d.name_hindi || '',
            shortform: d.shortform || ''
        });
        setOriginalCode(d.code);
        setView('form');
        setMsg('');
    };

    const handleCancel = () => {
        setForm({ code: '', name: '', name_hindi: '', shortform: '' });
        setOriginalCode(null);
        setView('list');
        setMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        // Basic Validation
        if (!/^\d{4}$/.test(form.code)) {
            setMsg('Error: Code must be a 4-digit number');
            return;
        }

        const isEditing = !!originalCode;
        const url = isEditing
            ? `http://localhost:5000/api/departments/${originalCode}`
            : 'http://localhost:5000/api/departments';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setMsg(isEditing ? 'Department Updated' : 'Department Added');
                handleCancel();
                fetchDepartments();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network error');
        }
    };

    const handleDelete = async (code) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/departments/${code}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                fetchDepartments();
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
                <Button variant="primary" icon={Plus} onClick={() => { setOriginalCode(null); setForm({ code: '', name: '', name_hindi: '', shortform: '' }); setView('form'); }}>Add Department</Button>
            ) : (
                <Button variant="ghost" icon={X} onClick={handleCancel}>Cancel</Button>
            )}
        </div>
    );

    return (
        <ModuleLayout
            title="Department Inventory"
            icon={Building}
            actions={actions}
            isLoading={loading}
        >
            {view === 'form' ? (
                <div className="flex justify-center">
                    <Card className="max-w-xl w-full" title={originalCode ? 'Edit Department Identity' : 'Register New Department'}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group flex flex-col gap-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department Code</label>
                                    <input
                                        value={form.code}
                                        onChange={e => setForm({ ...form, code: e.target.value })}
                                        placeholder="e.g. 1001"
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm font-mono"
                                        required
                                    />
                                    <p className="text-[10px] text-slate-400 font-medium">Unique 4-digit code</p>
                                </div>
                                <div className="form-group flex flex-col gap-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Short Form / Acronym</label>
                                    <input
                                        value={form.shortform}
                                        onChange={e => setForm({ ...form, shortform: e.target.value })}
                                        placeholder="e.g. HRD"
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm font-bold uppercase"
                                    />
                                </div>
                            </div>

                            <div className="form-group flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department Name (English)</label>
                                <input
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. Human Resources Department"
                                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                    required
                                />
                            </div>

                            <div className="form-group flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department Name (Hindi)</label>
                                <input
                                    value={form.name_hindi}
                                    onChange={e => setForm({ ...form, name_hindi: e.target.value })}
                                    placeholder="विभाग का नाम (हिंदी में)"
                                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-3 mt-4">
                                <Button type="submit" variant="primary" className="py-3 h-auto text-base">
                                    {originalCode ? 'Save Department Details' : 'Create Department'}
                                </Button>
                                <Button type="button" variant="ghost" onClick={handleCancel}>Cancel & Return</Button>
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
                    {departments.map(d => (
                        <Card key={d.code} className="hover:shadow-lg transition-all group border-t-4 border-t-primary-color overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-50 text-primary-color rounded-lg group-hover:bg-primary-color group-hover:text-white transition-colors">
                                    <Briefcase size={24} />
                                </div>
                                <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-tighter">Code: {d.code}</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-baseline gap-2">
                                    <h4 className="text-lg font-bold text-slate-800 leading-tight">{d.name}</h4>
                                    {d.shortform && <span className="text-xs font-extrabold text-primary-color/60">[{d.shortform}]</span>}
                                </div>
                                <p className="text-sm font-medium text-slate-400">{d.name_hindi}</p>
                            </div>

                            <div className="mt-6 flex gap-2 pt-4 border-t border-slate-50">
                                <Button variant="secondary" size="sm" className="flex-1 text-xs" icon={Edit2} onClick={() => handleEditAction(d)}>Edit</Button>
                                <Button variant="ghost" size="sm" className="text-error-color hover:bg-red-50 text-xs" icon={Trash2} onClick={() => handleDelete(d.code)} />
                            </div>
                        </Card>
                    ))}

                    <button
                        onClick={() => { setOriginalCode(null); setForm({ code: '', name: '', name_hindi: '', shortform: '' }); setView('form'); }}
                        className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary-color hover:bg-blue-50/30 transition-all group min-h-[200px]"
                    >
                        <div className="p-4 bg-slate-50 text-slate-400 rounded-full group-hover:bg-primary-color group-hover:text-white transition-all shadow-sm">
                            <Plus size={32} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-600 group-hover:text-primary-color transition-colors">Add Department</p>
                            <p className="text-xs text-slate-400">Expand institutional hierarchy</p>
                        </div>
                    </button>
                </div>
            )}
        </ModuleLayout>
    );
};

export default DepartmentManager;
