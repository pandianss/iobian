import { Trash2, RefreshCcw, UserMinus, History, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../../framework/ui/Button';
import Card from '../../framework/ui/Card';
import ModuleLayout from '../../framework/layouts/ModuleLayout';

const RestorationVault = () => {
    const [deletedItems, setDeletedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchDeleted();
    }, []);

    const fetchDeleted = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/admin/restore');
            const data = await res.json();
            setDeletedItems(data.users || []); // Currently only users
        } catch (err) {
            console.error("Failed to fetch deleted items");
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (id) => {
        setMsg('');
        try {
            const res = await fetch('http://localhost:5000/api/admin/restore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'user', id })
            });
            const data = await res.json();
            if (data.success) {
                setMsg('Record restored successfully');
                fetchDeleted();
            } else {
                setMsg('Error: ' + data.message);
            }
        } catch (err) {
            setMsg('Network error');
        }
    };

    return (
        <ModuleLayout
            title="Restoration Vault"
            icon={History}
            isLoading={loading}
        >
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <Card title="Recycle Bin: Administrative Records" className="overflow-hidden" noPadding>
                    <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                        <p className="text-sm text-slate-500 font-medium italic flex items-center gap-2">
                            <Trash2 size={16} /> Deleted records can be restored to their original state.
                        </p>
                        <Button variant="ghost" size="sm" icon={RefreshCcw} onClick={fetchDeleted}>Refresh Bin</Button>
                    </div>

                    {deletedItems.length === 0 ? (
                        <div className="p-16 text-center text-slate-400">
                            <UserMinus size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="font-medium">The vault is currently empty.</p>
                            <p className="text-xs">No deleted user records found in the archive.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {deletedItems.map(item => (
                                <div key={item.roll_number} className="flex justify-between items-center p-6 hover:bg-slate-50/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-red-50 text-red-400 flex items-center justify-center font-bold font-mono">
                                            {item.roll_number.toString().slice(-2)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800">{item.full_name}</div>
                                            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                Roll No: {item.roll_number} • <span className="text-red-400 font-bold">Deleted Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        icon={RefreshCcw}
                                        className="bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
                                        onClick={() => handleRestore(item.roll_number)}
                                    >
                                        Restore Record
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                {msg && (
                    <div className={`p-4 rounded-xl text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${msg.includes('Error') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                        {msg.includes('Error') ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                        <span className="font-medium">{msg}</span>
                    </div>
                )}
            </div>
        </ModuleLayout>
    );
};


export default RestorationVault;
