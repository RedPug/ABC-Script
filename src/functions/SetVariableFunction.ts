import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class SetVariableFunction extends Computable {
    static matchExpression: RegExp = /S([a-z]+)/g;
    static precedence: number = 1;
    static isExpandable: boolean = true;
    static numParameters: number = 1;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        const value = args[0].evaluate([]).getValue();
        VariableStack.instance.setVariable(this.match[0], value);

        return new RawValue(-1);
    }
}