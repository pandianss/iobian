import { BadgeCheck, Plus, Edit2, Trash2, X, CheckCircle2, AlertCircle, ShieldCheck, UserCheck } from 'lucide-react';
import Button from '../../framework/ui/Button';
import Card from '../../framework/ui/Card';
import ModuleLayout from '../../framework/layouts/ModuleLayout';

const DesignationManager = ({ user }) => {
    // Default to false if user not provided, strictly check roles
    const canEdit = user && (user.role === 'SuperAdmin' || user.role === 'CO_HRD');
    const [designations, setDesignations] = useState([]);
    const [title, setTitle] = useState('');
    const [workclass, setWorkclass] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [view, setView] = useState('list'); // 'list', 'form'
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDesignations();
    }, []);

    const fetchDesignations = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/designations');
            if (res.ok) {
                const data = await res.json();
                // Sort by workclass descending
                setDesignations(data.sort((a, b) => (b.workclass || 0) - (a.workclass || 0)));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        const url = editingId
            ? `http://localhost:5000/api/designations/${editingId}`
            : 'http://localhost:5000/api/designations';
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, workclass })
            });
            const data = await res.json();
            if (data.success) {
                setMsg(editingId ? 'Designation Updated' : 'Designation Added');
                setTitle('');
                setWorkclass('');
                setEditingId(null);
                setView('list');
                fetchDesignations();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network Error');
        }
    };

    const handleEdit = (d) => {
        setTitle(d.title);
        setWorkclass(d.workclass || '');
        setEditingId(d.id);
        setView('form');
        setMsg('');
    };

    const handleCancel = () => {
        setTitle('');
        setWorkclass('');
        setEditingId(null);
        setView('list');
        setMsg('');
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure? This will remove the designation option.')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/designations/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchDesignations();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const actions = canEdit && (
        <div className="flex gap-2">
            {view === 'list' ? (
                <Button variant="primary" icon={Plus} onClick={() => { setEditingId(null); setTitle(''); setWorkclass(''); setView('form'); }}>Add Designation</Button>
            ) : (
                <Button variant="ghost" icon={X} onClick={handleCancel}>Cancel</Button>
            )}
        </div>
    );

    return (
        <ModuleLayout
            title="Designation Framework"
            icon={BadgeCheck}
            actions={actions}
            isLoading={loading}
        >
            {view === 'form' ? (
                <div className="flex justify-center">
                    <Card className="max-w-xl w-full" title={editingId ? 'Modify Designation' : 'Define New Designation'}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="form-group flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Designation Title</label>
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="e.g. Senior Regional Manager"
                                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm font-semibold"
                                    required
                                />
                                <p className="text-[10px] text-slate-400">Formal title as per service records</p>
                            </div>

                            <div className="form-group flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Workclass / Seniority Index (60-500)</label>
                                <input
                                    type="number"
                                    min="60"
                                    max="500"
                                    value={workclass}
                                    onChange={e => setWorkclass(e.target.value)}
                                    placeholder="e.g. 250"
                                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-color outline-none text-sm"
                                    required
                                />
                                <p className="text-[10px] text-slate-400 font-medium italic">Used for ordering and hierarchy logic</p>
                            </div>

                            <div className="flex flex-col gap-3 mt-4">
                                <Button type="submit" variant="primary" className="py-3 h-auto text-base">
                                    {editingId ? 'Update Designation' : 'Register Designation'}
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
                <Card className="max-w-4xl mx-auto overflow-hidden" noPadding>
                    {!canEdit && (
                        <div className="bg-amber-50 border-b border-amber-100 p-4 flex items-center gap-3 text-amber-700">
                            <ShieldCheck size={20} className="flex-shrink-0" />
                            <p className="text-sm font-medium">Read-only access. Modification requires administrative privileges.</p>
                        </div>
                    )}
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-6">Designation Title</th>
                                <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Hierarchy Index</th>
                                {canEdit && <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-6">Operations</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {designations.length === 0 ? (
                                <tr>
                                    <td colSpan={canEdit ? 3 : 2} className="p-12 text-center text-slate-400 italic">No designations defined.</td>
                                </tr>
                            ) : (
                                designations.map(d => (
                                    <tr key={d.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-color group-hover:text-white transition-all">
                                                    <UserCheck size={16} />
                                                </div>
                                                <span className="font-bold text-slate-700">{d.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-black text-slate-500 shadow-sm font-mono">
                                                {d.workclass || 'N/A'}
                                            </span>
                                        </td>
                                        {canEdit && (
                                            <td className="p-4 pr-6 text-right">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="sm" icon={Edit2} onClick={() => handleEdit(d)} />
                                                    <Button variant="ghost" size="sm" className="text-error-color hover:bg-red-50" icon={Trash2} onClick={() => handleDelete(d.id)} />
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Card>
            )}
        </ModuleLayout>
    );
};


export default DesignationManager;
