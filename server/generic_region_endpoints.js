// Generic Region Stats Endpoint
app.get('/api/public/region/:code/stats', (req, res) => {
    try {
        const regionCode = req.params.code;
        const region = mockData.regions.find(r => String(r.region_code) === String(regionCode));

        if (!region) {
            return res.status(404).json({ success: false, message: 'Region not found' });
        }

        // Branch Count
        const branches = mockData.orgMaster.filter(b => String(b.region_code) === String(regionCode) && !b.is_deleted);
        const branchCount = branches.length;

        // Staff Strength
        const branchCodes = branches.map(b => b.branch_code);
        const staff = mockData.users.filter(u =>
            !u.is_deleted &&
            (String(u.linked_region_code) === String(regionCode) || branchCodes.includes(u.linked_branch_code))
        );
        const staffStrength = staff.length;

        // Total Business (aggregate from all branches)
        let totalBusiness = 0;

        if (mockData.key_params && mockData.key_params.length > 0) {
            const regionRows = mockData.key_params.filter(row => {
                const regionName = row['Region Name'] || row['REGION NAME'] || '';
                return regionName.toLowerCase().includes(region.region_name.toLowerCase());
            });

            if (regionRows.length > 0) {
                totalBusiness = regionRows.reduce((sum, row) => {
                    const business = parseFloat(row['Business'] || row['BUSINESS'] || 0);
                    return sum + business;
                }, 0);

                if (!totalBusiness) {
                    totalBusiness = regionRows.reduce((sum, row) => {
                        const deposits = parseFloat(row['Deposits'] || row['DEPOSITS'] || 0);
                        const advances = parseFloat(row['Advances'] || row['ADVANCES'] || 0);
                        return sum + deposits + advances;
                    }, 0);
                }
            }
        }

        res.json({
            success: true,
            regionName: region.region_name,
            regionCode: region.region_code,
            stats: {
                totalBusiness: totalBusiness,
                branchCount: branchCount,
                staffStrength: staffStrength,
                nextReview: "Jan 10, '26"
            }
        });

    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch stats' });
    }
});

// Generic Region Organization Endpoint
app.get('/api/public/region/:code/org', (req, res) => {
    try {
        const regionCode = req.params.code;
        const region = mockData.regions.find(r => String(r.region_code) === String(regionCode));

        if (!region) {
            return res.status(404).json({ success: false, message: 'Region not found' });
        }

        // Hierarchy Order Map
        const designationOrder = {
            'General Manager': 1,
            'Chief Regional Manager': 2,
            'Senior Regional Manager': 3,
            'Assistant General Manager': 4,
            'Chief Manager': 5,
            'Senior Manager': 6,
            'Manager': 7,
            'Assistant Manager': 8,
            'Officer': 9,
            'Customer Service Associate': 10,
            'Clerk': 10,
            'Messenger': 11,
            'Sub-staff': 11
        };

        const getRank = (title) => designationOrder[title] || 100;

        const sortStaff = (list) => {
            return list.sort((a, b) => getRank(a.designation) - getRank(b.designation));
        };

        // 1. Get RO Staff
        let roStaff = mockData.users.filter(u =>
            !u.is_deleted &&
            String(u.linked_region_code) === String(regionCode) &&
            u.office_level === 'RO'
        );

        const head = roStaff.find(u => u.is_head);
        const team = sortStaff(roStaff.filter(u => !u.is_head));

        // 2. Get Branches for this Region
        const branches = mockData.orgMaster.filter(b =>
            String(b.region_code) === String(regionCode) &&
            !b.is_deleted
        );

        // 3. Get Staff for these Branches
        const branchCodes = branches.map(b => b.branch_code);
        const allBranchStaff = mockData.users.filter(u =>
            !u.is_deleted &&
            u.office_level !== 'RO' &&
            (branchCodes.includes(u.linked_branch_code) || String(u.linked_region_code) === String(regionCode))
        );

        const formatUser = (u, officeName) => {
            // Map department code to name
            let departmentName = null;
            if (u.departments && u.departments.length > 0) {
                const deptCode = String(u.departments[0]);
                const dept = mockData.departments.find(d => String(d.code) === deptCode);
                departmentName = dept ? dept.name : null;
            }

            return {
                full_name: u.full_name,
                designation: u.designation,
                department: departmentName,
                photo: u.photo_url || null,
                office: officeName || 'Branch Office',
                mobile: u.mobile || 'N/A',
                is_head: u.is_head
            };
        };

        // 4. Structure Data: Group Staff by Branch
        const branchHierarchy = branches.map(branch => {
            const staff = allBranchStaff.filter(u => u.linked_branch_code === branch.branch_code);
            const branchHead = staff.find(u => u.is_head);
            const branchTeam = sortStaff(staff.filter(u => !u.is_head));

            return {
                branch_code: branch.branch_code,
                branch_name: branch.branch_name,
                head: branchHead ? formatUser(branchHead, branch.branch_name) : null,
                team: branchTeam.map(u => formatUser(u, branch.branch_name))
            };
        }).sort((a, b) => a.branch_name.localeCompare(b.branch_name));

        res.json({
            success: true,
            regionName: region.region_name,
            regionCode: region.region_code,
            head: head ? formatUser(head, 'Regional Office') : null,
            team: team.map(u => formatUser(u, 'Regional Office')),
            branches: branchHierarchy
        });

    } catch (error) {
        console.error("Org Fetch Error:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch organization structure' });
    }
});
