const path = require('path');

const readFile = require('../utils/extract'); 

describe('readFile', () => {

    const example_txt_path = path.join(__dirname, 'example_txt.txt');
    const example_pdf_path = path.join(__dirname, 'example_pdf.pdf');
    const example_docx_path = path.join(__dirname, 'example_docx.docx');

    it('should read a .txt text file', async () => {
        const result = await readFile(example_txt_path);
        expect(result.filename).toEqual('example_txt.txt');
        expect(result.content).toContain('Hello, I am an example of a TXT file');
    });

    it('should read a .pdf text file', async () => {
        const result = await readFile(example_pdf_path);
        expect(result.filename).toEqual('example_pdf.pdf');
        expect(result.content).toContain('Hello, I am an example of a PDF file');
    });

    it('should read a .docx text file', async () => {
        const result = await readFile(example_docx_path);
        expect(result.filename).toEqual('example_docx.docx');
        expect(result.content).toContain('Hello, I am an example of a docx file');
    });
    
    const example_csv_path = path.join(__dirname, 'example_csv.csv');

    it('should throw an error if the file does not exist', async () => {
        await expect(readFile('not_exist.txt')).rejects.toThrow('File not_exist.txt does not exist.');
    });

    it('should throw an error if the file extension is not supported', async () => {
        await expect(readFile(example_csv_path)).rejects.toThrow('Extencion .csv is not supported. Please use .txt, .pdf or .docx files.');
    });

});