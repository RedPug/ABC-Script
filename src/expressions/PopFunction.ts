import Evaluable from "structures/Evaluable";
import Expression from "structures/Expression";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class PopFunction extends Expression {
    static symbol: string = "POP";
    static numParameters: number = 0;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        VariableStack.instance.pop();

        return new RawValue(-1);
    }

    static {
        super.register();
    }
}