import Accessor from "structures/Accessor";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";


export default class PushQueueFunction extends Accessor {
    static symbol: string = "PUSH";
    static numParameters: number = 1;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        const var_name = this.match[0];
        const arr = VariableStack.instance.getVariable(var_name);
        
        if (arr instanceof Array) {
            arr.push(args[0].evaluate([]).getValue());
            VariableStack.instance.onUpdate();
            return new RawValue(-1);
        }

        return new RawValue(0);
    }
}