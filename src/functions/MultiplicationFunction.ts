import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class MultiplicationFunction extends Computable {
    static matchExpression: RegExp = /X/g;
    static precedence: number = 1;
    static numParameters: number = 2;

    constructor(match: string[]) {
        super(match);
    }


    evaluate(args: Evaluable[]): RawValue {
        const a = args[0].evaluate([]).getValue() as number;
        const b = args[1].evaluate([]).getValue() as number;

        return new RawValue(a * b);
    }
}