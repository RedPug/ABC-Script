"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComputationStack_1 = __importDefault(require("structures/ComputationStack"));
const VariableStack_1 = __importDefault(require("structures/VariableStack"));
class Interpereter {
    constructor() {
        VariableStack_1.default.instance = new VariableStack_1.default();
        VariableStack_1.default.instance.push();
    }
    reset() {
        ComputationStack_1.default.instance.elements = [];
    }
    interpret() {
        const tree = ComputationStack_1.default.instance;
        const completionStack = [];
        while (tree.elements.length > 0) {
            const element = tree.elements.pop();
            const args = [];
            const numParameters = element.constructor.numParameters;
            for (let i = 0; i < numParameters; i++) {
                if (completionStack.length > 0) {
                    args.unshift(completionStack.pop());
                }
                else {
                    console.error("Not enough arguments for function:", element.constructor.name);
                }
            }
            const result = element.evaluate(args);
            completionStack.push(result);
        }
        return "success";
    }
}
exports.default = Interpereter;
