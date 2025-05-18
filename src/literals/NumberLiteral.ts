import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class NumberLiteral extends Computable {
    static matchExpression: RegExp = /N([a-z]*)/g; // Matches any number
    static precedence: number = 100000;

    private value: RawValue;

    constructor(match: string[]) {
        super(match);

        const numString = match[0];
        let value = 0;
        
        for (let i = 0; i < numString.length; i++) {
            const charCode = numString.charCodeAt(i);
            if (charCode == 'z'.charCodeAt(0)) {
                value = value * 26;
            }else{
                const char = charCode - 'a'.charCodeAt(0) + 1;
                value = value * 26 + char;
            }
        }

        this.value = new RawValue(value);
    }

    evaluate(args: Evaluable[]): RawValue {
        return this.value as RawValue;
    }

    static findMatch(input: string): RegExpExecArray {
        const regex = new RegExp(this.matchExpression);
        const match = regex.exec(input);
        return match ?? null;
    }

    static {
        super.register();
    }
}