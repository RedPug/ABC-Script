import parse from "Parser";
import Computable from "structures/Computable";
import ComputationStack from "structures/ComputationStack";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class EvaluateIfFunction extends Computable {
    static matchExpression: RegExp = /EVALIF/g;
    static precedence: number = 6;
    static numParameters: number = 2;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        if(args[0].evaluate([]).getValue() as number > 0) {
            parse(args[1].evaluate([]).getValue() as string);
        }

        return new RawValue(-1);
    }
}