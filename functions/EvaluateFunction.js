"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = __importDefault(require("Parser"));
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
class EvaluateFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        (0, Parser_1.default)(args[0].evaluate([]).getValue());
        return new RawValue_1.default(-1);
    }
}
EvaluateFunction.matchExpression = /EVAL/g;
EvaluateFunction.precedence = 4;
EvaluateFunction.numParameters = 1;
exports.default = EvaluateFunction;
