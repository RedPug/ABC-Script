import parse from "Parser";
import Computable from "structures/Computable";
import ComputationStack from "structures/ComputationStack";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class EvaluateFunction extends Computable {
    static matchExpression: RegExp = /EVAL/g;
    static precedence: number = 4;
    static numParameters: number = 1;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        parse(args[0].evaluate([]).getValue() as string);

        return new RawValue(-1);
    }
}