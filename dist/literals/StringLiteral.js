"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Computable_1 = __importDefault(require("structures/Computable"));
const RawValue_1 = __importDefault(require("structures/RawValue"));
class StringLiteral extends Computable_1.default {
    constructor(match) {
        super(match);
        // console.log("Creating StringLiteral with match:", JSON.stringify(match)); // Debugging line
        this.value = new RawValue_1.default(match[0]);
    }
    evaluate(args) {
        return this.value;
    }
    static findMatch(input) {
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
                    const fullContent = input.slice(startIndex, i + 3); // Extract content between "STR" and "END"
                    const content = input.slice(startIndex + 3, i); // Extract content between "STR" and "END"
                    const result = Object.assign([fullContent, content], {
                        index: startIndex,
                        input: input,
                    });
                    return result;
                }
                i += 2; // Skip ahead to avoid partial matches
            }
        }
        // If no valid pair is found
        return null;
    }
}
StringLiteral.precedence = 1000; // Highest precedence
StringLiteral.isExpandable = true;
StringLiteral.numParameters = 0;
exports.default = StringLiteral;
