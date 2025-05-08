"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VariableStack {
    constructor() {
        this.scopes = [];
    }
    setVariable(name, value) {
        if (this.scopes.length === 0) {
            console.error("No scopes available to set a variable.");
            return;
        }
        // Look for the variable in the stack from top to bottom
        // If it exists, update it in the topmost scope
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (name in this.scopes[i]) {
                this.scopes[i][name] = value;
                return;
            }
        }
        // If it doesn't exist, add it to the topmost scope
        this.scopes[this.scopes.length - 1][name] = value;
    }
    defineLocalVariable(name, value) {
        if (this.scopes.length === 0) {
            console.error("No scopes available to set a variable.");
            return;
        }
        this.scopes[this.scopes.length - 1][name] = value;
    }
    getVariable(name) {
        // Search for the variable in the stack from top to bottom
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (name in this.scopes[i]) {
                return this.scopes[i][name];
            }
        }
        console.error(`Variable "${name}" not found in any scope.`);
        return undefined;
    }
    hasVariable(name) {
        // Check if the variable exists in any scope from top to bottom
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (name in this.scopes[i]) {
                return true;
            }
        }
        return false;
    }
    push() {
        this.scopes.push({});
    }
    pop() {
        // Pop the top scope off the stack
        if (this.scopes.length > 0) {
            this.scopes.pop();
        }
        else {
            console.error("No scopes to pop from the stack.");
        }
    }
    toString() {
        return JSON.stringify(this.scopes, null, 2);
    }
}
exports.default = VariableStack;
