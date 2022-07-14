const fs = require('fs');
const path = require('path');

/**
 * @function writeDataToFile
 * @param {string} fileName - file name with extension and its relative directory path
 * @param {array|object} content - the content to write into the file
 */
const writeDataToFile = (fileName, content) => {
  const file = path.resolve() + '/' + fileName;
  fs.writeFileSync(file, JSON.stringify(content), 'utf-8', (error) => {
    if (error) console.log('ERROR WHEN WRITING TO THE FILE >>>> ', error);
  });
};

/**
 * @function getRequestBody
 * @param {http.ClientRequest} req
 * @returns {promise} Promise
 */
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => body += chunk.toString());
      req.on('end', () => resolve(body));
    } catch (error) {
      console.log('ERROR ON GET REQUEST BODY >>>> ', error);
      reject(error);
    }
  });
};

module.exports = {
  writeDataToFile,
  getRequestBody,
};