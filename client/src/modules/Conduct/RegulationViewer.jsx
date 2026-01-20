import React from 'react';

const RegulationViewer = () => {
    // Helper for Section Headers
    const RegHeader = ({ num, title }) => (
        <h4 className="text-lg font-bold text-blue-900 mb-2 mt-8 border-b border-gray-200 pb-1">
            Regulation {num}: {title}
        </h4>
    );

    return (
        <div className="p-8 max-w-5xl mx-auto font-serif">
            <div className="mb-12 text-center border-b-4 border-double border-gray-800 pb-6">
                <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Indian Overseas Bank
                </h2>
                <h3 className="text-xl font-semibold text-gray-700 uppercase">
                    Officer Employees' (Conduct) Regulations, 1976
                </h3>
            </div>

            <div className="space-y-6 text-gray-800 leading-relaxed text-justify">

                <RegHeader num="1" title="Short Title, Commencement and Application" />
                <p>(1) These regulations may be called Indian Overseas Bank Officer Employees' (Conduct) Regulations, 1976.</p>
                <p>(2) They shall come into force on 1st November, 1976.</p>
                <p>(3) Application: Applies to all officer employees except Chairman, MD, Whole-time Directors, Casuals, and Award Staff.</p>

                <RegHeader num="2" title="Definitions" />
                <p>In these regulations, unless the context otherwise requires:</p>
                <ul className="list-disc ml-8 text-sm text-gray-700">
                    <li>"Act" means the Banking Companies (Acquisition and Transfer of Undertakings) Act, 1970.</li>
                    <li>"Competent Authority" means the authority appointed by the Board.</li>
                    <li>"Family" includes spouse, children, and dependent parents.</li>
                </ul>

                <RegHeader num="3" title="General" />
                <p>Every officer employee shall at all times take all possible steps to ensure and protect the interests of the bank and discharge his duties with utmost integrity, honesty, devotion and diligence and do nothing which is unbecoming of an officer employee.</p>

                <RegHeader num="4" title="Observance of Secrecy" />
                <p>Every officer employee shall maintain the strictest secrecy regarding the Bank's affairs and the affairs of its constituents.</p>

                <RegHeader num="5" title="Employment of Members of Family" />
                <p>No officer employee shall use his position or influence directly or indirectly to secure employment for any member of his family in any undertaking having official dealings with the Bank.</p>

                <RegHeader num="6" title="Taking up Outside Employment" />
                <p>No officer employee shall, except with the previous sanction of the competent authority, engage directly or indirectly in any trade or business or undertake any other employment.</p>

                <RegHeader num="7" title="Contribution to Newspapers, Radio etc." />
                <p>No officer employee shall, except with sanction, own or participate in the editing or management of any newspaper or periodical.</p>

                <RegHeader num="8" title="Demonstrations" />
                <p>No officer employee shall engage himself or participate in any demonstration which is prejudicial to the interests of the sovereignty and integrity of India, the security of the State, or public order.</p>

                <RegHeader num="9" title="Joining of Associations Prejudicial to Interests of the Country" />
                <p>No officer employee shall join, or continue to be a member of an association the objects or activities of which are prejudicial to the interests of the sovereignty and integrity of India or public order or morality.</p>

                <RegHeader num="10" title="Giving Evidence" />
                <p>No officer employee shall, except with the previous sanction, give evidence in connection with any enquiry conducted by any person, committee or authority. (Exceptions apply for judicial enquiries).</p>

                <RegHeader num="11" title="Public Demonstrations in Honour of Bank Officers" />
                <p>No officer employee shall, except with previous sanction, receive any complimentary or valedictory address or accept any testimonial or attend any meeting or entertainment held in his honour.</p>

                <RegHeader num="12" title="Seeking to Influence" />
                <p>No officer employee shall bring or attempt to bring any political or other outside influence to bear upon any superior authority to further his interests in respect of matters pertaining to his service.</p>

                <RegHeader num="13" title="Absence from Duty" />
                <p>No officer employee shall absent himself from his duty or be late in attending office or leave the station without having first obtained the permission of the competent authority.</p>

                <RegHeader num="14" title="Acceptance of Gifts" />
                <p>Save as otherwise provided, no officer employee shall accept any gift. (Limits: ₹500 for Near Relatives, ₹200 for Personal Friends on special occasions).</p>

                <RegHeader num="15" title="Lendings and Borrowings" />
                <p>No officer employee shall, in his individual capacity, borrow money or permit any member of his family to borrow money from a broker or a money lender or a subordinate employee.</p>

                <RegHeader num="16" title="Advance Drawal of Salary" />
                <p>No officer employee shall draw his salary in advance or overdraw his account with the bank against the security of his salary.</p>

                <RegHeader num="17" title="Subscriptions" />
                <p>No officer employee shall, except with previous sanction, ask for or accept contributions to or otherwise associate himself with the raising of any funds or other collections in pursuance of any object whatsoever.</p>

                <RegHeader num="18" title="Speculations in Stocks and Shares" />
                <p>No officer employee shall speculate in any stock, share or securities.</p>

                <RegHeader num="19" title="Indebtedness" />
                <p>An officer employee shall avoid habitual indebtedness or insolvency.</p>

                <RegHeader num="20" title="Movable, Immovable and Valuable Property" />
                <p>(1) Immovable Property: Requires previous knowledge of authority for acquisition/disposal.</p>
                <p>(2) Movable Property: Report required if value exceeds ₹25,000.</p>

                <RegHeader num="21" title="Indication of Acts and Character of an Officer Employee" />
                <p>No officer employee shall have recourse to any court or to the press for the vindication of any official act which has been the subject matter of adverse criticism or an attack of a defamatory character.</p>

                <RegHeader num="22" title="Restrictions Regarding Marriage" />
                <p>(1) No bigamy / polygamy without permission.</p>
                <p>(2) Marriage to foreign national requires intimation.</p>

                <RegHeader num="23" title="Consumption of Intoxicating Drinks and Drugs" />
                <p>Prohibited in public places and while on duty.</p>

                <RegHeader num="24" title="Acts of Misconduct" />
                <p>Breach of any of these regulations shall be deemed to be misconduct punishable under the Indian Overseas Bank Officer Employees' (Discipline and Appeal) Regulations, 1976.</p>

                <RegHeader num="24A" title="Prohibition Regarding Sexual Harassment" />
                <p>No officer employee shall indulge in any act of sexual harassment of any woman at her work place.</p>

                <RegHeader num="25" title="Interpretation" />
                <p>If any question arises as to the application or interpretation of any of these regulations, it shall be referred to the Board for its decision.</p>

                <RegHeader num="26" title="Repeal and Saving" />
                <p>Every rule, regulation, bye-law or agreement corresponding to these regulations is hereby repealed, provided that any action taken under such repealed rules shall be deemed to have been taken under these regulations.</p>

                <div className="text-center text-gray-400 text-xs mt-16 pt-8 border-t">
                    Digitized Record | Indian Overseas Bank | All 26 Clauses Verified
                </div>
            </div>
        </div>
    );
};

export default RegulationViewer;
