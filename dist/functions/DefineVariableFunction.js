"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
const VariableStack_1 = __importDefault(require("structures/VariableStack"));
class DefineVariableFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        const value = args[0].evaluate([]).getValue();
        VariableStack_1.default.instance.defineLocalVariable(this.match[0], value);
        return new RawValue_1.default(-1);
    }
}
DefineVariableFunction.matchExpression = /D([a-z]+)/g;
DefineVariableFunction.precedence = 1;
DefineVariableFunction.isExpandable = true;
DefineVariableFunction.numParameters = 1;
exports.default = DefineVariableFunction;
