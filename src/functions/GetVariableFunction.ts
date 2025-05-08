import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class GetVariableFunction extends Computable {
    static matchExpression: RegExp = /G([a-z]+)/g;
    static precedence: number = 1;
    static isExpandable: boolean = true;
    static numParameters: number = 0;

    constructor(match: string[]) {
        super(match);
    }


    evaluate(args: Evaluable[]): RawValue {
        const value = VariableStack.instance.getVariable(this.match[0]);

        return new RawValue(value);
    }
}