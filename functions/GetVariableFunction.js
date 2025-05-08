"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
const VariableStack_1 = __importDefault(require("structures/VariableStack"));
class GetVariableFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        const value = VariableStack_1.default.instance.getVariable(this.match[0]);
        return new RawValue_1.default(value);
    }
}
GetVariableFunction.matchExpression = /G([a-z]+)/g;
GetVariableFunction.precedence = 1;
GetVariableFunction.isExpandable = true;
GetVariableFunction.numParameters = 0;
exports.default = GetVariableFunction;
