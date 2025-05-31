import Accessor from "structures/Accessor";
import RawValue from "structures/RawValue";
import VariableStack from "structures/VariableStack";

export default class GetVariableFunction extends Accessor {
    static symbol: string = "G";

    constructor(match: string[]) {
        super(match);
    }

    evaluate(): RawValue {
        const value = VariableStack.instance.getVariable(this.match[0]);

        return new RawValue(value);
    }
}