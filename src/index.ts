import * as fs from 'fs';
import * as path from 'path';
import Interpereter from 'Interpereter';
import parse from 'Parser';

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

const interpereter = new Interpereter();
// parse(fileContent);
// const result = interpereter.interpret();

export function runABC(code: string): string {
    interpereter.reset();
    parse(code);
    const result = interpereter.interpret();
    return result;
}

// Attach the function to the global scope for the HTML to use
(window as any).runCode = () => {
    const code = (document.getElementById("codeInput") as HTMLTextAreaElement).value;
    const output = runABC(code);
    (document.getElementById("output") as HTMLElement).textContent = output;
};

// const parser = new Parser
// console.log(`Exit with Message: ${result}`);

const textarea = document.querySelector("textarea");

const insertTabCharacter = () => {
    const { value, selectionStart, selectionEnd } = textarea;

    // Insert tab character
    textarea.value = `${value.substring(0, selectionEnd)}\t${value.substring(selectionEnd)}`;

    // Move cursor to new position
    textarea.selectionStart = textarea.selectionEnd = selectionEnd + 1;
};

const insertNewLineWithIndentation = () => {
    const { value, selectionStart, selectionEnd } = textarea;

    // Get the current line's content up to the cursor
    const currentLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    const currentLine = value.substring(currentLineStart, selectionStart);

    // Count the leading spaces or tabs in the current line
    const leadingWhitespace = currentLine.match(/^\s*/)[0];

    // Replace tabs with 4 spaces in the leading whitespace
    const spaces = ' '.repeat(4);
    const adjustedWhitespace = leadingWhitespace.replace(/\t/g, spaces);

    // Insert a new line with the adjusted indentation (4 spaces)
    textarea.value = `${value.substring(0, selectionStart)}\n${adjustedWhitespace}${value.substring(selectionEnd)}`;

    // Move the cursor to the new position after the indentation
    const newCursorPosition = selectionStart + 1 + adjustedWhitespace.length;
    textarea.selectionStart = textarea.selectionEnd = newCursorPosition;
};

textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const { value, selectionStart, selectionEnd } = textarea;

        // Insert 4 spaces instead of a tab
        const spaces = ' '.repeat(4);
        textarea.value = `${value.substring(0, selectionStart)}${spaces}${value.substring(selectionEnd)}`;

        // Move cursor to new position after the spaces
        textarea.selectionStart = textarea.selectionEnd = selectionStart + spaces.length;
    } else if (e.key === 'Enter') {
        e.preventDefault();
        insertNewLineWithIndentation();
    }
});