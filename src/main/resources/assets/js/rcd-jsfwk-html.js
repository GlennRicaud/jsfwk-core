class RcdDomElement extends RcdXmlElement {
    constructor(tagName, namespaceURI) {
        super(tagName);
        this.namespaceURI = namespaceURI;
        this.domElement = namespaceURI ? document.createElementNS(namespaceURI, tagName) : document.createElement(tagName);
        this.parent;
    }

    setAttribute(key, value) {
        super.setAttribute(key, value);
        if (value) {
            this.domElement.setAttribute(key, value);
        } else {
            this.domElement.removeAttribute(key);
        }
        return this;
    }

    setAttributeNS(namespaceURI, key, value) {
        super.setAttribute(key, value); //TODO
        this.domElement.setAttributeNS(namespaceURI, key, value);
        return this;
    }

    setText(text) {
        super.setText(text);
        this.domElement.innerText = text;
        return this;
    }

    addChild(child, append = true) {
        super.addChild(child);
        if (child) {
            if (append) {
                this.domElement.appendChild(child.domElement);
            } else {
                this.domElement.prepend(child.domElement);
            }
        }
        return this;
    }

    addChildren(children, append) {
        if (children) {
            children.forEach(child => this.addChild(child, append));
        }
        return this;
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            super.removeChild(child);
            this.domElement.removeChild(child.domElement);
        }
        return this;
    }

    clear() {
        super.clear();
        this.domElement.innerHTML = '';
        return this;
    }

    setParent(parent = document.body) {
        this.removeParent(parent);
        if (parent instanceof RcdDomElement) {
            parent.addChild(this);
        } else {
            parent.appendChild(this.domElement);
        }
        this.parent = parent;
        return this;
    }

    removeParent() {
        if (this.parent) {
            if (this.parent instanceof RcdDomElement) {
                this.parent.removeChild(this);
            } else {
                this.parent.removeChild(this.domElement);
            }
        }
        this.parent = undefined;
        return this;
    }

    addEventListener(type, listener) {
        this.domElement.addEventListener(type, listener);
        return this;
    }

    removeEventListener(type, listener) {
        this.domElement.removeEventListener(type, listener);
        return this;
    }

    focus() {
        this.domElement.focus();
        return this;
    }

    setStyle(properties) {
        for (const propertyName in properties) {
            this.domElement.style[propertyName] = properties[propertyName];
        }
        return this;
    }
}

class RcdHtmlElement extends RcdDomElement {
    constructor(tagName, namespaceURI) {
        super(tagName, namespaceURI);
        this.classes = [];
        this.eventListeners = {};
        this.eventListenerWrappers = {};
    }

    init() {
        return this;
    }

    setId(id) {
        this.setAttribute('id', id);
        return this;
    }

    hasClass(aClass) {
        return this.classes.indexOf(aClass) !== -1;
    }

    addClass(aClass) {
        if (aClass && !this.hasClass(aClass)) {
            this.classes.push(aClass);
            this.setAttribute("class", this.classes.join(' '));
        }
        return this;
    }

    removeClass(aClass) {
        const index = this.classes.indexOf(aClass);
        if (index !== -1) {
            this.classes.splice(index, 1);
            this.setAttribute("class", this.classes.join(' '));
        }
        return this;
    }

    hasEventListener(type, listener) {
        return this.eventListeners[type] && this.eventListeners[type].indexOf(listener) !== -1;
    }

    addEventListener(type, listener) {
        if (!this.hasEventListener(type, listener)) {
            this.eventListeners[type] = this.eventListeners[type] || [];
            this.eventListeners[type].push(listener);

            let wrapper = (event) => listener(this, event);
            this.eventListenerWrappers[type] = this.eventListenerWrappers[type] || [];
            this.eventListenerWrappers[type].push(wrapper);
            super.addEventListener(type, wrapper);
        }
        return this;
    }

    removeEventListener(type, listener) {
        if (this.eventListeners[type]) {
            const index = this.eventListeners[type].indexOf(listener);
            if (index !== -1) {
                this.eventListeners[type].splice(index, 1);
                let wrapper = this.eventListenerWrappers[type].splice(index, 1)[0];
                super.removeEventListener(type, wrapper);
            }
        }
        return this;
    }

    addClickListener(listener) {
        return this.addEventListener('click', listener);
    }

    removeClickListener(listener) {
        return this.removeEventListener('click', listener);
    }

    addFocusListener(listener) {
        return this.addEventListener('focus', listener);
    }

    removeFocusListener(listener) {
        return this.removeEventListener('focus', listener);
    }

    addBlurListener(listener) {
        return this.addEventListener('blur', listener);
    }

    removeBlurListener(listener) {
        return this.removeEventListener('blur', listener);
    }

    addMouseOverListener(listener) {
        return this.addEventListener('mouseover', listener);
    }

    removeMouseOverListener(listener) {
        return this.removeEventListener('mouseover', listener);
    }

    addMouseOutListener(listener) {
        return this.addEventListener('mouseout', listener);
    }

    removeMouseOutListener(listener) {
        return this.removeEventListener('mouseout', listener);
    }

    addKeyUpListener(key, listener) {
        return this.addEventListener('keyup', (source, event) => {
            if (!key || key === event.key) {
                listener(source, event);
            }
        });
    }

    addKeyDownListener(key, listener) {
        return this.addEventListener('keydown', (source, event) => {
            if (!key || key === event.key) {
                listener(source, event);
            }
        });
    }

    show(show = true) {
        if (show) {
            return this.removeClass('rcd-hidden');
        } else {
            return this.addClass('rcd-hidden');
        }
    }

    hide() {
        return this.show(false);
    }
}

class RcdChangeableElement extends RcdHtmlElement {
    constructor(tagName) {
        super(tagName);
    }

    addChangeListener(listener) {
        return this.addEventListener('change', listener);
    }

    removeChangeListener(listener) {
        return this.removeEventListener('change', listener);
    }

    addInputListener(listener) {
        return this.addEventListener('input', listener);
    }

    removeInputListener(listener) {
        return this.removeEventListener('input', listener);
    }
}