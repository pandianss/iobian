/**
 * Indian Overseas Bank Officer Employees' (Conduct) Regulations, 1976
 * Machine-Readable Instructions (JavaScript Implementation)
 * Ported from C++ implementation.
 */

export const ActionStatus = {
    ALLOWED: 'ALLOWED',
    PROHIBITED: 'PROHIBITED',
    SANCTION_REQUIRED: 'SANCTION_REQUIRED', // Requires prior permission
    REPORT_REQUIRED: 'REPORT_REQUIRED',     // Requires reporting after the fact
    INTIMATION_REQUIRED: 'INTIMATION_REQUIRED',
    WRITTEN_CONFIRMATION_NEEDED: 'WRITTEN_CONFIRMATION_NEEDED',
    CHECK_REGULATIONS: 'CHECK_REGULATIONS'
};

export const EmployeeRole = {
    CHAIRMAN: 'CHAIRMAN',
    MANAGING_DIRECTOR: 'MANAGING_DIRECTOR',
    WHOLE_TIME_DIRECTOR: 'WHOLE_TIME_DIRECTOR',
    OFFICER_EMPLOYEE: 'OFFICER_EMPLOYEE',
    AWARD_STAFF: 'AWARD_STAFF',
    CASUAL_EMPLOYEE: 'CASUAL_EMPLOYEE'
};

export class IOBConductRegulations {
    constructor(role) {
        this.currentRole = role;

        // Monetary Limits defined in Regulation 14 and 20
        this.GIFT_LIMIT_RELATIVE = 500.0;
        this.GIFT_LIMIT_FRIEND = 200.0;
        this.GIFT_LIMIT_OTHER = 75.0;
        this.AGGREGATE_GIFT_LIMIT = 500.0;
        this.MOVABLE_PROPERTY_LIMIT = 25000.0;
    }

    /**
     * Regulation 1(3): Application
     * Determines if regulations apply to the specific employee.
     */
    isApplicable() {
        // Regulations do not apply to Chairman, MD, WholeTime Director, Casuals, or Award Staff.
        if (this.currentRole === EmployeeRole.CHAIRMAN ||
            this.currentRole === EmployeeRole.MANAGING_DIRECTOR ||
            this.currentRole === EmployeeRole.WHOLE_TIME_DIRECTOR ||
            this.currentRole === EmployeeRole.CASUAL_EMPLOYEE ||
            this.currentRole === EmployeeRole.AWARD_STAFF) {
            return false;
        }
        return true; // Applies to Officer Employees.
    }

    /**
     * Regulation 3: General Conduct
     */
    checkGeneralConduct(isUnbecoming, isOralInstruction) {
        // Do nothing unbecoming of an officer employee.
        if (isUnbecoming) return ActionStatus.PROHIBITED;

        // Performance of duties under oral direction requires written confirmation.
        if (isOralInstruction) return ActionStatus.WRITTEN_CONFIRMATION_NEEDED;

        return ActionStatus.ALLOWED;
    }

    /**
     * Regulation 4: Observance of Secrecy
     */
    checkSecrecy(isConfidential, compelledByLaw, instructedBySuperior) {
        // Divulging confidential info is prohibited generally.
        if (isConfidential) {
            // Exceptions: Compelled by judicial authority or instructed by superior.
            if (compelledByLaw || instructedBySuperior) {
                return ActionStatus.ALLOWED;
            }
            return ActionStatus.PROHIBITED;
        }
        return ActionStatus.ALLOWED;
    }

    /**
     * Regulation 5: Employment of Family Members
     */
    checkFamilyEmployment(usingInfluence, firmHasOfficialDealings) {
        // Using influence to secure employment.
        if (usingInfluence) return ActionStatus.PROHIBITED;

        // Family accepting employment in firm with official dealings.
        if (firmHasOfficialDealings) {
            // Note: If urgent, can be accepted provisionally but reported within 3 months.
            return ActionStatus.SANCTION_REQUIRED;
        }
        return ActionStatus.ALLOWED;
    }

    /**
     * Regulation 6: Taking up Outside Employment
     */
    checkOutsideEmployment(activityType, isRemunerated) {
        // General prohibition on trade/business/employment.
        if (['Trade', 'Business', 'OtherEmployment'].includes(activityType)) {
            return ActionStatus.SANCTION_REQUIRED;
        }

        // Insurance Agency canvassing.
        if (activityType === 'InsuranceAgency') {
            return ActionStatus.PROHIBITED;
        }

        // Honorary social/charitable/literary work.
        if (['Social', 'Literary', 'Scientific'].includes(activityType)) {
            return ActionStatus.ALLOWED; // Unless directed otherwise.
        }

        // Acceptance of Fee/Remuneration.
        if (isRemunerated) return ActionStatus.SANCTION_REQUIRED;

        return ActionStatus.SANCTION_REQUIRED;
    }

    /**
     * Regulation 7: Contribution to Newspapers, Radio, etc.
     */
    checkMediaParticipation(contentType, isManagement) {
        // Editing or managing a newspaper.
        if (isManagement) return ActionStatus.SANCTION_REQUIRED;

        // Proviso: Literary, artistic, scientific content.
        if (['Literary', 'Scientific', 'Cultural'].includes(contentType)) {
            return ActionStatus.ALLOWED;
        }

        // General broadcasts or publications.
        return ActionStatus.SANCTION_REQUIRED;
    }

    /**
     * Regulation 14: Acceptance of Gifts
     * @param {string} source - 'Dowry', 'NearRelative', 'PersonalFriend', 'Other'
     * @param {number} value - Value of the gift
     * @param {string} occasion - 'Marriage', 'Religious', 'Other'
     */
    processGift(source, value, occasion) {
        // Dowry.
        if (source === 'Dowry') return ActionStatus.PROHIBITED;

        // Near Relatives on special occasions (Marriage, etc.).
        if (source === 'NearRelative' && (occasion === 'Marriage' || occasion === 'Religious')) {
            if (value > this.GIFT_LIMIT_RELATIVE) return ActionStatus.REPORT_REQUIRED; // > 500
            return ActionStatus.ALLOWED;
        }

        // Personal Friends (no official dealings) on special occasions.
        if (source === 'PersonalFriend' && (occasion === 'Marriage' || occasion === 'Religious')) {
            if (value > this.GIFT_LIMIT_FRIEND) return ActionStatus.REPORT_REQUIRED; // > 200
            return ActionStatus.ALLOWED;
        }

        // Other cases.
        if (value > this.GIFT_LIMIT_OTHER) return ActionStatus.SANCTION_REQUIRED; // > 75

        return ActionStatus.ALLOWED;
    }

    /**
     * Regulation 15 & 18: Financial Dealings
     */
    checkFinancialDealings(action, entityType) {
        // Lending money to a bank constituent.
        if (action === 'Lending' && entityType === 'Constituent') return ActionStatus.PROHIBITED;

        // Guaranteeing pecuniary obligations of others.
        if (action === 'Guarantee') return ActionStatus.SANCTION_REQUIRED;

        // Speculation in stocks/shares.
        if (action === 'Speculation') return ActionStatus.PROHIBITED;

        // Bonafide investment.
        if (action === 'Investment') return ActionStatus.ALLOWED;

        return ActionStatus.CHECK_REGULATIONS;
    }

    /**
     * Regulation 20: Movable, Immovable and Valuable Property
     */
    manageProperty(propertyType, value, hasOfficialDealings, isReputedDealer) {

        // Transaction with person having official dealings or non-reputed dealer.
        if (hasOfficialDealings || !isReputedDealer) {
            return ActionStatus.SANCTION_REQUIRED;
        }

        // Immovable Property (Acquire/Dispose).
        if (propertyType === 'Immovable') {
            return ActionStatus.INTIMATION_REQUIRED; // "Previous knowledge" required.
        }

        // Movable Property limits.
        if (propertyType === 'Movable') {
            if (value > this.MOVABLE_PROPERTY_LIMIT) { // > 25,000
                return ActionStatus.REPORT_REQUIRED;
            }
        }

        return ActionStatus.ALLOWED;
    }

    /**
     * Regulation 22: Restrictions Regarding Marriage
     */
    checkMarriage(spouseLiving, spouseNationality) {
        // Bigamy (Spouse living).
        if (spouseLiving) return ActionStatus.PROHIBITED; // Unless permitted by law/bank.

        // Marriage to non-Indian national.
        if (spouseNationality !== 'Indian') return ActionStatus.INTIMATION_REQUIRED;

        return ActionStatus.ALLOWED;
    }

    /**
     * Regulation 23: Consumption of Intoxicating Drinks/Drugs
     */
    checkSubstanceUse(location, onDuty) {
        // Under influence on duty.
        if (onDuty) return ActionStatus.PROHIBITED;

        // Public place consumption.
        if (location === 'PublicPlace') return ActionStatus.PROHIBITED;

        return ActionStatus.ALLOWED;
    }

    /**
     * Regulation 24A: Sexual Harassment
     */
    checkSexualHarassment() {
        // Strictly prohibited.
        return ActionStatus.PROHIBITED;
    }
}
