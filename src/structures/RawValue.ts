import Evaluable from "structures/Evaluable";

export default class RawValue<T extends string | number | Array<any> = string | number | Array<any>> implements Evaluable {
    constructor(private value: T){
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    evaluate(): RawValue {
        return this;
    }
}