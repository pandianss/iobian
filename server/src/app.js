const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const persistence = require('./persistence');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Request Logging Middleware (Audit Trace)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Routes
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/branches', require('./routes/branches'));
app.use('/api/regions', require('./routes/regions'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/pms', require('./routes/pms'));
app.use('/api/public', require('./routes/public'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/config', require('./routes/config'));
app.use('/api/upload', require('./routes/uploads'));

// PDF Generation Route (v1)
const pdfService = require('./services/pdfService');
app.post('/api/v1/generate-pdf', async (req, res) => {
    try {
        const { html } = req.body;
        if (!html) return res.status(400).json({ success: false, message: 'HTML required' });
        const buffer = await pdfService.generatePDF(html);
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': buffer.length });
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ success: false, message: 'PDF failed' });
    }
});

app.get('/health', (req, res) => res.json({ status: 'UP', timestamp: new Date() }));

module.exports = app;
