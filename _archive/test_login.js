
const http = require('http');

const data = JSON.stringify({
    roll_number: '59111',
    password: 'any'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        try {
            const json = JSON.parse(body);
            console.log('User Role:', json.user.role);
            console.log('Full Response:', JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('Raw Response:', body);
        }
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();
