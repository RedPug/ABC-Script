import Parser from "Parser";
import Evaluable from "structures/Evaluable";
import Expression from "structures/Expression";
import RawValue from "structures/RawValue";

export default class EvaluateIfFunction extends Expression {
    static symbol: string = "EVALIF";
    static numParameters: number = 2;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        if(args[0].evaluate([]).getValue() as number > 0) {
            Parser.parse(args[1].evaluate([]).getValue() as string);
        }

        return new RawValue(-1);
    }

}