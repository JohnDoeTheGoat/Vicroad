const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, '../index.html'), 'utf8');
const i = html.indexOf('dnJfbW90aW9uX3Blcm1pc3Npb24');
console.log(html.slice(i - 100, html.indexOf('</script>', i) + 9));
