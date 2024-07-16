class Cell{
    get canBeFilled(): boolean {
        return this._canBeFilled;
    }
    get isFilled(): boolean {
        return this._isFilled;
    }

    private _isFilled: boolean = false;
    private _canBeFilled: boolean = false;

    set isFilled(value: boolean) {
        this._isFilled = value;
    }
    set canBeFilled(value: boolean) {
        this._canBeFilled = value;
    }


}

export default Cell