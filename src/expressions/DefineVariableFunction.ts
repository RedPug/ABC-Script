import Accessor from "structures/Accessor";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class DefineVariableFunction extends Accessor {
    static symbol: string = "D";
    static numParameters: number = 1;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        const value = args[0].evaluate([]).getValue();
        VariableStack.instance.defineLocalVariable(this.match[0], value);

        return new RawValue(-1);
    }
}