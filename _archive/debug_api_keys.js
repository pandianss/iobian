const fs = require('fs');
const http = require('http');

http.get('http://localhost:5000/api/pms/key-params', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.data && json.data.length > 0) {
                const target = json.data.find(d => String(d['Branch Code']) === '174' || String(d['Branch Code']) === '0174');
                let out = '';
                if (target) {
                    out += 'Use Target 174\n';
                    out += 'KEYS: ' + JSON.stringify(Object.keys(target)) + '\n';
                    out += `Branch Code: ${target['Branch Code']} Type: ${typeof target['Branch Code']}\n`;
                    out += `Savings Bank: "${target['Savings Bank']}" Type: ${typeof target['Savings Bank']}\n`;
                    out += 'FULL RECORD:\n' + JSON.stringify(target, null, 2);
                } else {
                    out += 'Branch 174 not found in data. First record:\n' + JSON.stringify(json.data[0], null, 2);
                }
                fs.writeFileSync('debug_output_full.txt', out);
                console.log('Written to debug_output_full.txt');
            } else {
                console.log('No data found');
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });
}).on('error', err => {
    console.error('Error fetching data:', err);
});
