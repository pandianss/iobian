module.exports = {
    users: [
        {
            user_id: 1,
            roll_number: '1000',
            password_hash: 'pass',
            role: 'SuperAdmin',
            office_level: 'CO',
            full_name: 'Super Administrator',
            designation: 'General Manager',
            mobile: '9876543210',
            departments: [],
            is_deleted: false
        },
        {
            user_id: 2,
            roll_number: '2001',
            password_hash: 'pass',
            role: 'Branch',
            office_level: 'Branch',
            linked_branch_code: 'B001',
            full_name: 'Amit Sharma',
            designation: 'Senior Manager',
            mobile: '9876543211',
            departments: [],
            is_deleted: false
        },
        {
            user_id: 3,
            roll_number: '3005',
            password_hash: 'pass',
            role: 'RO',
            office_level: 'RO',
            full_name: 'Sarah Jenkins',
            designation: 'Chief Manager',
            is_deleted: false
        },
        {
            user_id: 4,
            roll_number: '4001',
            password_hash: 'pass',
            role: 'CO_HRD',
            office_level: 'CO',
            full_name: 'Planning Dept Head',
            departments: [1, 2],
            is_deleted: false
        },
        {
            user_id: 99,
            roll_number: '9999',
            password_hash: 'pass',
            role: 'Branch',
            full_name: 'Deleted User',
            is_deleted: true
        }
    ],
    orgMaster: [
        {
            branch_code: '0174',
            branch_name: 'Theni Allinagaram',
            branch_type: 'Branch',
            category: 'SEMI URBAN',
            region_code: 'R01',
            state: 'Tamil Nadu',
            district: 'Theni',
            taluk: 'Theni',
            revenue_centre: 'Theni',
            locality: 'Allinagaram',
            latitude: '10.009971',
            longitude: '77.478241',
            pincode: '625531',
            is_deleted: false
        }
    ],
    regions: [
        { region_code: 'R01', region_name: 'Chennai Region', region_name_hindi: 'चेन्नई क्षेत्र', head_office_code: 'CO', is_deleted: false },
        { region_code: 'R02', region_name: 'Mumbai Region', region_name_hindi: 'मुंबई क्षेत्र', head_office_code: 'CO', is_deleted: false }
    ],
    divisions: [
        { id: 1, name: 'Planning' },
        { id: 2, name: 'HRD' },
        { id: 3, name: 'IT' }
    ],
    systemConfig: {
        '--primary-color': '#0056b3',
        '--secondary-color': '#17a2b8',
        '--bg-color': '#f4f7f6',
        '--text-color': '#333333',
        '--header-height': '60px'
    },
    designations: [
        { id: 1, title: 'Customer Service Associate' },
        { id: 2, title: 'Assistant Manager' },
        { id: 3, title: 'Manager' },
        { id: 4, title: 'Senior Manager' },
        { id: 5, title: 'Chief Manager' },
        { id: 6, title: 'Assistant General Manager' },
        { id: 7, title: 'Senior Regional Manager' },
        { id: 8, title: 'Chief Regional Manager' },
        { id: 9, title: 'General Manager' }
    ]
};
