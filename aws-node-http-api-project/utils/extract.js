const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

function readTxt(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

async function readPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`Error to read PDF file: ${error.message}`);
  }
}

function readDOCX(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  return mammoth.extractRawText({ buffer: dataBuffer }).then((result) => result.value);
}

async function readFile(filePath) {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${filePath} does not exist.`);
  }
  
  // Get the file extension
  const extname = path.extname(filePath).toLowerCase();

  // Map of supported file extensions and read functions
  const readFunctionMap = {
    '.txt': readTxt,
    '.pdf': readPDF,
    '.docx': readDOCX,
  };

  // Verify if the file extension is supported
  if (extname in readFunctionMap) {
    // Return object with file name and content
    return {
      filename: path.basename(filePath),
      content: await readFunctionMap[extname](filePath),
    };
  } else {
    throw new Error(`Extencion ${extname} is not supported. Please use .txt, .pdf or .docx files.`);
  }
}

module.exports = readFile