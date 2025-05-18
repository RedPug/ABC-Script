import Accessor from "structures/Accessor";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";


export default class PopQueueFunction extends Accessor {
    static symbol: string = "POP";

    constructor(match: string[]) {
        super(match);
    }

    evaluate(): RawValue {
        const var_name = this.match[0];
        const arr = VariableStack.instance.getVariable(var_name);

        if (arr instanceof Array) {
            const poppedValue = arr.pop();
            VariableStack.instance.onUpdate();
            return new RawValue(poppedValue);
        }

        return new RawValue(-1);
    }

    static {
        super.register();
    }
}