"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Computable {
    constructor(match) {
        this.match = match;
    }
    toString() {
        return `{${this.constructor.name}: ${this.match}}`;
    }
    static findMatch(input) {
        const match = this.matchExpression.exec(input);
        return match ?? null;
    }
}
Computable.precedence = 0; // Default precedence
Computable.isExpandable = false; //Whether the expression takes a parameter when defined
Computable.numParameters = 0; // Default number of parameters
exports.default = Computable;
