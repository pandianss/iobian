const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', '..', '..', 'client', 'public', 'uploads', 'staff');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `staff-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

router.post('/photo', upload.single('photo'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file' });
    res.json({ success: true, url: `/uploads/staff/${req.file.filename}` });
});

module.exports = router;
