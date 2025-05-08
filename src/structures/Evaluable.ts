import RawValue from "structures/RawValue";

export default interface Evaluable {
    evaluate(args: Evaluable[]): RawValue;

    
}