"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runABC = runABC;
const Interpereter_1 = __importDefault(require("Interpereter"));
const Parser_1 = __importDefault(require("Parser"));
// console.log('Hello, world!');
// console.log('This is a test script for the ABC interpreter.');
// const inputFilePath = path.join(__dirname, '../test_scripts/test.abc');
// // Read the file synchronously
// const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
// // console.log(`File content:\n${fileContent}`);
// // // Process character by character
// // for (let i = 0; i < fileContent.length; i++) {
// //     const char = fileContent[i];
// //     // Do something with each character
// //     console.log(`char[${i}]: '${char}' (code: ${char.charCodeAt(0)})`);
// // }
const interpereter = new Interpereter_1.default();
// parse(fileContent);
// const result = interpereter.interpret();
function runABC(code) {
    interpereter.reset();
    (0, Parser_1.default)(code);
    const result = interpereter.interpret();
    return result;
}
// Attach the function to the global scope for the HTML to use
window.runCode = () => {
    const code = document.getElementById("codeInput").value;
    const output = runABC(code);
    document.getElementById("output").textContent = output;
};
// const parser = new Parser
// console.log(`Exit with Message: ${result}`);
