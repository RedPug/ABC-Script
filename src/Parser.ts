import {MatchResult} from "structures/MatchResult";
import Computable from "structures/Computable";
import ComputationStack from "structures/ComputationStack";


export default class Parser {
    private static expressions = [];

    static addExpression(expr: typeof Computable) {
        this.expressions.push(expr);
    }

    //returns a ComputationStack of the code passed in.
    // The stack is in postfix notation, so parameters are added before function calls.
    static parse(code: string) {
        const tree = new ComputationStack();

        code = cleanCode(code);

        const tokens: MatchResult[] = [];

        this.expressions.sort((a, b) => {
            // Sort for expandable first, then by precedence in descending order
            if (a.isExpandable !== b.isExpandable) {
                return a.isExpandable ? -1 : 1;
            }
            return b.precedence - a.precedence;
        });

        for (const Expression of this.expressions){

            const matches: RegExpExecArray[] = Array<RegExpExecArray>();

            let match;

            while((match = Expression.findMatch(code)) !== null){
                const numToReplace = match[0].length;

                //replace the match with spaces to avoid matching it again.
                code = code.slice(0, match.index) + ' '.repeat(numToReplace) + code.slice(match.index + numToReplace);

                matches.push(match);
            }

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
}

function cleanCode(code: string): string {
    
    code = code.replace(/\/\/.*$/gm, ''); // Remove comments

    //remove all spaces and newlines
    code = code.replace(/\s+/g, ' ').trim();

    return code;
}