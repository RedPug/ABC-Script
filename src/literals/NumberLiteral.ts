import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class NumberLiteral extends Computable {
    static matchExpression: RegExp = /N([a-z]*)/g; // Matches any number
    static precedence: number = 1;
    static isExpandable: boolean = true;
    static numParameters: number = 0;

    private value: RawValue;

    constructor(match: string[]) {
        super(match);

        const numString = match[0];
        let value = 0;
        
        for (let i = 0; i < numString.length; i++) {
            const char = numString.charCodeAt(i) - 'a'.charCodeAt(0) + 1;
            value = value * 26 + char;
        }

        this.value = new RawValue(value);
    }

    evaluate(args: Evaluable[]): RawValue {
        return this.value as RawValue;
    }
}