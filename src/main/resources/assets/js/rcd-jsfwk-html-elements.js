class RcdDivElement extends RcdHtmlElement {
    constructor() {
        super('div');
    }

    focus() {
        this.setAttribute('tabindex', '0');
        super.focus();
        return this;
    }
}

class RcdPElement extends RcdHtmlElement {
    constructor() {
        super('p');
    }
}

class RcdAElement extends RcdHtmlElement {
    constructor(linkDisplay, href) {
        super('a');
        this.linkDisplay = linkDisplay;
        this.href = href;
    }

    init() {
        super.init()
            .setAttribute('href', this.href);
        if (this.linkDisplay) {
            this.setText(this.linkDisplay);
        }
        return this;
    }

    setHref(href) {
        this.href = href;
        return this.setAttribute('href', href);
    }

    setStateRef(state, params) {
        return this.setHref('#' + RcdHistoryRouter.buildState(state, params));
    }
}

class RcdButtonElement extends RcdHtmlElement {
    constructor() {
        super('button');
    }
}

class RcdHeaderElement extends RcdHtmlElement {
    constructor() {
        super('header');
    }
}

class RcdFooterElement extends RcdHtmlElement {
    constructor() {
        super('footer');
    }
}

class RcdIElement extends RcdHtmlElement {
    constructor() {
        super('i');
    }
}

class RcdImgElement extends RcdHtmlElement {
    constructor(src) {
        super('img');
        this.src = src;
    }

    init() {
        super.init();
        return this.setAttribute('src', this.src);
    }
}

class RcdSpanElement extends RcdHtmlElement {
    constructor() {
        super('span');
    }
}

class RcdMainElement extends RcdHtmlElement {
    constructor() {
        super('main');
    }
}

class RcdNavElement extends RcdHtmlElement {
    constructor() {
        super('nav');
    }
}

class RcdTableElement extends RcdHtmlElement {
    constructor() {
        super('table');
    }
}

class RcdTheadElement extends RcdHtmlElement {
    constructor() {
        super('thead');
    }
}

class RcdTbodyElement extends RcdHtmlElement {
    constructor() {
        super('tbody');
    }
}

class RcdTfootElement extends RcdHtmlElement {
    constructor() {
        super('tfoot');
    }
}

class RcdTrElement extends RcdHtmlElement {
    constructor() {
        super('tr');
    }
}

class RcdThElement extends RcdHtmlElement {
    constructor() {
        super('th');
    }
}

class RcdTdElement extends RcdHtmlElement {
    constructor() {
        super('td');
    }
}

class RcdFormElement extends RcdHtmlElement {
    constructor() {
        super('form');
    }

    submit() {
        this.domElement.submit();
    }
}

class RcdOptionElement extends RcdHtmlElement {
    constructor() {
        super('option');
    }

    getValue() {
        return this.domElement.value;
    }

    setValue(value) {
        this.domElement.value = value;
        return this;
    }
}

class RcdSelectElement extends RcdChangeableElement {
    constructor() {
        super('select');
        this.options = [];
    }

    clear() {
        this.options = [];
        return super.clear();
    }

    addOption(optionValue, optionText) {
        if (optionText == null) {
            optionText = optionValue;
        }
        const optionElement = this.createOptionElement(optionValue, optionText);
        this.options.push(optionElement);
        return this.addChild(optionElement)
    }

    addOptions(options) {
        options.forEach(option => {
            if (typeof option === 'string') {
                this.addOption(option)
            } else {
                this.addOption(option[0], option[1]);
            }
        });
        return this;
    }

    createOptionElement(optionValue, optionText) {
        return new RcdOptionElement().init()
            .setValue(optionValue)
            .setText(optionText);
    }

    selectIndex(index) {
        this.domElement.selectedIndex = index;
        return this;
    }

    selectOption(optionValue) {
        const index = this.options.findIndex(option => option.getValue() === optionValue);
        return this.selectIndex(index);
    }

    getSelectedIndex() {
        return this.domElement.selectedIndex;
    }

    getSelectedValue() {
        return this.options[this.getSelectedIndex()].getValue();
    }
}

class RcdInputElement extends RcdChangeableElement {
    constructor() {
        super('input');
        this.placeholder;
    }

    getValue() {
        return this.domElement.value;
    }

    setValue(value) {
        this.domElement.value = value;
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        this.domElement.placeholder = placeholder;
        return this;
    }

    click() {
        this.domElement.click();
        return this;
    }

    select() {
        this.domElement.select();
        return this;
    }
}

class RcdTextAreaElement extends RcdChangeableElement {
    constructor() {
        super('textarea');
        this.placeholder;
    }

    getValue() {
        return this.domElement.value;
    }

    setValue(value) {
        this.domElement.value = value;
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        this.domElement.placeholder = placeholder;
        return this;
    }

    setRows(rows) {
        this.domElement.rows = rows;
        return this;
    }

    setCols(cols) {
        this.domElement.cols = cols;
        return this;
    }

    click() {
        this.domElement.click();
        return this;
    }

    select() {
        this.domElement.select();
        return this;
    }
}

class RcdSectionElement extends RcdHtmlElement {
    constructor() {
        super('section');
    }
}

class RcdArticleElement extends RcdHtmlElement {
    constructor() {
        super('article');
    }
}

class RcdH1Element extends RcdHtmlElement {
    constructor() {
        super('h1');
    }
}

class RcdH2Element extends RcdHtmlElement {
    constructor() {
        super('h2');
    }
}

class RcdLegend extends RcdHtmlElement {
    constructor(text) {
        super('legend');
        this.textBuffer = text;
    }

    init() {
        return super.init()
            .setText(this.textBuffer);
    }
}

class RcdLabel extends RcdHtmlElement {
    constructor() {
        super('label');
    }
}

class RcdFieldset extends RcdHtmlElement {
    constructor() {
        super('fieldset');
    }
}



