"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
const VariableStack_1 = __importDefault(require("structures/VariableStack"));
class PushFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        // parse(args[0].evaluate([]).getValue() as string);
        VariableStack_1.default.instance.push();
        return new RawValue_1.default(-1);
    }
}
PushFunction.matchExpression = /PUSH/g;
PushFunction.precedence = 4;
PushFunction.numParameters = 0;
exports.default = PushFunction;
