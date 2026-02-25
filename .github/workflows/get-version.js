var fs = require('fs');
console.log(JSON.parse(fs.readFileSync('wtrpg-complete-compendium/module.json', 'utf8')).version);