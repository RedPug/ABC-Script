import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class DefineVariableFunction extends Computable {
    static matchExpression: RegExp = /D([a-z]+)/g;
    static precedence: number = 1;
    static isExpandable: boolean = true;
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