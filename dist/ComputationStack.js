"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComputationStack {
    constructor() {
        this.elements = [];
    }
    addElement(element) {
        this.elements.push(element);
    }
    evaluate() {
        for (const element of this.elements) {
            element.evaluate([]);
        }
    }
}
exports.default = ComputationStack;
