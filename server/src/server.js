const app = require('./app');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`
  ==========================================
  IOBİan Platform Server v2.0
  ==========================================
  🚀 Environment: ${process.env.NODE_ENV || 'development'}
  📡 Port: ${PORT}
  📁 Data Dir: ${path.resolve(__dirname, '../../data')}
  ==========================================
  `);
});

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('Stopping server...');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});
