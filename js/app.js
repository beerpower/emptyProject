(function () {
    console.log('begin');

    Util = (function () {
        function Util() {}

        Util.prototype.extend = function (custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value;
                }
            }
            return custom;
        };

        Util.prototype.isMobile = function (agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
        };

        Util.prototype.createEvent = function (event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false;
            }
            if (cancel == null) {
                cancel = false;
            }
            if (detail == null) {
                detail = null;
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent('CustomEvent');
                customEvent.initCustomEvent(event, bubble, cancel, detail);
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event;
            } else {
                customEvent.eventName = event;
            }
            return customEvent;
        };

        Util.prototype.emitEvent = function (elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event);
            } else if (event in (elem != null)) {
                return elem[event]();
            } else if (("on" + event) in (elem != null)) {
                return elem["on" + event]();
            }
        };

        Util.prototype.addEvent = function (elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false);
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn);
            } else {
                return elem[event] = fn;
            }
        };

        Util.prototype.removeEvent = function (elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false);
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn);
            } else {
                return delete elem[event];
            }
        };

        Util.prototype.innerHeight = function () {
            if ('innerHeight' in window) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        };

        return Util;

    })();

    this.Karamba = (function () {

        Karamba.prototype.defaults = {
            itemClass: 'karamba'

        };

        function Karamba() {
            console.log('Karamba definition');
        }


        Karamba.prototype.init = function () {
            console.log('Karamba init');

            var ref;
            this.pageElements = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                this.util().addEvent(document, 'DOMContentLoaded', this.start);
            }
            return this.finished = [];

            /*document.addEventListener("DOMContentLoaded", function (event) {
                var elements = document.getElementsByClassName('karamba');

                for (var i = 0; i < elements.length; i++) {
                    ele = elements[i];
                    ele.className = ele.className + ' animated'; 

                }
            })*/
        }

        Karamba.prototype.start = function () {
            console.log('Karamba stat', Karamba);
        }
        
        Karamba.prototype.util = function() {
            console.log('Karamba util');
            return this._util != null ? this._util : this._util = new Util();
        };

        console.log('Karamba 1', this);
        return Karamba;
    })();
     console.log('Karamba 2', this);
}).call(this);

new Karamba().init();