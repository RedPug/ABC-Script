import Computable from "structures/Computable";
import Evaluable from "./Evaluable";

export default class ComputationStack {

    static instance: ComputationStack = new ComputationStack();

    elements: Evaluable[];

    constructor() {
        this.elements = [];
    }

    //Adds an element to the beginning of the array.
    addElement(element: Evaluable): void {
        this.elements.unshift(element);
    }

    evaluate(): void {
        for (const element of this.elements) {
            element.evaluate([]);
        }
    }

    toString(): string{
        let output = "ComputationStack: {\n";
        for (const element of this.elements) {
            output += `  ${element.toString()}\n`;
        }
        output += "}";

        return output;
    }
}