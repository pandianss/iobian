const persistence = require('./server/persistence');
const data = persistence.loadData();
console.log(JSON.stringify(data.departments, null, 2));
