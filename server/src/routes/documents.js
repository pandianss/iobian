const express = require('express');
const router = express.Router();
const persistence = require('../persistence');
const { v4: uuidv4 } = require('uuid');

const generateDocRefNo = (type, db) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    let fy;
    if (currentMonth >= 3) { fy = `${currentYear}-${(currentYear + 1).toString().slice(-2)}`; }
    else { fy = `${currentYear - 1}-${currentYear.toString().slice(-2)}`; }
    const prefix = 'IOB/PLN';
    const typeMapping = {
        'office_note': 'NOTE',
        'branch_code_request': 'BCR',
        'branch_survey': 'BSR',
        'joining_offer': 'JOL',
        'communication': 'HUB',
        'letter': 'LTR',
        'circular': 'CIR'
    };
    let typeCode = typeMapping[type] || 'DOC';
    if (!db.documents) db.documents = [];
    const pattern = `${prefix}/${typeCode}/${fy}/`;
    const existing = db.documents.filter(d => d.refNo && d.refNo.startsWith(pattern) && !d.is_deleted);
    let maxSeq = 0;
    existing.forEach(d => {
        const parts = d.refNo.split('/');
        const seq = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
    });
    return `${pattern}${(maxSeq + 1).toString().padStart(3, '0')}`;
};

router.get('/', (req, res) => {
    const mockData = persistence.loadData();
    const docs = (mockData.documents || [])
        .filter(d => !d.is_deleted)
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    res.json(docs);
});

router.post('/', (req, res) => {
    const mockData = persistence.loadData();
    const { category, type, subject, content, formData, status } = req.body;
    const refNo = generateDocRefNo(category, mockData);
    const newDoc = {
        id: uuidv4(),
        refNo,
        category,
        type,
        subject,
        content,
        formData,
        status: status || 'Draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        is_deleted: false
    };
    mockData.documents.push(newDoc);
    persistence.saveData(mockData);
    res.json({ success: true, document: newDoc });
});

module.exports = router;
