const fs = require('fs').promises;
const path = require('path');
const hellowGustavo = require('./utils/hellow');
const readFile = require('./utils/extract');

async function readAllFiles() {
  try {
    // Get the relative path to the bucket folder
    const pastaBucket = path.join(__dirname, 'bucket');

    // Read the bucket folder
    const arquivos = await fs.readdir(pastaBucket);

    // Array to store the results of file readings
    const resultados = [];

    // Iterate over the list of files
    for (const arquivo of arquivos) {
      const filePath = path.join(pastaBucket, arquivo);

      try {
        // Read the file and store the result in the array
        const obj = await readFile(filePath);
        resultados.push(obj);
        //console.log('Result:', obj);
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
      }
    }

    return resultados; // Return the array of results
  } catch (err) {
    console.error('Error reading folder:', err);
    throw err; // Throw the error to handle it outside the function if needed
  }
}

module.exports.handler = async (event) => {

  var res = await readAllFiles();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: res,
        // input: event,
      },
      null,
      2
    ),
  };
};
