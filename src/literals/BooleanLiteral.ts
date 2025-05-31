import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class BooleanLiteral extends Computable {
    static matchExpression: RegExp = /B(T|F)/g; // Matches any number
    static precedence: number = 2;

    private value: RawValue;

    constructor(match: string[]) {
        super(match);

        const text = match[0];

        this.value = new RawValue(text == "T" ? 1 : 0);
    }

    evaluate(args: Evaluable[]): RawValue {
        return this.value as RawValue; 
    }

    static findMatch(input: string): RegExpExecArray {
        const regex = new RegExp(this.matchExpression);
        const match = regex.exec(input);
        return match ?? null;
    }
}