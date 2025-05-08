import Interpereter from "Interpereter";
import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class PrintFunction extends Computable {
    static matchExpression: RegExp = /P/g;
    static precedence: number = 1;
    static numParameters: number = 1;

    constructor(match: string[]) {
        super(match);
    }


    evaluate(args: Evaluable[]): RawValue {
        // console.log("PrintFunction called with args:", args);
        for (const arg of args) {
            console.log(arg.evaluate([]).getValue());
            Interpereter.log(arg.evaluate([]).getValue());
        }

        return new RawValue(-1);
    }
}