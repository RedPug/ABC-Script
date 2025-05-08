"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
class MultiplicationFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        const a = args[0].evaluate([]).getValue();
        const b = args[1].evaluate([]).getValue();
        return new RawValue_1.default(a * b);
    }
}
MultiplicationFunction.matchExpression = /X/g;
MultiplicationFunction.precedence = 1;
MultiplicationFunction.numParameters = 2;
exports.default = MultiplicationFunction;
