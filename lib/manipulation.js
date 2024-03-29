Rye.define('Manipulation', function(){

    var util = Rye.require('Util')

    function getValue(element) {
        if (element.multiple) {
            return new Rye(element).find('option').filter(function(option) {
                return option.selected && !option.disabled
            }).pluck('value')
        }
        return element.value
    }

    function getAttribute(element, name) {
        if (name === 'value' && element.nodeName == 'INPUT') {
            return getValue(element)
        }
        return element.getAttribute(name)
    }

    this.text = function (text) {
        if (text == null) {
            return this.elements[0] && this.elements[0].textContent
        }
        return this.each(function(element){
            element.textContent = text
        })
    }

    this.html = function (html) {
        if (html == null) {
            return this.elements[0] && this.elements[0].innerHTML
        }
        return this.each(function(element){
            element.innerHTML = html
        })
    }

    this.empty = function () {
        return this.put('innerHTML', '')
    }

    this.append = function (html) {
        if (typeof html === 'string') {
            this.each(function(element){
                element.insertAdjacentHTML('beforeend', html)
            })

        } else if (util.isElement(html)) {
            if (this.length == 1) {
                this.elements[0].appendChild(html)
            } else {
                this.each(function(element){
                    element.appendChild(html.cloneNode(true))
                })
            }
        }
        return this
    }

    this.prepend = function (html) {
        if (typeof html === 'string') {
            this.each(function(element){
                element.insertAdjacentHTML('afterbegin', html)
            })
        } else if (util.isElement(html)) {
            this.each(function(element, i){
                var first = new Rye(element).children().get(0)
                  , node = i > 0 ? html.cloneNode(true) : html
                if (first) {
                    element.insertBefore(node, first)
                } else {
                    element.appendChild(node)
                }
            })
        }
        return this
    }

    this.after = function (html) {
        if (typeof html === 'string') {
            this.each(function(element){
                element.insertAdjacentHTML('afterend', html)
            })

        } else if (util.isElement(html)) {
            this.each(function(element, i){
                var next = new Rye(element).next().get(0)
                  , node = i > 0 ? html.cloneNode(true) : html
                if (next) {
                    element.parentNode.insertBefore(node, next)
                } else {
                    element.parentNode.appendChild(node)
                }
            })

        }
        return this
    }

    this.before = function (html) {
        if (typeof html === 'string') {
            this.each(function(element){
                element.insertAdjacentHTML('beforebegin', html)
            })

        } else if (util.isElement(html)) {
            if (this.length == 1){
                this.elements[0].parentNode.insertBefore(html, this.elements[0])
            } else {
                this.each(function(element){
                    element.parentNode.insertBefore(html.cloneNode(true), element)
                })
            }
        }
        return this
    }

    this.clone = function () {
        return this.map(function(element){
            return element.cloneNode(true)
        })
    }

    this.val = function (value) {
        if (value == null) {
            return this.elements[0] && getValue(this.elements[0])
        }
        return this.each(function(element){
            element.value = value
        })
    }

    this.attr = function (name, value) {
        if (typeof name === 'object'){
            return this.each(function(element){
                util.each(name, function(value, key){
                    element.setAttribute(key, value)
                })
            })
        }
        return typeof value === 'undefined'
          ? this.elements[0] && getAttribute(this.elements[0], name)
          : this.each(function(element){
                element.setAttribute(name, value)
            })
    }

    this.prop = function (name, value) {
        if (typeof name === 'object'){
            return this.each(function(element){
                util.each(name, function(value, key){
                    element[key] = value
                })
            })
        }
        return typeof value === 'undefined'
          ? this.elements[0] && this.elements[0][name]
          : this.put(name, value)
    }

    return {
        getValue     : getValue
      , getAttribute : getAttribute
    }
})