import ComputationStack from "structures/ComputationStack";
import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import VariableStack from "structures/VariableStack";

export default class Interpereter {

    static output: string;
    static shouldStop: boolean;

    constructor() {
    }

    static {
        Interpereter.reset();
    }

    static reset(): void {
        VariableStack.instance = new VariableStack();
        ComputationStack.instance.elements = [];
        Interpereter.output = "";
        Interpereter.shouldStop = false;
    }

    static interpret(): string {
        const tree = ComputationStack.instance;
        
        const completionStack = [];

        while (tree.elements.length > 0 && !Interpereter.shouldStop) {
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
        
        return Interpereter.output;
    }

    static log(value: any): void {
        Interpereter.output += value + "\n";
    }

    static throwError(message: string): void {
        Interpereter.output += "Error: " + message + "\n";
        console.error("Error:", message);

        Interpereter.shouldStop = true;
    }
}