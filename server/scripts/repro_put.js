// Native fetch used

async function testPut() {
    console.log('Testing PUT /api/regions/3933 (Dindigul)...');

    const payload = {
        region_code: '3933',
        region_name: 'Dindigul Region',
        region_name_hindi: 'दिण्डुक्कल',
        region_name_local: 'திண்டுக்கல்',
        region_address: 'Plot No. 12, Main Road',
        region_address_hindi: 'प्लॉट नंबर 12, मेन रोड',
        region_address_local: 'பிளாட் எண் 12, மெயின் ரோடு'
    };

    try {
        const res = await fetch('http://localhost:5000/api/regions/3933', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log('PUT Response:', JSON.stringify(data, null, 2));

        if (!data.success) {
            console.error('PUT Failed');
            return;
        }

        console.log('Verifying with GET...');
        const getRes = await fetch('http://localhost:5000/api/regions');
        const regions = await getRes.json();
        const dindigul = regions.find(r => r.region_code === '3933');

        console.log('Fetched Region:', JSON.stringify(dindigul, null, 2));

        if (dindigul.region_name_local === 'திண்டுக்கல்' && dindigul.region_address_local === 'பிளாட் எண் 12, மெயின் ரோடு') {
            console.log('✓ SUCCESS: Trilingual fields saved and retrieved correctly!');
        } else {
            console.log('✗ FAILURE: Fields did not match.');
            console.log('Expected local name: திண்டுக்கல், got:', dindigul.region_name_local);
            console.log('Expected local address: பிளாட் எண் 12, மெயின் ரோடு, got:', dindigul.region_address_local);
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

testPut();
