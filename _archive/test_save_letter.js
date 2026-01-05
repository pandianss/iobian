const https = require('http'); // actually http for localhost
const http = require('http');

const data = JSON.stringify({
    name: "Test User API",
    rollNo: "99999",
    designation: "Manager",
    sol: "0174",
    gender: "Male",
    joiningDate: "1990-01-01",
    retirementDate: "2025-12-31",
    regionCode: "3933"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/retirement-letters',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', responseData);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
