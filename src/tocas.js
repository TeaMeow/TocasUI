var Tocas = (function ()
{
    var ts,
        emptyArray          = [],
        slice               = emptyArray.slice,
        filter              = emptyArray.filter,
        queue               = [],
        tocas              = {},
        isArray             = Array.isArray || function(obj){ return obj instanceof Array  },
        isObject            = function(obj){ return obj instanceof Object },
        isEmptyOrWhiteSpace = function(str){ return str === null || str.match(/^\s*$/) !== null },
        dropzoneNumber      = 0;

    /** Filter those thing which is we don't need it */
    function compact(array)
    {
        return filter.call(array, function(item){ return item != null; });
    }

    tocas.init = function(selector, context)
    {
        var dom;

        /** If Selector is a normal string */
        if(typeof selector == 'string')
        {
            if(selector[0] == '<')
                return tocas.fragment(selector);

            /** Remove the space */
            selector = selector.trim();

            if(typeof context != 'undefined')
                return ts(selector).find(context);

            dom = tocas.select(document, selector);
        }
        else if(tocas.isTocas(selector))
        {
            return selector;
        }
        else
        {
            /** Filter for eq function */
            if(isArray(selector))
                dom = compact(selector);
            /** If Selector is object, which means it may generated by Tocas */
            else if(isObject(selector))
                dom = [selector], selector = null;
        }

        return tocas.Tocas(dom, selector);
    }

    tocas.fragment = function(selector)
    {
        var noContent    = /^<([^\/].*?)>$/,
            regEx        = /(?:<)(.*?)( .*?)?(?:>)/,
            match        = regEx.exec(selector),
            // <div class="foo" bar="BARRRR">
            mainAll      = match[0],
            // div
            mainElement  = match[1],
            // class="foo" bar="BARRRR"
            mainAttrs    = match[2],
            hasAttr      = typeof mainAttrs !== 'undefined',
            hasContent   = !mainAll.match(noContent);



        /** Is this tag IS a container tag? (ex: div, section) */
        if(hasContent)
        {
            /** Catch the content of it */
            var contentRegEx = new RegExp(mainAll + '(.*?)(?:<\/' + mainElement + '>)$'),
                contentMatch = contentRegEx.exec(selector),
                content      = contentMatch[1];
        }


        /** Split Attrs into an array like this [KEY, VALUE, KEY, VALUE] */
        if(hasAttr)
        {
            var attrs   = mainAttrs.split(/(?:\s)?(.*?)=(?:"|')(.*?)(?:"|')/).filter(Boolean),
                attrObj = {};

            /** Get odd and even values, convert [KEY, VALUE, KEY, VALUE] to {KEY: VALUE, KEY: VALUE} */
            for(var i = 0; i < attrs.length; i++)
                if( (i + 2) % 2 == 0)
                     attrObj[attrs[i]] = attrs[i + 1];
        }

        var $element = ts(document.createElement(mainElement));

        if(hasAttr)
            $element.attr(attrObj);

        if(hasContent)
            $element.html(content);

        return $element;
    }



    tocas.isTocas = function(obj)
    {
        return obj instanceof tocas.Tocas;
    }

    tocas.select = function(element, selector)
    {
        try
        {
            return slice.call(element.querySelectorAll(selector));
        }
        catch(e)
        {
            console.log('TOCAS ERROR: Something wrong while selecting ' + selector + ' element.');
        }
    }

    tocas.Tocas = function(dom, selector)
    {
        dom           = dom || [];
        dom.__proto__ = ts.fn;
        dom.selector  = selector || '';

        return dom;
    }




    /**
     * $
     *
     * Call to Init to get everything ready.
     */

    ts = function(selector, context)
    {
        if(typeof selector == 'function')
            document.addEventListener('DOMContentLoaded', selector)
        else
            return tocas.init(selector, context);
    };




    /**
     * Library
     */

    ts.fn =
    {
        /**
         * Each
         */

        each: function(callback)
        {
            emptyArray.every.call(this, function(index, element)
            {
                return callback.call(index, element, index) !== false;
            });

            return this;
        },




        /**
         * Slice
         */

        slice: function()
        {
            /** Regenerate a new object */
            return ts(slice.apply(this, arguments));
        },




        /**
         * Eq
         *
         * Jump to target element.
         */

        eq: function(index)
        {
            return this.slice(index, index + 1);
        }


}

    if(!window.ts) window.ts = ts;

})(Tocas);

ts.fn.on = function(eventName, selector, handler, once)
{
    once            = once || false
    var hasSelector = true
    
    if(typeof selector !== 'string')
    {
        hasSelector = false
        handler     = selector
    }
    
    if(typeof handler !== 'function')
        once = handler
    
    /**
     * [ts_eventHandler]
     *
     *        registered   :bool
     *      /
     * Click      func :func
     *      \   /
     *       [0] 
     *          \
     *            once :bool         
     */
    
    return this.each(function()
    {
        if(typeof this.addEventListener == 'undefined')
        {
            console.log('TOCAS ERROR: Event listener is not worked with this element.');
            return false;
        }
        
        /** If the main event list of the element is not existed, we create one */
        if(typeof this.ts_eventHandler == 'undefined')
            this.ts_eventHandler = {};
        
        /** Split the event by space */
        var events = eventName.split(' ');
        
        for(var i in events)
        {
            var event = events[i];
            
            /** If the event handler list is not existed, we create an object, we will store function in here */
            /** so if someone triggered the event, we can just call this list. */
            if(typeof this.ts_eventHandler[event] == 'undefined')
                this.ts_eventHandler[event] = {registered: false, list: []};
            
            /** Bind if haven't bind yet */
            if(this.ts_eventHandler[event].registered === false)
            {
                this.addEventListener(event, function(evt)
                {
                    /** Just make sure this event still existed */
                    if(typeof this.ts_eventHandler[event] != 'undefined')
                    {
                        /** Execute all of the functions */
                        for(var e in this.ts_eventHandler[event].list)
                        {
                            /** If there's a selector */
                            if(typeof this.ts_eventHandler[event].list[e].selector !== 'undefined')
                            {
                                var inSelector = false;
                                
                                /** If this element is in the selector, then we set InSelector as true */
                                ts(this.ts_eventHandler[event].list[e].selector).each(function(i, el)
                                {
                                    if(evt.target === el) inSelector = true;
                                })
                                
                                /** We won't call this function if this elements which is triggered is not in the selector */
                                if(!inSelector) return;
                            }
                            
                            /** Execute */
                            this.ts_eventHandler[event].list[e].func.call(this, evt);
                            
                            /** If "once" is true, we remove it after call it */
                            if(this.ts_eventHandler[event].list[e].once)
                                delete this.ts_eventHandler[event].list[e];
                        }
                    }
                })
                
                this.ts_eventHandler[event].registered = true;
            }

            /** Push handler or anonymous function into that event list */
            var eventHandler = this.ts_eventHandler[event].list,
                data         = {func: handler, once: once};
            
            /** Store the selector if there's selector */     
            if(hasSelector)
                data.selector = selector;
                
            /** Store the function info*/
            eventHandler.push(data);
            
            this.ts_eventHandler[event].list = eventHandler;
        }
    })
}



ts.fn.one = function(eventName, selector, handler)
{   
    return this.each(function()
    {
        /** Set "once" true, it will auto remove once we call it */
        ts(this).on(eventName, selector, handler, true);
    });
}

        


ts.fn.off = function(eventName, handler)
{
    return this.each(function()
    {
        /** No list no talk */
        if(typeof this.ts_eventHandler            == 'undefined') return;
        if(typeof this.ts_eventHandler[eventName] == 'undefined') return;

        /** If there's no handler name, we remove all handler */
        if(handler == null)
        {
            this.ts_eventHandler[eventName].list = [];
            return; 
        }
        
        /** Otherwise we search for the index of function, then remove it */
        for(var e in this.ts_eventHandler[eventName].list)
            if(handler === this.ts_eventHandler[eventName].list[e].func) 
                delete this.ts_eventHandler[eventName].list[e];
    });
}

/**
 * CSS
 *
 * Set CSS to elements or get CSS from elements.
 *
 * @param mixed      property   Can be a object and the key as the css property, and the value as the property value.
 * @param int|string value      The value of the css property.
 *
 * @return mixed
 */

ts.fn.css = function(property, value)
{
    var css = '';

    /** Set single CSS : If CSS and content is not empty, then set the CSS */
    if(property != null && value != null)
    {
        css = property + ':' + value + ';';
    }
    /** Set multi CSS : If CSS is a Object */
    else if(typeof property === 'object' && !Array.isArray(property) && value == null)
    {
        for(var i in property)
            if(property.hasOwnProperty(i))
                css += i + ':' + property[i] + ';';
    }
    /** Get multi CSS : If style name is a array and have only key */
    else if(Array.isArray(property) && value == null)
    {
        var cssObject = {};

        this.each(function(){ for(var i in property) cssObject[property[i]] = ts(this).getCss(property[i]); })

        return cssObject;
    }
    /** Get single CSS : If only style name */
    else if(property != null && value == null)
    {
        return ts(this).getCss(property);
    }

    return this.each(function()
    {
        if(typeof this.style == 'undefined')
            return;

        this.style.cssText = this.style.cssText + css;
    })
}




/**
 * Has Class
 *
 * Returns true when the class(es) does exist.
 *
 * @param string classes   The class name, can be a list split by the space.
 *
 * @return bool
 */

ts.fn.hasClass = function(classes)
{
    if(0 in this)
        if(this[0].classList)
            return this[0].classList.contains(classes);
        else
            return new RegExp('(^| )' + classes + '( |$)', 'gi').test(this[0].className);
}




/**
 * Class List
 *
 * Returns a class list of the element.
 *
 * @return array
 */

ts.fn.classList = function()
{
    var classes = [];

    if(0 in this)
        if(this[0].classList)
            for(var i=0; i<this[0].classList.length; i++)
                classes.push(this[0].classList[i]);
        else
            for(var i in this[0].className.split(' '))
                classes.push(this[0].className.split(' ')[i]);

    return classes;
}




/**
 * Add Class
 *
 * Add a single or multiple classes to an element.
 *
 * @param string classes   The name of the class, can be a list split by space.
 *
 * @return object
 */

ts.fn.addClass = function(classes)
{
    if(classes === null)
        return;

    return this.each(function()
    {
        var list = classes.split(' ');

        for(var i in list)
        {
            if(list[i] === '')
                continue;

            if(this.classList)
                this.classList.add(list[i]);
            else
                this.className += ' ' + list[i];
        }
    });
}




/**
 * Remove Class
 *
 * Remove a single or multiple classes of the element.
 *
 * @param string classes   The name of the class can be a list split by the space.
 *
 * @return object
 */

ts.fn.removeClass = function(classes)
{
    return this.each(function()
    {
        if(!classes)
        {
            this.className = '';
        }
        else
        {
            var list = classes.split(' ');

            for(var i in list)
            {
                if(list[i] == '')
                    continue;

                /** If there's classList, the just remove it from classList, otherwise we replace the string which is in the (class="")*/
                if(this.classList)
                    this.classList.remove(list[i]);
                else if(typeof this.className !== 'undefined')
                    this.className = this.className.replace(new RegExp('(^|\\b)' + classes.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    })
}




/**
 * Toggle Class
 *
 * Toggle a single or multiple classes, add the class when the class is not existed, and remove the class when it does exist.
 *
 * @param string classes   The name of the class, can be a list split by the space.
 *
 * @return object
 */

ts.fn.toggleClass = function(classes)
{
    return this.each(function()
    {
        var list, index, objClassList;

        list = classes.split(' ');

        for(var i in list)
        {
            if(this.classList)
            {
                this.classList.toggle(list[i])
            }
            else
            {
                /** Split the class */
                objClassList = this.className.split(' ');
                /** Is the class in class list already? */
                index = list.indexOf(list[i]);

                /** If already existed, we remove it, otherwise we add it */
                if(index >= 0)
                    objClassList.splice(index, 1);
                else
                    objClassList.push(list[i]);

                this.className = list[i].join(' ');
            }
        }
    });
}


/**
 * Get CSS
 */

ts.fn.getCss = function(property)
{
    /** Get computed style */
    try
    {
        return 0 in this ? document.defaultView.getComputedStyle(this[0], null).getPropertyValue(property) : null;
    }
    catch(err)
    {
        return null;
    }
}

ts.fn.remove = function()
{
    return this.each(function(){ this.parentNode.removeChild(this) });
}




ts.fn.children = function()
{
    var list = [];

    this.each(function(i, el)
    {
        /** Push the child nodes to the list*/
        list.push.apply(list, el.children);
    })

    /** Return the list with $ */
    return ts(list);
}



ts.fn.find = function(selector)
{
    /** The selector must be string */
    if(typeof selector !== 'string')
        return null;

    var list = [];

    this.each(function(i, el)
    {
        /** Push the child nodes to the list*/
        list.push.apply(list, el.querySelectorAll(selector));
    });

    /** Return the list with $ */
    return list.length ? ts(list) : null;
}




        /**
         * Parent
         */

        ts.fn.parent = function()
        {
            return 0 in this ? ts(this[0].parentNode) : null;
        }




        ts.fn.parents = function(selector)
        {
            var that     = this,
                selector = selector || null,
                parents  = [];

            if(selector !== null)
                var selector = ts(selector);

            /** Non stop loop, until there's no parent of the element */
            while(that)
            {
                /** Not this one, we go upper */
                that = ts(that).parent()[0];

                /** No parent? */
                if(!that)
                    break;

                /** Push to the parents list if it's in the selector or just push it if we don't set a selector */
                if(selector == null || (selector !== null && Array.prototype.indexOf.call(selector, that) !== -1))
                    parents.push(that);
            }

            return ts(parents);
        }





        ts.fn.closest = function(selector)
        {
            var that     = this,
                selector = ts(selector);

            /** Non stop loop, until there's no parent of the element */
            while(true)
            {
                /** Not this one, we go upper */
                that = ts(that).parent()[0];

                /** No parent? */
                if(!that)
                    return null;

                /** Is the parent in the closest selector? If it do, then the parent is the closest element which we want */
                if(Array.prototype.indexOf.call(selector, that) !== -1)
                    return ts(that);
            }
        }



        ts.fn.contains = function(wants)
        {
            var selector = ts(wants),
                isTrue   = false;

            this.each(function(i, el)
            {
                var children = el.childNodes;

                for(var si = 0; si < selector.length; si++)
                {
                    if(Array.prototype.indexOf.call(children, selector[si]) != -1)
                        isTrue = true;
                }
            });

            return isTrue;
        }