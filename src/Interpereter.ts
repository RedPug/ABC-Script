import ComputationStack from "structures/ComputationStack";
import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import VariableStack from "structures/VariableStack";

export default class Interpereter {

    constructor() {
        VariableStack.instance = new VariableStack();
        VariableStack.instance.push();
    }

    interpret(): string {
        const tree = ComputationStack.instance;
        
        const completionStack = [];

        while (tree.elements.length > 0 ){
            const element = tree.elements.pop()!;

            const args: Evaluable[] = [];
            const numParameters = (element.constructor as typeof Computable).numParameters;

            for (let i = 0; i < numParameters; i++) {
                if (completionStack.length > 0) {
                    args.unshift(completionStack.pop()!);
                }else{
                    console.error("Not enough arguments for function:", element.constructor.name);
                }
            }
            
            const result = element.evaluate(args);
            
            completionStack.push(result);
        }
        
        return "success";
    }
}