"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
const VariableStack_1 = __importDefault(require("structures/VariableStack"));
class PopFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        // parse(args[0].evaluate([]).getValue() as string);
        VariableStack_1.default.instance.pop();
        return new RawValue_1.default(-1);
    }
}
PopFunction.matchExpression = /POP/g;
PopFunction.precedence = 3;
PopFunction.numParameters = 0;
exports.default = PopFunction;
