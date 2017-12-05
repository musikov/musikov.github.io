class Sprite extends DisplayObject {
    constructor() {
        super();
        this._anchorX = 0;
        this._anchorY = 0;
    }

    _createElement() {
        let element = document.createElement('img');
        element.classList.add('display-object');
        element.classList.add('sprite');
        return element;
    }

    set texture(value) {
        this.element.onload = () => this._updateAnchor();
        this.element.src = value;
    }

    set anchorX(value) {
        this._anchorX = value;
        this._updateAnchor();
    }

    set anchorY(value) {
        this._anchorY = value;
        this._updateAnchor();
    }

    _updateAnchor() {
        if (!this.element) return;
        this.element.style.marginLeft = `${-this._anchorX * this.element.width}px`;
        this.element.style.marginTop = `${-this._anchorY * this.element.height}px`;
    }
}
