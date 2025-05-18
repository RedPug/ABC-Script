import Interpereter from "Interpereter";

const MAX_SCOPES = 10000; // Maximum number of scopes allowed. Also the deepest recursion depth.

export default class VariableStack {
    static instance: VariableStack;

    scopes: {[key:string]: any}[];

    constructor() {
        this.scopes = [{}];
    }

    setVariable(name: string, value: any): void {
        if (this.scopes.length === 0) {
            console.error("No scopes available to set a variable.");
            return;
        }
        
        // Look for the variable in the stack from top to bottom
        // If it exists, update it in the topmost scope
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (name in this.scopes[i]) {
                this.scopes[i][name] = value;
                this.onUpdate();
                return;
            }
        }

        // If it doesn't exist, add it to the topmost scope
        this.scopes[this.scopes.length - 1][name] = value;
        this.onUpdate();
    }

    defineLocalVariable(name: string, value: any): void {
        if (this.scopes.length === 0) {
            console.error("No scopes available to set a variable.");
            this.onUpdate();
            return;
        }

        this.scopes[this.scopes.length - 1][name] = value;
        this.onUpdate();
    }

    getVariable(name: string): any {
        // Search for the variable in the stack from top to bottom
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (name in this.scopes[i]) {
                return this.scopes[i][name];
            }
        }
        console.error(`Variable "${name}" not found in any scope.`);
        return undefined;
    }

    hasVariable(name: string): boolean {
        // Check if the variable exists in any scope from top to bottom
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (name in this.scopes[i]) {
                return true;
            }
        }
        return false;
    }

    push(): void {
        if(this.scopes.length > MAX_SCOPES){
            Interpereter.throwError(`Reached Limit of ${MAX_SCOPES} scopes. Cannot push a new scope.`);
            return;
        }

        this.scopes.push({});
        this.onUpdate();
    }

    pop(): void {
        // Pop the top scope off the stack
        if (this.scopes.length > 1) {
            this.scopes.pop()!;
        } else {
            console.error("No scopes to pop from the stack.");
        }

        this.onUpdate();
    }

    onUpdate(): void {
        // console.log("VariableStack updated:", this.toString());
    }

    toString(): string{
        return JSON.stringify(this.scopes, null, 2);
    }

}