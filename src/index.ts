import * as fs from 'fs';
import * as path from 'path';
import Interpereter from 'Interpereter';
import parse from 'Parser';

// console.log('Hello, world!');
// console.log('This is a test script for the ABC interpreter.');

const inputFilePath = path.join(__dirname, '../test_scripts/test.abc');

// Read the file synchronously
const fileContent = fs.readFileSync(inputFilePath, 'utf-8');

// console.log(`File content:\n${fileContent}`);

// // Process character by character
// for (let i = 0; i < fileContent.length; i++) {
//     const char = fileContent[i];
//     // Do something with each character
//     console.log(`char[${i}]: '${char}' (code: ${char.charCodeAt(0)})`);
// }

const interpereter = new Interpereter();
parse(fileContent);
const result = interpereter.interpret();

// const parser = new Parser
// console.log(`Exit with Message: ${result}`);