const fs = require('fs');
const path = require('path');

const writeDataToFile = (fileName, content) => {
  const file = path.resolve() + '/' + fileName;
  fs.writeFileSync(file, JSON.stringify(content), 'utf-8', (error) => {
    if (error) console.log('ERROR WHEN WRITING TO THE FILE >>>> ', error);
  });
};

module.exports = {
  writeDataToFile,
};