import React, { useState } from 'react';
import iobLogo from '../../assets/iob_logo.svg';
import { formatDate } from '../../utils/formatters';

const JoiningOfferGenerator = () => {
    const [view, setView] = useState('edit'); // 'edit' | 'preview'
    const [formData, setFormData] = useState({
        refNo: 'HRMD/SUP/2735001038/2025-2026',
        date: formatDate(new Date()), // DD.MM.YYYY
        candidateName: '',
        parentName: '', // S/o or D/o
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: 'Tamil Nadu',
        pin: '',
        mobile: '',
        email: '',
        reportingDate: '11.05.2025',
        reportingTime: '10.00 A.M.',
        reportingVenue: 'Staff College, No.230, 7/A-Jawaharlal Nehru Road, Near VR Mall, Old Thirumangalam, Anna Nagar, Chennai - 600040'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="joining-offer-container">
            {/* NO-PRINT: Form Controls */}
            <div className="noprint" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>Joining Offer Generator (PO/MT XIV)</h3>
                    <div>
                        <button className="btn" onClick={() => setView(view === 'edit' ? 'preview' : 'edit')} style={{ marginRight: '1rem' }}>
                            {view === 'edit' ? 'Show Preview' : 'Edit Details'}
                        </button>
                        <button className="btn btn-primary" onClick={handlePrint}>Print / Save PDF</button>
                    </div>
                </div>

                {view === 'edit' && (
                    <div className="card" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label>Reference No</label>
                            <input name="refNo" value={formData.refNo} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Date</label>
                            <input name="date" value={formData.date} onChange={handleChange} />
                        </div>

                        <h5 style={{ gridColumn: '1/-1', marginTop: '1rem', borderBottom: '1px solid #eee' }}>Candidate Details</h5>
                        <div>
                            <label>Candidate Name</label>
                            <input name="candidateName" value={formData.candidateName} onChange={handleChange} placeholder="e.g. Ms. Rajipriya K" />
                        </div>
                        <div>
                            <label>Parent Name (S/o, D/o)</label>
                            <input name="parentName" value={formData.parentName} onChange={handleChange} placeholder="e.g. Kuppan" />
                        </div>
                        <div style={{ gridColumn: '1/-1' }}>
                            <label>Address Line 1</label>
                            <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Door No, Street" />
                        </div>
                        <div style={{ gridColumn: '1/-1' }}>
                            <label>Address Line 2</label>
                            <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Area, Village" />
                        </div>
                        <div>
                            <label>City / Taluk</label>
                            <input name="city" value={formData.city} onChange={handleChange} />
                        </div>
                        <div>
                            <label>State</label>
                            <input name="state" value={formData.state} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Pin Code</label>
                            <input name="pin" value={formData.pin} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Mobile</label>
                            <input name="mobile" value={formData.mobile} onChange={handleChange} />
                        </div>
                        <div style={{ gridColumn: '1/-1' }}>
                            <label>Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <h5 style={{ gridColumn: '1/-1', marginTop: '1rem', borderBottom: '1px solid #eee' }}>Reporting Details</h5>
                        <div>
                            <label>Reporting Date</label>
                            <input name="reportingDate" value={formData.reportingDate} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Reporting Time</label>
                            <input name="reportingTime" value={formData.reportingTime} onChange={handleChange} />
                        </div>
                        <div style={{ gridColumn: '1/-1' }}>
                            <label>Venue Address</label>
                            <textarea name="reportingVenue" value={formData.reportingVenue} onChange={handleChange} rows={3} style={{ width: '100%' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* PREVIEW / PRINT CLASS */}
            {(view === 'preview' || view === 'edit') && (
                <div className="report-preview-container" style={{
                    display: view === 'edit' ? 'none' : 'block', // Hide in edit mode unless printing
                    background: 'white',
                    padding: '0',
                    margin: '0 auto'
                }}>
                    <style>{`
                        @media print {
                            .noprint { display: none !important; }
                            .joining-offer-container { width: 100%; margin: 0; padding: 0; }
                            .report-preview-container { display: block !important; width: 100%; }
                            @page { margin: 15mm 15mm 15mm 15mm; size: A4; }
                            body { -webkit-print-color-adjust: exact; }
                            .page-break { page-break-before: always; }
                        }
                        .letter-content { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.3; color: black; max-width: 210mm; margin: 0 auto; padding: 10mm; }
                        .letter-header { display: flex; align-items: flex-start; gap: 1rem; border-bottom: 2px dashed #999; padding-bottom: 10px; margin-bottom: 1rem; }
                        .logo-section img { height: 60px; }
                        .address-section { font-size: 9pt; flex: 1; }
                        .contact-section { font-size: 9pt; text-align: right; }
                        .highlight { background-color: yellow; font-weight: bold; }
                        .subject-header { text-decoration: underline; font-weight: bold; margin: 1rem 0; }
                        .salary-table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 9pt; }
                        .salary-table th, .salary-table td { border: 1px solid black; padding: 4px 8px; vertical-align: top; }
                        .venue-box { border: 1px solid black; padding: 5px; margin-top: 1rem; display: flex; font-size: 9pt; }
                    `}</style>

                    {/* PAGE 1 */}
                    <div className="letter-content">
                        {/* Header */}
                        <div className="letter-header">
                            <div className="logo-section"><img src={iobLogo} alt="IOB" /></div>
                            <div className="address-section">
                                <b>इण्डियन ओवरसीज़ बैंक</b><br />
                                Indian Overseas Bank<br />
                                केंद्रीय कार्यालय, पी.बी.नं 3765, 763 अण्णा सालै, चेन्नई 600 002<br />
                                Central Office, P.B.No.3765, 763, Anna Salai, Chennai 600 002<br />
                                मानव संसाधन प्रबंधन विभाग Human Resources Management Department<br />
                                पर्यवेक्षी अनुभाग Supervisory Section<br />
                                <b>{formData.refNo}</b>
                            </div>
                            <div className="contact-section">
                                फोन Tel. 044 - 7172 9751<br />
                                044 - 2851 9663<br /><br />
                                ई-मेल E-mail - padsup@iobnet.co.in<br />
                                दिनांक Date: {formData.date}
                            </div>
                        </div>

                        {/* Address Block */}
                        <div style={{ background: 'yellow', display: 'inline-block', padding: '2px', fontWeight: 'bold' }}>
                            {formData.candidateName}<br />
                            {formData.parentName && <>S/D/o {formData.parentName}<br /></>}
                            {formData.addressLine1}<br />
                            {formData.addressLine2}<br />
                            {formData.city} <br />
                            {formData.state} - {formData.pin}<br />
                            MOB - {formData.mobile}<br />
                            E-MAIL ID - {formData.email}
                        </div>

                        <p style={{ marginTop: '1rem' }}>प्रिय महोदय / महोदया, Dear Sir / Madam,</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', textDecoration: 'underline' }}>
                            <span>स्टाफ – पर्यवेक्षी</span>
                            <span>STAFF – SUPERVISING</span>
                        </div>

                        <p className="subject-header">
                            IBPS CRP PO/MT XIV - OFFER OF APPOINTMENT AS ASSISTANT MANAGER (ON PROBATION) IN JUNIOR MANAGEMENT GRADE SCALE-I
                        </p>

                        <p style={{ textAlign: 'justify' }}>
                            We are glad to inform you that, further to the interview held for the post of Assistant Manager (On Probation) in Junior Management Grade Scale-I, we now advise that you have been provisionally selected as Assistant Manager (On Probation) in Junior Management Grade Scale-I in our Bank subject to production of certificates / documents/Bond etc. You are advised to report at 10.00 A.M. at the following address on <span className="highlight">{formData.reportingDate}</span> for verification of documents.
                        </p>

                        <div className="venue-box">
                            <div style={{ width: '30%', borderRight: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <b>IOB</b> (Logo Placeholder)
                            </div>
                            <div style={{ padding: '0 10px', flex: 1 }}>
                                <p><b>सम्पर्क सूत्र / CONTACT No.</b></p>
                                <p>044-71729751<br />044-28519663<br />044-26156488 – For location queries</p>
                                <p><b>INDIAN OVERSEAS BANK</b><br />{formData.reportingVenue}</p>
                            </div>
                        </div>

                        <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
                            नियुक्ति का यह प्रस्ताव निम्नलिखित निबंधनों और शर्तों के अधीन है: This offer of appointment is subject to the following terms and conditions:
                        </p>

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>Page 1 of 5</div>
                    </div>

                    {/* PAGE 2 */}
                    <div className="page-break"></div>
                    <div className="letter-content">
                        <p>1) You will draw the following salary and allowances per month subject to your reporting:</p>

                        <table className="salary-table">
                            <tbody>
                                <tr>
                                    <td>Basic Pay</td>
                                    <td>Rs. 48480/- (in the scale of pay Rs. 48480/- (2000/7) - 62480/- (2340/2) - 67160/- (2680/7) – 85920)</td>
                                </tr>
                                <tr>
                                    <td>Dearness Allowance</td>
                                    <td>Will vary according to cost of living (which is at present 21.20% of Basic Pay and Special Allowance)</td>
                                </tr>
                                <tr>
                                    <td>House Rent Allowance</td>
                                    <td>As applicable to the place of posting index (8% to 10% on Basic pay)</td>
                                </tr>
                                <tr>
                                    <td>City Compensatory Allowance</td>
                                    <td>As applicable to the place of posting (Minimum of Rs. 1900/- per month and maximum of Rs. 2300/- per month)</td>
                                </tr>
                                <tr>
                                    <td>Location allowance</td>
                                    <td>Fixed allowance of Rs.1200/- per month payable to officers posted in Non – CCA centres</td>
                                </tr>
                                <tr>
                                    <td>Learning allowance</td>
                                    <td>Rs. 850/- per month together with applicable DA</td>
                                </tr>
                                <tr>
                                    <td>Special Allowance</td>
                                    <td>26.50 % of Basic Pay and DA thereon</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'center', marginTop: 'auto' }}>Page 2 of 5</div>
                    </div>

                    {/* PAGE 3 */}
                    <div className="page-break"></div>
                    <div className="letter-content">
                        <p>2) You should produce the following papers/documents at the time of joining duty.</p>
                        <ol type="a" style={{ paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '10px' }}>Four passport size photographs and two stamp size photographs.</li>
                            <li style={{ marginBottom: '10px' }}>All Original educational qualification certificates with mark sheets along with the photo copies of the same.</li>
                            <li style={{ marginBottom: '10px' }}>The original Transfer Certificate/HSC/SSC certificate in proof of your date of birth along with photo copies...</li>
                            <li style={{ marginBottom: '10px' }}>The original Pan Card, Aadhaar Card and proof of communication address along with photo copies...</li>
                            <li style={{ marginBottom: '10px' }}>Two Character Certificates from respectable persons who are not related to you.</li>
                            <li style={{ marginBottom: '10px' }}>Certificate of medical fitness from the registered medical practitioner not below the rank of a Civil Assistant Surgeon.</li>
                            <li style={{ marginBottom: '10px' }}>Candidates belonging to SC/ST or OBC should produce the community certificate issued by Competent Authority...</li>
                            <li style={{ marginBottom: '10px' }}>Candidates recruited under EWS category shall produce an Income and Asset Certificate...</li>
                        </ol>
                        <p>3) You will be on probation for a period of two years. On satisfactory completion of probation, you will be confirmed in the Banks services in Junior Management Grade Scale-I.</p>
                        <div style={{ textAlign: 'center', marginTop: 'auto' }}>Page 3 of 5</div>
                    </div>

                    {/* PAGE 4 */}
                    <div className="page-break"></div>
                    <div className="letter-content">
                        <p>4) You will be required to execute a Financial Service Bond for Rs.2,00,000/- (Rupees two lakhs only) at the time of reporting... (Bond details)</p>
                        <p>5) You are liable to be transferred anywhere in India.</p>
                        <p>6) You will be bound by the Indian Overseas Bank (Officers) Service Regulations 1979...</p>
                        <p>7) You will be covered by Defined Contributory Pension Scheme under the New Pension Scheme.</p>
                        <p>8) In the case of SC/ST candidates, the appointment is provisional and is subject to verification of such certificates...</p>
                        <p>9) In case of OBC candidates, the appointment is provisional and is subject to the community certificates being verified...</p>
                        <p>10) You are required to do the work in Hindi as per the Official Language Policy of the Government Of India.</p>
                        <p>11) Candidates recruited under the Physically Challenged quota should produce the necessary certificate...</p>
                        <p>12) Your appointment is subject to verification of character and antecedent...</p>
                        <p>13) You are required to submit a statement on Assets and Liabilities statement...</p>
                        <div style={{ textAlign: 'center', marginTop: 'auto' }}>Page 4 of 5</div>
                    </div>

                    {/* PAGE 5 */}
                    <div className="page-break"></div>
                    <div className="letter-content">
                        <p>14) You are advised to report on <span className="highlight">{formData.reportingDate}</span> at 10.00 A.M...</p>
                        <p>15) Please note that you will be allowed to join duty only on production of Papers /documents... If you fail to report at the above mentioned address on <span className="highlight">{formData.reportingDate}</span> at 10.00 a.m., this appointment order will be treated as cancelled.</p>

                        <p style={{ marginTop: '2rem' }}>With best wishes,</p>

                        <div style={{ marginTop: '3rem' }}>
                            <p>(Dillip Kumar Barik)<br />General Manager</p>
                        </div>

                        <hr style={{ margin: '2rem 0' }} />
                        <p>PS: PLEASE NOTE TO BRING A COPY OF THE OFFER LETTER DULY SIGNED AND SUBMIT IT TO THE VERIFYING OFFICIAL AT THE TIME OF JOINING.</p>

                        <div style={{ marginTop: '2rem' }}>
                            <p>I accept the above terms & conditions<br />In toto</p>
                            <p style={{ marginTop: '3rem' }}>(Signature of the candidate)</p>
                            <p>Date:</p>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 'auto' }}>Page 5 of 5</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default JoiningOfferGenerator;
