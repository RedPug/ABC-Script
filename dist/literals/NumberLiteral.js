"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
class NumberLiteral extends Computable_1.default {
    constructor(match) {
        super(match);
        const numString = match[0];
        let value = 0;
        for (let i = 0; i < numString.length; i++) {
            const char = numString.charCodeAt(i) - 'a'.charCodeAt(0) + 1;
            value = value * 26 + char;
        }
        this.value = new RawValue_1.default(value);
    }
    evaluate(args) {
        return this.value;
    }
}
NumberLiteral.matchExpression = /N([a-z]*)/g; // Matches any number
NumberLiteral.precedence = 1;
NumberLiteral.isExpandable = true;
NumberLiteral.numParameters = 0;
exports.default = NumberLiteral;
