const setup = (app) => {

    app.isFrontend = function() {
        return document.documentElement.getAttribute('data-frontend-environment') === 'true';
    }
    
    app.utilites = {
        getControllerByIdentifier(identifier) {
            return app.controllers.find(controller => {
                return controller.context.identifier === identifier;
            });
        },
    
        parseAjaxHtml(html) {
            const template = document.createElement('template');
            template.innerHTML = html;
            return template.content.cloneNode(true);
        },
    
        simulateNetworkDelay: async function(callback = function(){}, minStallTime = 200, maxStallTime = 5000) {
            if(app.isFrontend()) {
                const stallTime = Math.random() * (maxStallTime - minStallTime) + minStallTime;
                await new Promise(resolve => setTimeout(resolve, stallTime));
                callback();
            }
            else {
                callback();
            }
        },    
        
        // https://davidwalsh.name/javascript-debounce-function
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
    
        // http://sampsonblog.com/simple-throttle-function/
        throttle: function(callback, limit) {
            var wait = false;                 
            return function () {              
                if (!wait) {
                    callback.call();
                    wait = true;
                    setTimeout(function () {
                        wait = false;
                    }, limit);
                }
            }
        },
    
        addDelegatedEvent(element, event, selector, callback, ...thisArguments) {
            element.addEventListener(event, (e) => {
                if (e.target && e.target.matches(selector)) {
                    callback.call(this, e, thisArguments);
                }
            });
        },
    
        formSerialise(formElement) {
            return Array.from(
                new FormData(formElement),
                e => e.map(encodeURIComponent).join('=')
            ).join('&');
        },
    
        toBool(value) {
            if (typeof value === 'boolean')
                return value;
            else {
                return (value.toLowerCase() === 'true');
            }
        }
    }
    
    app.EventClass = class {
        constructor(element = document) {
            this.element = element;
            this.functionMap = {};
        }
    
        addEventListener(event, func) {
            this.functionMap[event] = func;
            this.element.addEventListener(event.split('.')[0], this.functionMap[event]);
        }
    
        removeEventListener(event) {
            this.element.removeEventListener(event.split('.')[0], this.functionMap[event]);
            delete this.functionMap[event];
        }
    }

}

module.exports = {
    setup: setup
};

