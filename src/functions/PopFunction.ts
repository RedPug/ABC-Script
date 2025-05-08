import parse from "Parser";
import Computable from "structures/Computable";
import ComputationStack from "structures/ComputationStack";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class PopFunction extends Computable {
    static matchExpression: RegExp = /POP/g;
    static precedence: number = 3;
    static numParameters: number = 0;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        // parse(args[0].evaluate([]).getValue() as string);
        VariableStack.instance.pop();

        return new RawValue(-1);
    }
}