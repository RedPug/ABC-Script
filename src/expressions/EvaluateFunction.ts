import Parser from "Parser";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";
import Expression from "structures/Expression";

export default class EvaluateFunction extends Expression {
    static symbol: string = "EVAL";
    static numParameters: number = 1;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        Parser.parse(args[0].evaluate([]).getValue() as string);

        return new RawValue(-1);
    }

    static {
        super.register();
    }
}