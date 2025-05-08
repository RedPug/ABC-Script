"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComputationStack {
    constructor() {
        this.elements = [];
    }
    //Adds an element to the beginning of the array.
    addElement(element) {
        this.elements.unshift(element);
    }
    evaluate() {
        for (const element of this.elements) {
            element.evaluate([]);
        }
    }
    toString() {
        let output = "ComputationStack: {\n";
        for (const element of this.elements) {
            output += `  ${element.toString()}\n`;
        }
        output += "}";
        return output;
    }
}
ComputationStack.instance = new ComputationStack();
exports.default = ComputationStack;
