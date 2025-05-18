import Parser from "Parser";
import Computable from "./Computable";
import Evaluable from "./Evaluable";
import RawValue from "./RawValue";

export default abstract class Accessor extends Computable{
    static symbol: string;
    static numParameters: number = 0;

    constructor(match: string[]) {
        super(match);
    }

    evaluate(args?: Evaluable[]): RawValue {
        return new RawValue(1);
    }

    static findMatch(input: string): RegExpExecArray{
        const regex = new RegExp(`${this.symbol}\\s*([a-z]+)`, 'g');
        const match = regex.exec(input);
        return match ?? null;
    }

    static register() {
        super.register();
        this.precedence = this.symbol.length + 1000;
    }
}