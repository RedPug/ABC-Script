import Evaluable from "structures/Evaluable";
import Expression from "structures/Expression";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class PushFunction extends Expression {
    static symbol: string = "PUSH";
    static numParameters: number = 0;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        VariableStack.instance.push();

        return new RawValue(-1);
    }
}