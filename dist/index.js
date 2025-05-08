"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Interpereter_1 = __importDefault(require("Interpereter"));
const Parser_1 = __importDefault(require("Parser"));
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
const interpereter = new Interpereter_1.default();
(0, Parser_1.default)(fileContent);
const result = interpereter.interpret();
// const parser = new Parser
// console.log(`Exit with Message: ${result}`);
