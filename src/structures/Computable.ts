import Parser from "Parser";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default abstract class Computable implements Evaluable {
  static precedence: number = 0; // Default precedence
  static numParameters: number = 0; // Default number of parameters

  match: string[];

  constructor(match: string[]) {
    this.match = match;
  }

  abstract evaluate(args: Evaluable[]): RawValue;

  toString(): string{
    return `{${this.constructor.name}: ${this.match}}`;
  }

  static findMatch(input: string): RegExpExecArray{
    return null;
  }

  static register() {
    Parser.addExpression(this);
  }
}