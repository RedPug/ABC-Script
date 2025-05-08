"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
class SubtractionFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        const a = args[0].evaluate([]).getValue();
        const b = args[1].evaluate([]).getValue();
        return new RawValue_1.default(a - b);
    }
}
SubtractionFunction.matchExpression = /S/g;
SubtractionFunction.precedence = 1;
SubtractionFunction.numParameters = 2;
exports.default = SubtractionFunction;
