class DisplayObject {
    constructor() {
        this._x = 0;
        this._y = 0;
        this.element = this._createElement();
    }

    _createElement() {
        let element = document.createElement('div');
        element.classList.add('display-object');
        return element;
    }

    destroy() {
        if (this.element) {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
        }
    }

    set x(value) {
        this._x = value;
        this.element.style.left = `${this._x}px`;
    }

    get x() {
        return this._x;
    }

    set y(value) {
        this._y = value;
        this.element.style.top = `${this._y}px`;
    }

    get y() {
        return this._y;
    }
}
