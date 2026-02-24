var fs = require('fs');
console.log(JSON.parse(fs.readFileSync('./.github/workflows/build.json', 'utf8')).includes.join(" "));