import PrintFunction from "functions/PrintFunction";
import AdditionFunction from "functions/AdditionFunction";
import DivisionFunction from "functions/DivisionFunction";
import MultiplicationFunction from "functions/MultiplicationFunction";
import SubtractionFunction from "functions/SubtractionFunction";


import ComputationStack from "structures/ComputationStack";
import NumberLiteral from "literals/NumberLiteral";
import SetVariableFunction from "functions/SetVariableFunction";
import GetVariableFunction from "functions/GetVariableFunction";
import {MatchResult} from "structures/MatchResult";
import Computable from "structures/Computable";
import BooleanLiteral from "literals/BooleanLiteral";
import StringLiteral from "literals/StringLiteral";
import EvaluateFunction from "functions/EvaluateFunction";
import PopFunction from "functions/PopFunction";
import PushFunction from "functions/PushFunction";
import DefineVariableFunction from "functions/DefineVariableFunction";
import EvaluateIfFunction from "functions/EvaluateIfFunction";
// import Computable from "structures/Computable";


// Define the expressions array as a list of constructors for classes extending Computable
const expressions = [
    StringLiteral,
    NumberLiteral,
    BooleanLiteral,

    EvaluateFunction,
    EvaluateIfFunction,
    PushFunction,
    PopFunction,

    SetVariableFunction,
    DefineVariableFunction,
    GetVariableFunction,

    PrintFunction,

    AdditionFunction,
    SubtractionFunction,
    MultiplicationFunction,
    DivisionFunction,
];

//returns a ComputationStack of the code passed in.
// The stack is in postfix notation, so parameters are added before function calls.
export default function parse(code: string) {
    const tree = new ComputationStack();

    code = cleanCode(code);

    const tokens: MatchResult[] = [];

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

    for (const Expression of expressions){
        // let regex = Expression.matchExpression;

        // if (!regex.flags.includes('g')) {
        //     regex = new RegExp(regex.source, regex.flags + 'g');
        // }

        const matches: RegExpExecArray[] = Array<RegExpExecArray>();

        let match;

        while((match = Expression.findMatch(code)) !== null){
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

        for(const match of matches) {
            const instance = new Expression(match.slice(1));
            const token = {instance: instance, index: match.index};
            
            //insert in the correct order.
            let insertIndex = tokens.findIndex(t => t.index > token.index);
            if (insertIndex === -1) {
                tokens.push(token); // Add to the end if no larger index is found
            } else {
                tokens.splice(insertIndex, 0, token); // Insert at the correct position
            }
        }
    }

    // console.log("Tokens:", tokens.map(t => t.instance.toString()));

    const funcQueue = [];
    const paramCountQueue = [];

    for (const token of tokens) {
        const instance = token.instance;
        const numParameters = (instance.constructor as typeof Computable).numParameters;
        
        if(numParameters <= 0){
            tree.addElement(instance);
            const checkQueue = ()=>{
                const currentCount = paramCountQueue[paramCountQueue.length-1];
                if(currentCount <= 1){
                    //if this is the last parameter needed to run the function,
                    //add the function to the end in postfix notation
                    paramCountQueue.pop();
                    tree.addElement(funcQueue.pop());
                    checkQueue();
                }else{
                    //keep track of how many parameters are still needed.
                    paramCountQueue[paramCountQueue.length-1] -= 1;
                }
            }

            checkQueue();
            
        }else{
            funcQueue.push(instance);
            paramCountQueue.push(numParameters);
        }
    }
    
    ComputationStack.instance.elements.push(...tree.elements);

    // console.log("Tree:", ComputationStack.instance.toString());
}

function cleanCode(code: string): string {
    
    code = code.replace(/\/\/.*$/gm, ''); // Remove comments

    //must be after comments or else we remove all code!
    code = code.replace(/\s+/g, ' ').trim(); // Remove extra whitespaces and new lines.
    

    return code;
}