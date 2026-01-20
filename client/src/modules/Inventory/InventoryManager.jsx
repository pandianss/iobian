import { Package, Plus, Minus, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';
import ModuleLayout from '../../components/Common/ModuleLayout';

const InventoryManager = () => {
    // Mock Inventory Data
    const [items, setItems] = useState([
        { id: 1, name: 'Safe Deposit Lockers (Small)', quantity: 12, minStats: 5 },
        { id: 2, name: 'Safe Deposit Lockers (Medium)', quantity: 4, minStats: 2 },
        { id: 3, name: 'Insta-Debit Card Kits', quantity: 150, minStats: 50 },
        { id: 4, name: 'Cheque Book Request Forms', quantity: 500, minStats: 100 },
    ]);

    const handleUpdate = (id, change) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        ));
    };

    const actions = (
        <Button variant="primary" icon={Send} onClick={() => alert('Update sent to Regional Office')}>
            Update RO
        </Button>
    );

    return (
        <ModuleLayout
            title="Resource Inventory"
            icon={Package}
            actions={actions}
        >
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
                <Card title="Stationery & Resource Stock" noPadding overflow-hidden>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-6">Resource Name</th>
                                <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Current Stock</th>
                                <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Health Status</th>
                                <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-6">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <span className="font-bold text-slate-700">{item.name}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-lg font-black text-slate-900 font-mono tracking-tighter">
                                            {item.quantity}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {item.quantity < item.minStats ? (
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[10px] font-black uppercase">
                                                <AlertTriangle size={12} /> Low Stock
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-[10px] font-black uppercase">
                                                <CheckCircle2 size={12} /> Operational
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex justify-end items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                icon={Minus}
                                                onClick={() => handleUpdate(item.id, -1)}
                                                className="hover:bg-slate-200"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                icon={Plus}
                                                onClick={() => handleUpdate(item.id, 1)}
                                                className="hover:bg-slate-200"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-blue-100 text-primary-color rounded-xl">
                            <Package size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">Inventory Syncing</h4>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                                Updates made here are local until synchronized with the Regional Office records. Use the "Update RO" action to finalize changes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
};
    );
};

export default InventoryManager;
