class RcdTextElement extends RcdSpanElement {
    constructor(text) {
        super();
        this.tmp = text; //TODO No idea of a proper name
    }

    init() {
        return this.setText(this.tmp);
    }
}

class RcdParagraphElement extends RcdPElement {
    constructor(text) {
        super();
        this.tmp = text; //TODO No idea of a proper name
    }

    init() {
        return this.setText(this.tmp);
    }
}

class RcdTextDivElement extends RcdDivElement {
    constructor(text) {
        super();
        this.span = new RcdTextElement(text).init();
    }

    init() {
        return this.addChild(this.span);
    }
}

class RcdParagraphDivElement extends RcdDivElement {
    constructor(text) {
        super();
        this.p = new RcdParagraphElement(text).init();
    }

    init() {
        return this.addChild(this.p);
    }
}
