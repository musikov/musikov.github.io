class Container extends DisplayObject {
    constructor() {
        super();
        this._children = [];
    }

    _createElement() {
        let element = super._createElement();
        element.classList.add('container');
        return element;
    }

    destroy(options) {
        if (options && options.children && this._children) {
            this._children.forEach(child => child.destroy(options));
        }
        this._children = null;
        super.destroy(options);
    }

    get children() {
        return this._children;
    }

    addChild(child) {
        this._children[this._children.length] = child;
        this.element.appendChild(child.element);
    }

    addChildAt(child, idx) {
        if (!this._children[idx]) {
            return this.addChild(child);
        }
        this.element.insertBefore(child.element, this.element.childNodes[idx]);
        this._children.splice(idx, 0, child);
    }

    removeChild(child) {
        let index = this._children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 1);
            this.element.removeChild(child.element);
        }
    }

    removeAllChildren() {
        while (this._children.length) this.removeChild(this._children[0]);
    }
}
