const fs = require('fs');
const path = require('path');
const hellowGustavo = require('./utils/hellow');
const readFile = require('./utils/extract');

function readAllFiles() {
// get relative path to bucket folder
const pastaBucket = path.join(__dirname, 'bucket');

// read the bucket folder
fs.readdir(pastaBucket, (err, arquivos) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Iterates over the list of files
  arquivos.forEach((arquivo) => {
    const filePath = path.join(pastaBucket, arquivo);

    readFile(filePath)
      .then((obj) => {
        console.log('Result:', obj);
      })
      .catch((error) => {
        console.error(`Error to read file ${filePath}:`, error.message);
      });

  });
});
}

module.exports.handler = async (event) => {

  var res = readAllFiles();

  // if res null, retrun 'ola'
  var res = res || 'ola';

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'res',
        // input: event,
      },
      null,
      2
    ),
  };
};
