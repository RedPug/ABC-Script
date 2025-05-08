"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
const VariableStack_1 = __importDefault(require("structures/VariableStack"));
class SetVariableFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        const value = args[0].evaluate([]).getValue();
        VariableStack_1.default.instance.setVariable(this.match[0], value);
        return new RawValue_1.default(-1);
    }
}
SetVariableFunction.matchExpression = /S([a-z]+)/g;
SetVariableFunction.precedence = 1;
SetVariableFunction.isExpandable = true;
SetVariableFunction.numParameters = 1;
exports.default = SetVariableFunction;
