"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
class BooleanLiteral extends Computable_1.default {
    constructor(match) {
        super(match);
        const text = match[0];
        this.value = new RawValue_1.default(text == "T" ? 1 : 0);
    }
    evaluate(args) {
        return this.value;
    }
}
BooleanLiteral.matchExpression = /B(T|F)/g; // Matches any number
BooleanLiteral.precedence = 2;
BooleanLiteral.numParameters = 0;
exports.default = BooleanLiteral;
