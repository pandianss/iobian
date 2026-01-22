module.exports = {
    users: [
        {
            user_id: 1,
            roll_number: '00000',
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
            linked_region_code: 'R01',
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
        },
        {
            branch_code: '0232',
            branch_name: 'Madurai Main',
            branch_type: 'Branch',
            region_code: 'R05',
            state: 'Tamil Nadu',
            is_deleted: false
        },
        {
            branch_code: '0243',
            branch_name: 'Trichy Road',
            branch_type: 'Branch',
            region_code: 'R05',
            state: 'Tamil Nadu',
            is_deleted: false
        },
        {
            branch_code: '0883',
            branch_name: 'Coimbatore Civil',
            branch_type: 'Branch',
            region_code: 'R05',
            state: 'Tamil Nadu',
            is_deleted: false
        }
    ],
    regions: [
        {
            region_code: 'R01',
            region_name: 'Chennai Region',
            region_name_hindi: 'चेन्नई क्षेत्र',
            region_name_local: 'சென்னை மண்டலம்',
            region_address: 'IOB Chennai Regional Office, Anna Salai, Chennai - 600002',
            region_address_hindi: 'इओबी चेन्नई क्षेत्रीय कार्यालय, अन्ना सलै, चेन्नई - 600002',
            region_address_local: 'ஐஓபி சென்னை மண்டல அலுவலகம், அண்ணா சாலை, சென்னை - 600002',
            head_office_code: 'CO',
            is_deleted: false
        },
        {
            region_code: 'R02',
            region_name: 'Mumbai Region',
            region_name_hindi: 'मुंबई क्षेत्र',
            region_name_local: 'மும்பை மண்டலம்',
            region_address: 'IOB Mumbai Regional Office, Nariman Point, Mumbai - 400021',
            region_address_hindi: 'इओबी मुंबई क्षेत्रीय कार्यालय, नरीमन पॉइंट, मुंबई - 400021',
            region_address_local: 'ஐஓபி மும்பை மண்டல அலுவலகம், நரிமன் பாயிண்ட், மும்பை - 400021',
            head_office_code: 'CO',
            is_deleted: false
        },
        {
            region_code: 'R05',
            region_name: 'Dindigul Region',
            region_name_hindi: 'डिंडीगुल क्षेत्र',
            region_name_local: 'திண்டுக்கல் மண்டலம்',
            region_address: '#17-i, First Floor, Pensioners Street, Palani Road, Dindigul – 624001',
            region_address_hindi: '#17-i, पहली मंजिल, पेंशनर्स स्ट्रीट, पलानी रोड, डिंडीगुल - 624001',
            region_address_local: '#17-i, முதல் தளம், ஓய்வூதியதாரர் தெரு, பழனி சாலை, திண்டுக்கல் – 624001',
            head_office_code: 'CO',
            is_deleted: false
        }
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
        { id: 1, title: 'Customer Service Associate', workclass: 60 },
        { id: 2, title: 'Assistant Manager', workclass: 150 },
        { id: 3, title: 'Manager', workclass: 200 },
        { id: 4, title: 'Senior Manager', workclass: 250 },
        { id: 5, title: 'Chief Manager', workclass: 300 },
        { id: 6, title: 'Assistant General Manager', workclass: 350 },
        { id: 7, title: 'Senior Regional Manager', workclass: 400 },
        { id: 8, title: 'Chief Regional Manager', workclass: 450 },
        { id: 9, title: 'General Manager', workclass: 500 }
    ],
    // --- Planning Dept ---
    branch_surveys: []
};
