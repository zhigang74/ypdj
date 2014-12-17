function DOMUtil() {
    DOMUtil.prototype.div = function (classlist) {
        var d = document.createElement('div');
        if (classlist === undefined) {
            return d;
        }
        if (typeof classlist === 'string') {
            d.className = classlist;
        } else if (classlist instanceof Array) {
            classlist.forEach(function (c) {
                d['classList'].add(c);
            });
        } else {
            // no op
        }
        return d;
    };

    DOMUtil.prototype.create = function (type, classlist) {
        var d = document.createElement(type);
        if (classlist === undefined) {
            return d;
        }
        if (typeof classlist === 'string') {
            d.className = classlist;
        } else {
            classlist.forEach(function (c) {
                d['classList'].add(c);
            });
        }
        return d;
    };

    DOMUtil.prototype.attr = function (element, attribute, value) {
        try {
            if (typeof attribute === 'string' && typeof value === 'string') {
                element.setAttribute(attribute, value);
            } else {
                for (var key in attribute) {
                    if (attribute.hasOwnProperty(key)) {
                        element.setAttribute(key, attribute[key]);
                    }
                }
            }
        } catch (e) {
            throw (e);
        }
    };

    DOMUtil.prototype.mount = function (father, child) {
        try {
            father.appendChild(child);
        } catch (e) {
            throw (e);
        }
    };

    DOMUtil.prototype.unmount = function (father, child) {
        try {
            father.removeChild(child);
        } catch (e) {
            throw (e);
        }
    };

    DOMUtil.prototype.classes = function (element, classes) {
        try {
            if (classes instanceof Array && element instanceof HTMLElement) {
                classes.forEach(

                function (className) {
                    element.classList.add(className);
                });
            } else {
                console.warn("element or classes type mismatch");
            }
        } catch (e) {
            throw (e);
        }
    };


    DOMUtil.prototype.removeClasses = function (element, classes) {
        try {
            if (classes instanceof Array && element instanceof HTMLElement) {
                classes.forEach(

                function (className) {
                    var classes = element.className.split(' ');
                    var j = classes.length;
                    while (j--) {
                        if (classes[j] === className) {
                            classes.splice(j, 1);
                        }
                    }
                    element.className = classes.join(' ');
                });
            } else {
                console.warn("element or classes type mismatch");
            }
        } catch (e) {
            throw (e);
        }
    };

    var createElem = function (define) {
        var type = define.type;
        if (type == null || type.length == 0) {
            return null;
        }
        var elem = document.createElement(type);
        var attr = define.attr;
        if (attr) {
            for (var key in attr) {
                if (attr.hasOwnProperty(key)) {
                    elem.setAttribute(key, attr[key]);
                }
            }
        }
        var content = define.content;
        if (content && content.lenght != 0) {
            elem.textContent = content;
        }
        var subElem = define.subElem;
        if (subElem && subElem.length != 0) {
            for (var key in subElem) {
                if (subElem[key]) {
                    var em = createElem(subElem[key]);
                    if (em) {
                        elem.appendChild(em);
                    }
                }
            }
        }
        var action = define.action;
        if (action) {
            elem.onclick = action;
        }
        return elem;
    };
    DOMUtil.prototype.createElem = createElem;
}

function YPDJView() {
    var self = this;
    self.className = 'YPDJView';
    var dom = new DOMUtil();
    self.draw = function () {
        var container = dom.div('container');
        dom.mount(document.body, container);
        
        var viewport = dom.div('viewport');
        dom.mount(container, viewport);

        var chat_page = dom.div('subview');
        dom.mount(viewport, chat_page);
        chat_page.style.backgroundColor = 'green';

        var address_page = dom.div('subview');
        dom.mount(viewport, address_page);
        address_page.style.backgroundColor = 'blue';

        var bar = dom.div('menubar');
        dom.mount(container, bar);

        var home_button = dom.div('button');
        dom.mount(bar, home_button);
        home_button.style.left = '12px';
        home_button.style.top = '4px';
        home_button.textContent = 'home';
        
        home_button.onclick = function () {
            if (chat_page.style.display === 'none') {
                chat_page.style.display = 'block';
                address_page.style.display = 'none';
            } else {
                chat_page.style.display = 'none';
                address_page.style.display = 'block';
            }
        };
    };

    function YPDJViewInterface() {}

    Object.defineProperty(YPDJViewInterface.prototype, 'classsName', {
        get: function () {
            return self.className;
        },
        set: function (value) {
            self.className = value;
        }
    });

    YPDJViewInterface.prototype.help = function () {
        return "var o = new YPDJView(); // then explore it's property and method";
    };

    YPDJViewInterface.prototype.render = self.draw;

    return new YPDJViewInterface();
};

document.addEventListener('DOMContentLoaded', function () {
    var view = new YPDJView();
    view.render();
});