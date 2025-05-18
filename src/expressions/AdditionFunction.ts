import Evaluable from "structures/Evaluable";
import Expression from "structures/Expression";
import RawValue from "structures/RawValue";

export default class AdditionFunction extends Expression {
    static symbol: string = "A";
    static numParameters: number = 2;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        const a = args[0].evaluate([]).getValue() as number;
        const b = args[1].evaluate([]).getValue() as number;

        return new RawValue(a + b);
    }

    static{
        super.register();
    }
}