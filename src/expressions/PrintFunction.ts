import Interpereter from "Interpereter";
import Evaluable from "structures/Evaluable";
import Expression from "structures/Expression";
import RawValue from "structures/RawValue";

export default class PrintFunction extends Expression {
    static symbol: string = "P";
    static numParameters: number = 1;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        for (const arg of args) {
            Interpereter.log(arg.evaluate([]).getValue().toString());
        }

        return new RawValue(-1);
    }
}