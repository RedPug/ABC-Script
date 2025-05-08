"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parse;
const PrintFunction_1 = __importDefault(require("functions/PrintFunction"));
const AdditionFunction_1 = __importDefault(require("functions/AdditionFunction"));
const DivisionFunction_1 = __importDefault(require("functions/DivisionFunction"));
const MultiplicationFunction_1 = __importDefault(require("functions/MultiplicationFunction"));
const SubtractionFunction_1 = __importDefault(require("functions/SubtractionFunction"));
const ComputationStack_1 = __importDefault(require("structures/ComputationStack"));
const NumberLiteral_1 = __importDefault(require("literals/NumberLiteral"));
const SetVariableFunction_1 = __importDefault(require("functions/SetVariableFunction"));
const GetVariableFunction_1 = __importDefault(require("functions/GetVariableFunction"));
const BooleanLiteral_1 = __importDefault(require("literals/BooleanLiteral"));
const StringLiteral_1 = __importDefault(require("literals/StringLiteral"));
const EvaluateFunction_1 = __importDefault(require("functions/EvaluateFunction"));
const PopFunction_1 = __importDefault(require("functions/PopFunction"));
const PushFunction_1 = __importDefault(require("functions/PushFunction"));
const DefineVariableFunction_1 = __importDefault(require("functions/DefineVariableFunction"));
const EvaluateIfFunction_1 = __importDefault(require("functions/EvaluateIfFunction"));
// import Computable from "structures/Computable";
// Define the expressions array as a list of constructors for classes extending Computable
const expressions = [
    StringLiteral_1.default,
    NumberLiteral_1.default,
    BooleanLiteral_1.default,
    EvaluateFunction_1.default,
    EvaluateIfFunction_1.default,
    PushFunction_1.default,
    PopFunction_1.default,
    SetVariableFunction_1.default,
    DefineVariableFunction_1.default,
    GetVariableFunction_1.default,
    PrintFunction_1.default,
    AdditionFunction_1.default,
    SubtractionFunction_1.default,
    MultiplicationFunction_1.default,
    DivisionFunction_1.default,
];
//returns a ComputationStack of the code passed in.
// The stack is in postfix notation, so parameters are added before function calls.
function parse(code) {
    const tree = new ComputationStack_1.default();
    code = cleanCode(code);
    const tokens = [];
    expressions.sort((a, b) => {
        // Sort for expandable first, then by precedence in descending order
        if (a.isExpandable !== b.isExpandable) {
            return a.isExpandable ? -1 : 1;
        }
        return b.precedence - a.precedence;
    });
    // for (const Expression of expressions) {
    //     console.log("Expression:", Expression.name, Expression.precedence, Expression.isExpandable);
    // }
    for (const Expression of expressions) {
        // let regex = Expression.matchExpression;
        // if (!regex.flags.includes('g')) {
        //     regex = new RegExp(regex.source, regex.flags + 'g');
        // }
        const matches = Array();
        let match;
        while ((match = Expression.findMatch(code)) !== null) {
            // console.log("Match:", match[0]);
            const numToReplace = match[0].length;
            // console.log("Match:", match[0]);
            code = code.slice(0, match.index) + ' '.repeat(numToReplace) + code.slice(match.index + numToReplace);
            matches.push(match);
        }
        //get rid of the matches so we don't parse the same thing twice.
        // for (const match of matches) {
        //     const numToReplace = match[0].length;
        //     code = code.slice(0, match.index) + ' '.repeat(numToReplace) + code.slice(match.index + numToReplace);
        // }
        for (const match of matches) {
            const instance = new Expression(match.slice(1));
            const token = { instance: instance, index: match.index };
            //insert in the correct order.
            let insertIndex = tokens.findIndex(t => t.index > token.index);
            if (insertIndex === -1) {
                tokens.push(token); // Add to the end if no larger index is found
            }
            else {
                tokens.splice(insertIndex, 0, token); // Insert at the correct position
            }
        }
    }
    // console.log("Tokens:", tokens.map(t => t.instance.toString()));
    const funcQueue = [];
    const paramCountQueue = [];
    for (const token of tokens) {
        const instance = token.instance;
        const numParameters = instance.constructor.numParameters;
        if (numParameters <= 0) {
            tree.addElement(instance);
            const checkQueue = () => {
                const currentCount = paramCountQueue[paramCountQueue.length - 1];
                if (currentCount <= 1) {
                    //if this is the last parameter needed to run the function,
                    //add the function to the end in postfix notation
                    paramCountQueue.pop();
                    tree.addElement(funcQueue.pop());
                    checkQueue();
                }
                else {
                    //keep track of how many parameters are still needed.
                    paramCountQueue[paramCountQueue.length - 1] -= 1;
                }
            };
            checkQueue();
        }
        else {
            funcQueue.push(instance);
            paramCountQueue.push(numParameters);
        }
    }
    ComputationStack_1.default.instance.elements.push(...tree.elements);
    // console.log("Tree:", ComputationStack.instance.toString());
}
function cleanCode(code) {
    code = code.replace(/\/\/.*$/gm, ''); // Remove comments
    //must be after comments or else we remove all code!
    code = code.replace(/\s+/g, ' ').trim(); // Remove extra whitespaces and new lines.
    return code;
}
