const fs = require('fs');
const http = require('http');

http.get('http://localhost:5000/api/pms/bulk-deposit', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.data && json.data.length > 0) {
                const first = json.data[0];
                let out = 'Use First Record\n';
                out += 'KEYS: ' + JSON.stringify(Object.keys(first)) + '\n';
                out += 'FULL RECORD:\n' + JSON.stringify(first, null, 2);

                fs.writeFileSync('debug_bulk_output.txt', out);
                console.log('Written to debug_bulk_output.txt');
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
