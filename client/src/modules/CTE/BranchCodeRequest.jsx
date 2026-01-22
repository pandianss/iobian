import React from 'react';
import { Save, Printer, FileText } from 'lucide-react';
import Button from '../../framework/ui/Button';
import Card from '../../framework/ui/Card';

const BranchCodeRequest = ({ user, bankConfig, onSave, onDownload, initialData, currentRefNo }) => {
    const [formData, setFormData] = React.useState({
        requestType: 'opening',
        openingDate: '',
        branchOfficeName: '',
        region: user?.region_details?.region_name || user?.region_name || 'Dindigul',
        regionHindi: user?.region_details?.region_name_hindi || '',
        regionLocal: user?.region_details?.region_name_local || '',
        regionAddress: user?.region_details?.region_address || '',
        regionAddressHindi: user?.region_details?.region_address_hindi || '',
        regionAddressLocal: user?.region_details?.region_address_local || '',
        refNo: currentRefNo || '',
        date: new Date().toISOString().split('T')[0],
        permissionLetter: '',
        licenseNo: '',
        populationCategory: 'Urban',
        populationCentre: '',
        cdBlock: '',
        taluk: '',
        district: '',
        state: 'Tamil Nadu',
        postalAddress: '',
        workingHours: '10:00 AM - 4:00 PM',
        saturdayHours: '10:00 AM - 2:00 PM',
        holiday: 'Sunday',
        nearestCurrencyChest: '',
        currencyChestDetails: '', // Part I/II, Bank Name, Distance
        authorizedDealer: 'No',
        routingBranchName: '',
        routingPartCode: '',
        isCBS: 'Yes',
        micrCode: '',
        otherDetails: ''
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    React.useEffect(() => {
        if (currentRefNo) {
            setFormData(prev => ({ ...prev, refNo: currentRefNo }));
        }
    }, [currentRefNo]);

    const [viewMode, setViewMode] = React.useState('edit');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const Header = () => (
        <div className="print-header" style={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '2pt solid #254aa0',
            paddingBottom: '12pt',
            marginBottom: '18pt',
            width: '100%'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                alignItems: 'center',
                gap: '4pt 20pt',
                width: '100%'
            }}>
                <div style={{ gridRow: '1 / span 3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/logo_center.svg" alt="Logo" style={{ height: '24mm', maxWidth: '100%', objectFit: 'contain' }} />
                </div>

                <div style={{ textAlign: 'left', fontSize: '13pt', fontWeight: 'bold', color: '#254aa0', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
                    {bankConfig?.name_hindi || 'इण्डियन ओवरसीज़ बैंक'}
                </div>
                <div style={{ textAlign: 'right', fontSize: '10pt', fontWeight: 'bold', color: '#254aa0', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
                    {formData.regionHindi ? `क्षेत्रीय कार्यालय – ${formData.regionHindi} ` : 'क्षेत्रीय कार्यालय'}
                </div>

                <div style={{ textAlign: 'left', fontSize: '13pt', fontWeight: 'bold', color: '#254aa0', letterSpacing: '0.1pt', fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {bankConfig?.name_english || 'INDIAN OVERSEAS BANK'}
                </div>
                <div style={{ textAlign: 'right', fontSize: '10pt', fontWeight: 'bold', color: '#254aa0', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
                    Regional Office – {formData.region}
                </div>

                <div style={{ textAlign: 'left', fontSize: '13pt', fontWeight: 'bold', color: '#254aa0', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
                    {bankConfig?.name_local || 'இந்தியன் ஓவர்சீஸ் வங்கி'}
                </div>
                <div style={{ textAlign: 'right', fontSize: '10pt', fontWeight: 'bold', color: '#254aa0', fontFamily: 'Arial, sans-serif' }}>
                    {formData.regionLocal ? `மண்டல அலுவலகம் – ${formData.regionLocal} ` : 'மண்டல அலுவலகம்'}
                </div>
            </div>

            <div style={{
                width: '100%',
                textAlign: 'center',
                margin: '8pt 0 4pt 0',
                fontSize: '10pt',
                fontWeight: 'bold',
                color: '#333',
                borderTop: '1pt solid #254aa0',
                paddingTop: '4pt'
            }}>
                {bankConfig?.dept_hindi || 'योजना विभाग'} &nbsp;|&nbsp; {bankConfig?.dept_english || 'Planning Department'} &nbsp;|&nbsp; {bankConfig?.dept_local || 'திட்டமிடல் துறை'}
            </div>

            {/* Row 5: Address - Full Width Row Below */}
            <div style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '8pt',
                color: '#444',
                lineHeight: '1.4',
                fontFamily: 'Arial, sans-serif'
            }}>
                {[
                    formData.regionAddressHindi,
                    formData.regionAddress,
                    formData.regionAddressLocal
                ].filter(Boolean).map((addr, idx) => (
                    <span key={idx}>
                        {idx > 0 && ' | '}
                        {addr.startsWith('#') ? addr : `#${addr} `}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="branch-code-request">
            <div className="flex justify-between items-center mb-6 noprint" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant={viewMode === 'edit' ? 'primary' : 'ghost'} onClick={() => setViewMode('edit')}>Edit Form</Button>
                    <Button variant={viewMode === 'preview' ? 'primary' : 'ghost'} onClick={() => setViewMode('preview')}>Preview & Print</Button>
                </div>
                <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="secondary" icon={Save} onClick={() => onSave(formData)}>Save Draft</Button>
                    {viewMode === 'preview' && <Button variant="gold" icon={Printer} onClick={() => onDownload('pdf-content')}>Download PDF</Button>}
                </div>
            </div>

            {viewMode === 'edit' ? (
                <Card title="Branch Code Request Proforma (Full)">
                    <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="label">1. Date of Opening</label>
                            <input type="date" className="input" value={formData.openingDate} onChange={e => handleChange('openingDate', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">2. Name of Branch / Office</label>
                            <input className="input" value={formData.branchOfficeName} onChange={e => handleChange('branchOfficeName', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">3. Permission Letter / License Details</label>
                            <input className="input" value={formData.permissionLetter} onChange={e => handleChange('permissionLetter', e.target.value)} placeholder="Ref No & Date" />
                        </div>
                        <div className="form-group">
                            <label className="label">4. Population Category</label>
                            <select className="input" value={formData.populationCategory} onChange={e => handleChange('populationCategory', e.target.value)}>
                                <option value="Rural">Rural</option>
                                <option value="Semi-Urban">Semi-Urban</option>
                                <option value="Urban">Urban</option>
                                <option value="Metropolitan">Metropolitan</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label">5. Population of the Centre</label>
                            <input className="input" value={formData.populationCentre} onChange={e => handleChange('populationCentre', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">6. Community Development Block</label>
                            <input className="input" value={formData.cdBlock} onChange={e => handleChange('cdBlock', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">7. Taluk / Tehsil</label>
                            <input className="input" value={formData.taluk} onChange={e => handleChange('taluk', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">8. District / State</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input className="input" value={formData.district} onChange={e => handleChange('district', e.target.value)} placeholder="District" />
                                <input className="input" value={formData.state} onChange={e => handleChange('state', e.target.value)} placeholder="State" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">9. Working Hours (Weekdays)</label>
                            <input className="input" value={formData.workingHours} onChange={e => handleChange('workingHours', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">10. Saturday / Holiday</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input className="input" value={formData.saturdayHours} onChange={e => handleChange('saturdayHours', e.target.value)} placeholder="Sat Hours" />
                                <input className="input" value={formData.holiday} onChange={e => handleChange('holiday', e.target.value)} placeholder="Holiday" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mt-4" style={{ marginTop: '1rem' }}>
                        <label className="label">11. Complete Postal Address (with PIN)</label>
                        <textarea className="input" value={formData.postalAddress} onChange={e => handleChange('postalAddress', e.target.value)} rows="3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                        <div className="form-group">
                            <label className="label">12. Nearest Currency Chest</label>
                            <input className="input" value={formData.nearestCurrencyChest} onChange={e => handleChange('nearestCurrencyChest', e.target.value)} placeholder="Bank Name / Branch" />
                        </div>
                        <div className="form-group">
                            <label className="label">13. Chest Details (Part I/II & Distance)</label>
                            <input className="input" value={formData.currencyChestDetails} onChange={e => handleChange('currencyChestDetails', e.target.value)} placeholder="Code & Distance" />
                        </div>
                        <div className="form-group">
                            <label className="label">14. AD (Forex) Routing Branch</label>
                            <input className="input" value={formData.routingBranchName} onChange={e => handleChange('routingBranchName', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">15. AD Branch Part I/II Code</label>
                            <input className="input" value={formData.routingPartCode} onChange={e => handleChange('routingPartCode', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="label">16. Under CBS?</label>
                            <select className="input" value={formData.isCBS} onChange={e => handleChange('isCBS', e.target.value)}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label">17. MICR Code obtained?</label>
                            <input className="input" value={formData.micrCode} onChange={e => handleChange('micrCode', e.target.value)} />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 pt-4 border-t" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                        <Button variant="primary" icon={FileText} onClick={() => setViewMode('preview')}>
                            Generate Preview
                        </Button>
                    </div>
                </Card>
            ) : (
                <div id="pdf-content" className="card report-container" style={{ padding: '30pt', background: 'white', minHeight: '297mm', color: 'black' }}>
                    <Header />
                    <div className="center bold underline mb-2" style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                        PROFORMA FOR OBTENTION OF BRANCH CODE NUMBER (SOL ID)
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '10pt', fontWeight: 'bold' }}>
                        REF NO: {formData.refNo || 'PLN/BCR/TEMP/000'}
                    </div>

                    <table className="main-table w-full border-collapse" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt' }}>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt', width: '40%' }}>1. DATE OF OPENING</td>
                                <td style={{ border: '1px solid black', padding: '6pt', fontWeight: 'bold' }}>{formData.openingDate ? new Date(formData.openingDate).toLocaleDateString('en-GB') : '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>2. NAME OF THE BRANCH / OFFICE</td>
                                <td style={{ border: '1px solid black', padding: '6pt', fontWeight: 'bold' }}>{formData.branchOfficeName || '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>3. Permission Letter / License Details</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.permissionLetter || '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>4. POPULATION CATEGORY</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.populationCategory}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>5. POPULATION OF THE CENTRE</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.populationCentre || '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>6. COMMUNITY DEVELOPMENT BLOCK</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.cdBlock || '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>7. TALUK / TEHSIL</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.taluk || '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>8. DISTRICT / STATE</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.district} / {formData.state}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>9. WORKING HOURS</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>
                                    Weekdays: {formData.workingHours}<br />
                                    Saturday: {formData.saturdayHours}<br />
                                    Holiday: {formData.holiday}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>10. COMPLETE POSTAL ADDRESS WITH PIN CODE</td>
                                <td style={{ border: '1px solid black', padding: '6pt', whiteSpace: 'pre-wrap' }}>{formData.postalAddress || '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>11. Nearest Currency Chest to the Branch (With Part I/II code, Bank Name & Distance in Km)</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.nearestCurrencyChest || '-'} / {formData.currencyChestDetails || '-'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>12. Authorized Dealer Through whom Foreign Exchange Transactions will be Routed (Branch Name & Part I/II code)</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.routingBranchName || '-'} (Code: {formData.routingPartCode || '-'})</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>13. Whether the Branch is under CBS</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.isCBS}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>14. MICR Code if any obtained for the Branch</td>
                                <td style={{ border: '1px solid black', padding: '6pt' }}>{formData.micrCode || '-'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ marginTop: '30pt', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-GB')}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <br /><br /><br />
                            <strong>Signature & Seal</strong>
                        </div>
                    </div>

                    <div style={{ marginTop: '40pt', fontSize: '8pt', color: '#444', fontStyle: 'italic', borderTop: '0.5pt solid #ccc', paddingTop: '10pt' }}>
                        <strong>NB:</strong> For all types of Shifting Prior Approval must be obtained from Planning Department Central Office from Licensing Point of View. Proforma (Annex-I) for all New Branches opened / ECs upgraded and for all types of shifting / closures should be submitted within 3 days to Planning Department.
                    </div>
                </div>
            )}
            <style>{`
    .main-table td { border: 1px solid black!important; padding: 10px!important; }
@media print {
                    .noprint { display: none!important; }
    #pdf-content { padding: 0!important; border: none!important; box-shadow: none!important; color: black!important; }
}
`}</style>
        </div>
    );
};

export default BranchCodeRequest;
