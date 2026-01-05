const persistence = require('./server/persistence');
const fs = require('fs');
const path = require('path');

const log = (msg) => {
    try {
        fs.appendFileSync('verify_output.txt', msg + '\n');
    } catch (e) { console.error(e); }
};

try {
    fs.writeFileSync('verify_output.txt', ''); // Clear file
    const data = persistence.loadData();
    log("Loaded Data Keys: " + Object.keys(data).join(', '));

    if (data.orgMaster) {
        log("OrgMaster Count: " + data.orgMaster.length);
        const dindigulBranches = data.orgMaster.filter(b => String(b.region_code) === '3933');
        log("Total Dindigul Branches (3933): " + dindigulBranches.length);

        const activeVar = dindigulBranches.filter(b => !b.is_deleted);
        log("Active Dindigul Branches: " + activeVar.length);

        const branch3165 = data.orgMaster.find(b => b.branch_code === '3165');
        log("Branch 3165: " + JSON.stringify(branch3165));

        const branch0174 = data.orgMaster.find(b => b.branch_code === '0174');
        log("Branch 0174: " + JSON.stringify(branch0174));
    } else {
        log("No orgMaster key found.");
    }

    if (data.branches) {
        log("Branches Key Exists! Count: " + data.branches.length);
    } else {
        log("Branches Key DOES NOT exist.");
    }

} catch (err) {
    log("Verification Error: " + err);
}
