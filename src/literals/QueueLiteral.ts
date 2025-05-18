

import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class QueueLiteral extends Computable {
    static matchExpression: RegExp = /Q/g;
    static precedence: number = 1;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args: Evaluable[]): RawValue {
        return new RawValue([]);
    }

    static findMatch(input: string): RegExpExecArray {
        const regex = new RegExp(this.matchExpression);
        const match = regex.exec(input);
        return match ?? null;
    }

    static {
        super.register();
    }
}