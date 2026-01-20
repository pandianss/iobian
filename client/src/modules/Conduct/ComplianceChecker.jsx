import React, { useState } from 'react';
import { IOBConductRegulations, ActionStatus, EmployeeRole } from '../../utils/IOBConductRegulations';
import { ShieldAlert, CheckCircle, AlertTriangle, FileText, Info } from 'lucide-react';

const ComplianceChecker = () => {
    const [scenario, setScenario] = useState('gift'); // gift | property | employment
    const [result, setResult] = useState(null);

    // Inputs
    const [giftData, setGiftData] = useState({ source: 'NearRelative', value: '', occasion: 'Marriage' });
    const [propData, setPropData] = useState({ type: 'Movable', value: '', dealings: false, dealer: true });
    // New Scenario State
    const [empData, setEmpData] = useState({ activity: 'OtherEmployment', remunerated: true });
    const [mediaData, setMediaData] = useState({ contest: 'Literary', isManagement: false });
    const [marriageData, setMarriageData] = useState({ spouseLiving: false, nationality: 'Indian' });
    const [substanceData, setSubstanceData] = useState({ location: 'Private', onDuty: false });

    const checker = new IOBConductRegulations(EmployeeRole.OFFICER_EMPLOYEE);

    const handleCheck = () => {
        let status = null;
        let message = "";

        if (scenario === 'gift') {
            status = checker.processGift(giftData.source, Number(giftData.value), giftData.occasion);
            message = `Accepting a gift of ₹${giftData.value} from ${giftData.source} on occasion of ${giftData.occasion}.`;
        } else if (scenario === 'property') {
            status = checker.manageProperty(propData.type, Number(propData.value), propData.dealings, propData.dealer);
            message = `Transaction of ${propData.type} property worth ₹${propData.value}.`;
        } else if (scenario === 'employment') {
            status = checker.checkOutsideEmployment(empData.activity, empData.remunerated);
            message = `Engaging in ${empData.activity} (Remunerated: ${empData.remunerated ? 'Yes' : 'No'}).`;
        } else if (scenario === 'media') {
            status = checker.checkMediaParticipation(mediaData.contest, mediaData.isManagement);
            message = `Contributing '${mediaData.contest}' content (Management Role: ${mediaData.isManagement ? 'Yes' : 'No'}).`;
        } else if (scenario === 'marriage') {
            status = checker.checkMarriage(marriageData.spouseLiving, marriageData.nationality);
            message = `Marriage plan (Spouse Living: ${marriageData.spouseLiving ? 'Yes' : 'No'}, Nationality: ${marriageData.nationality}).`;
        } else if (scenario === 'substance') {
            status = checker.checkSubstanceUse(substanceData.location, substanceData.onDuty);
            message = `Consuming substance in ${substanceData.location} (On Duty: ${substanceData.onDuty ? 'Yes' : 'No'}).`;
        }

        setResult({ status, message });
    };

    const StatusBadge = ({ status }) => {
        switch (status) {
            case ActionStatus.ALLOWED:
                return <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3 text-green-800"><CheckCircle /> <div><strong>ALLOWED</strong><p>This action is permitted under Regulation 1976.</p></div></div>;
            case ActionStatus.PROHIBITED:
                return <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 text-red-800"><ShieldAlert /> <div><strong>PROHIBITED</strong><p>This action is strictly prohibited. Do not proceed.</p></div></div>;
            case ActionStatus.SANCTION_REQUIRED:
                return <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3 text-yellow-800"><AlertTriangle /> <div><strong>SANCTION REQUIRED</strong><p>You must obtain prior permission from the competent authority.</p></div></div>;
            case ActionStatus.REPORT_REQUIRED:
                return <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex gap-3 text-orange-800"><FileText /> <div><strong>REPORT REQUIRED</strong><p>Allowed, but must be reported to the bank immediately.</p></div></div>;
            case ActionStatus.INTIMATION_REQUIRED:
                return <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3 text-blue-800"><Info /> <div><strong>INTIMATION REQUIRED</strong><p>You must inform the bank prior to this transaction.</p></div></div>;
            default:
                return <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">Check Regulations</div>;
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Compliance Check Wizard</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Scenario</label>
                <select
                    value={scenario}
                    onChange={(e) => { setScenario(e.target.value); setResult(null); }}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="gift">Accepting a Gift (Reg 14)</option>
                    <option value="property">Property Transaction (Reg 20)</option>
                    <option value="employment">Outside Employment (Reg 6)</option>
                    <option value="media">Media/Newspaper (Reg 7)</option>
                    <option value="marriage">Marriage (Reg 22)</option>
                    <option value="substance">Substance/Alcohol (Reg 23)</option>
                </select>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                {scenario === 'gift' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Source</label>
                            <select value={giftData.source} onChange={e => setGiftData({ ...giftData, source: e.target.value })} className="w-full p-2 border rounded">
                                <option value="NearRelative">Near Relative</option>
                                <option value="PersonalFriend">Personal Friend</option>
                                <option value="Other">Other</option>
                                <option value="Dowry">Dowry</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Occasion</label>
                            <select value={giftData.occasion} onChange={e => setGiftData({ ...giftData, occasion: e.target.value })} className="w-full p-2 border rounded">
                                <option value="Marriage">Marriage</option>
                                <option value="Religious">Religious Function</option>
                                <option value="Other">Other / No Occasion</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Value (₹)</label>
                            <input type="number" value={giftData.value} onChange={e => setGiftData({ ...giftData, value: e.target.value })} className="w-full p-2 border rounded" placeholder="0.00" />
                        </div>
                    </div>
                )}

                {scenario === 'property' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Property Type</label>
                            <select value={propData.type} onChange={e => setPropData({ ...propData, type: e.target.value })} className="w-full p-2 border rounded">
                                <option value="Movable">Movable (Car, Jewelry, Shares)</option>
                                <option value="Immovable">Immovable (Land, House)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Value (₹)</label>
                            <input type="number" value={propData.value} onChange={e => setPropData({ ...propData, value: e.target.value })} className="w-full p-2 border rounded" placeholder="0.00" />
                        </div>
                        <div className="flex gap-4 p-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={propData.dealings} onChange={e => setPropData({ ...propData, dealings: e.target.checked })} />
                                <span className="text-sm">Has Official Dealings?</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={propData.dealer} onChange={e => setPropData({ ...propData, dealer: e.target.checked })} />
                                <span className="text-sm">Is Reputed Dealer?</span>
                            </label>
                        </div>
                    </div>
                )}

                {scenario === 'employment' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Activity Type</label>
                            <select value={empData.activity} onChange={e => setEmpData({ ...empData, activity: e.target.value })} className="w-full p-2 border rounded">
                                <option value="Trade">Trade or Business</option>
                                <option value="InsuranceAgency">Insurance Agency</option>
                                <option value="Social">Social / Charitable</option>
                                <option value="Literary">Literary / Artistic</option>
                                <option value="OtherEmployment">Other Employment</option>
                            </select>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer mt-2">
                            <input type="checkbox" checked={empData.remunerated} onChange={e => setEmpData({ ...empData, remunerated: e.target.checked })} />
                            <span className="text-sm">Is Remunerated? (Fee accepted)</span>
                        </label>
                    </div>
                )}

                {scenario === 'media' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Content Type</label>
                            <select value={mediaData.contest} onChange={e => setMediaData({ ...mediaData, contest: e.target.value })} className="w-full p-2 border rounded">
                                <option value="Literary">Literary / Scientific / Cultural</option>
                                <option value="Political">Political / General News</option>
                            </select>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer mt-2">
                            <input type="checkbox" checked={mediaData.isManagement} onChange={e => setMediaData({ ...mediaData, isManagement: e.target.checked })} />
                            <span className="text-sm">Management / Editor Role?</span>
                        </label>
                    </div>
                )}

                {scenario === 'marriage' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Spouse Nationality</label>
                            <select value={marriageData.nationality} onChange={e => setMarriageData({ ...marriageData, nationality: e.target.value })} className="w-full p-2 border rounded">
                                <option value="Indian">Indian</option>
                                <option value="Foreign">Foreign National</option>
                            </select>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer mt-2">
                            <input type="checkbox" checked={marriageData.spouseLiving} onChange={e => setMarriageData({ ...marriageData, spouseLiving: e.target.checked })} />
                            <span className="text-sm">Do you already have a spouse living?</span>
                        </label>
                    </div>
                )}

                {scenario === 'substance' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Location</label>
                            <select value={substanceData.location} onChange={e => setSubstanceData({ ...substanceData, location: e.target.value })} className="w-full p-2 border rounded">
                                <option value="Private">Private Residence</option>
                                <option value="PublicPlace">Public Place</option>
                            </select>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer mt-2">
                            <input type="checkbox" checked={substanceData.onDuty} onChange={e => setSubstanceData({ ...substanceData, onDuty: e.target.checked })} />
                            <span className="text-sm">Are you currently On Duty?</span>
                        </label>
                    </div>
                )}

                <button
                    onClick={handleCheck}
                    className="mt-6 w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                >
                    Check Compliance
                </button>
            </div>

            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <StatusBadge status={result.status} />
                    <p className="mt-2 text-sm text-gray-500 text-center">{result.message}</p>
                </div>
            )}
        </div>
    );
};

export default ComplianceChecker;
