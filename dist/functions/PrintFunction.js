"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
class PrintFunction extends Computable_1.default {
    constructor(match) {
        super(match);
    }
    evaluate(args) {
        // console.log("PrintFunction called with args:", args);
        for (const arg of args) {
            console.log(arg.evaluate([]).getValue());
        }
        return new RawValue_1.default(-1);
    }
}
PrintFunction.matchExpression = /P/g;
PrintFunction.precedence = 1;
PrintFunction.numParameters = 1;
exports.default = PrintFunction;
