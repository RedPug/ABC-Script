import Parser from "Parser";
import Computable from "./Computable";

export default abstract class Expression extends Computable {
    static symbol: string;
    static numParameters: number = 0;

    constructor(match: string[]) {
        super(match);
    }

    static findMatch(input: string): RegExpExecArray{
        const regex = new RegExp(`${this.symbol}`, 'g');
        const match = regex.exec(input);
        return match ?? null;
    }

    static register() {
        super.register();
        this.precedence = this.symbol.length;
    }
}