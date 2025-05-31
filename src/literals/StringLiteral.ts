import Computable from "structures/Computable";
import Evaluable from "structures/Evaluable";
import RawValue from "structures/RawValue";

export default class StringLiteral extends Computable {
    static precedence: number = 1000001; // Highest precedence

    private value: RawValue;

    constructor(match: string[]) {
        super(match);

        this.value = new RawValue(match[0]);
    }

    evaluate(args: Evaluable[]): RawValue {
        return this.value as RawValue;
    }

    static findMatch(input: string): RegExpExecArray {
        let nestingLevel = 0;
        let startIndex = -1;

        for (let i = 0; i < input.length; i++) {
            // Check for "STR"
            if (input.slice(i, i + 3) === "STR") {
                if (nestingLevel === 0) {
                    startIndex = i; // Mark the start of the outermost "STR"
                }
                nestingLevel++;
                i += 2; // Skip ahead to avoid partial matches
            }
            // Check for "END"
            else if (input.slice(i, i + 3) === "END") {
                nestingLevel--;
                if (nestingLevel === 0 && startIndex !== -1) {
                    // Found a matching "STR" and "END" pair
                    const fullContent = input.slice(startIndex, i+3); // Extract content between "STR" and "END"
                    const content = input.slice(startIndex + 3, i); // Extract content between "STR" and "END"
                    
                    const result: RegExpExecArray = Object.assign([fullContent, content], {
                        index: startIndex,
                        input: input,
                    }) as RegExpExecArray;

                    return result;
                }
                i += 2; // Skip ahead to avoid partial matches
            }
        }

        // If no valid pair is found
        return null;
    }
}