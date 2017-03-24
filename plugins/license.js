const fs = require('fs');
const path = require('path');

module.exports = function license(licenseSPDX) {
  const licensePath = path.join(__dirname, 'licenses', `${licenseSPDX.toUpperCase()}.md`);
  if (fs.existsSync(licensePath)) {
    return {
      files: {
        'LICENSE.md': licensePath
      }
    };
  }
  return { };
};

module.exports.files = {
  'LICENSE.md': path.join(__dirname, 'licenses', 'ISC.md')
};
