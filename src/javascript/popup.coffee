# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'popup'
# 模組事件鍵名。
EVENT_NAMESPACE  = ".#{NAME}"
# 模組命名空間。
MODULE_NAMESPACE = "module-#{NAME}"

# 模組設定。
Settings =
    # 消音所有提示，甚至是錯誤訊息。
    silent        : false
    # 顯示除錯訊息。
    debug         : true
    # 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true
    # 欲使用的彈出式訊息元素選擇器（如果已經有先建立好的話），`false` 的話則是即時產生。
    popup         : false
    # 同時是否僅能有一個彈出式訊息出現在螢幕上。
    exclusive     : false
    # 彈出式訊息的邊界元素，彈出式訊息會試圖不要超過這個元素。
    boundary      : 'body'
    # 即時產生的彈出式訊息應該要被擺置在哪個元素內。
    context       : 'body'
    # 此彈出式訊息偵測畫面是否有捲動的元素選擇器，如果指定元素有捲動事件則會自動隱藏此彈出式訊息。
    scrollContext : window
    # 如果有指定邊緣選擇器，彈出訊息則會試著依靠這個父元素的邊緣，適合用於表格的標頭等。
    edgeContext   : false
    # 偏好的彈出式訊息出現位置。
    position      : 'top'
    # 欲觸發彈出式訊息的事件，如：`click`、`hover`、`focus`。
    on            : 'hover'
    # 觸發的延遲毫秒數。
    delay         :
        # 欲顯示彈出式訊息前所需的毫秒數。
        show: 50
        # 隱藏彈出式訊息前所等待的毫秒數。
        hide: 0
    # 過場動畫。
    transition    : 'auto'
    # 過場動畫的演繹毫秒時間。
    duration      : 'auto'
    # 游標是否能在彈出式訊息遊走，如：導覽式彈出選單。
    hoverable     : false
    # 是否能在點擊彈出式訊息以外的地方自動關閉。
    closable      : true
    # 是否要在指定捲動時自動隱藏此彈出式訊息。
    hideOnScroll  : 'auto'
    # 是否帶有指標外觀。
    pointing      : true
    # 是否為反色外觀。
    inverted      : false
    # 大小尺寸。
    size          : 'medium'
    # 目標元素選擇器，彈出式訊息會以這個元素為主。
    target        : false
    # 欲套用的樣式名稱，以空白分隔。
    variation     : false
    # 內容純文字。
    content       : false
    # 標題純文字。
    title         : false
    # 彈出式訊息的 HTML 內容，如果採用此屬性則會忽略 `content` 與 `title`。
    html          : false
    # 當彈出式訊息被建立時所會呼叫的回呼函式。
    onCreate      : =>
    # 當彈出式訊息不再被需要且從頁面上移除時所會呼叫的回呼函式。
    onRemove      : =>
    # 當彈出式訊息開始顯示時所會呼叫的回呼函式，回傳 `false` 將會停止顯示。
    onShow        : => true
    # 當彈出式訊息動畫結束並顯示在畫面上時所會呼叫的回呼函式。
    onVisible     : =>
    # 當彈出式訊息開始消失時所會呼叫的回呼函式，回傳 `false` 將會避免消失。
    onHide        : => true
    # 當彈出式訊息已經完全消失時所會呼叫的回呼函式。
    onHidden      : =>
    # 當彈出式訊息無法在畫面上產生或放置（不合適尺寸）時所會呼叫的回呼函式。
    onUnplaceable : =>

# 事件名稱。
Event =
    CREATE      : "create#{EVENT_NAMESPACE}"
    REMOVE      : "remove#{EVENT_NAMESPACE}"
    SHOW        : "show#{EVENT_NAMESPACE}"
    VISIBLE     : "visible#{EVENT_NAMESPACE}"
    HIDE        : "hide#{EVENT_NAMESPACE}"
    HIDDEN      : "hidden#{EVENT_NAMESPACE}"
    UNPLACEABLE : "unplaceable#{EVENT_NAMESPACE}"
    CLICK       : "click#{EVENT_NAMESPACE}"
    FOCUS       : "focus#{EVENT_NAMESPACE}"
    SCROLL      : "scroll#{EVENT_NAMESPACE}"
    MOUSEMOVE   : "mousemove#{EVENT_NAMESPACE}"
    MOUSEENTER  : "mouseenter#{EVENT_NAMESPACE}"
    MOUSELEAVE  : "mouseleave#{EVENT_NAMESPACE}"
    MOUSEOUT    : "mouseout#{EVENT_NAMESPACE}"
    ANIMATIONEND: 'animationend'

# 樣式名稱。
ClassName =
    TOP      : 'top'
    LEFT     : 'left'
    RIGHT    : 'right'
    BOTTOM   : 'bottom'
    CENTER   : 'center'
    VISIBLE  : 'visible'
    ANIMATING: 'animating'
    HIDDEN   : 'hidden'
    CUSTOM   : 'custom'
    POPUP    : 'ts popup'
    TITLE    : 'title'
    CONTENT  : 'content'
    ARROW    : 'arrow'
    HOVERABLE: 'hoverable'
    MEDIUM   : 'medium'
    INVERTED : 'inverted'
    POINTING : 'pointing'
    SIZES    : 'mini tiny small medium large big huge massive'

# 位置。
Position =
    TOP   : 'top'
    BOTTOM: 'bottom'
    LEFT  : 'left'
    RIGHT : 'right'

# 中繼資料。
Metadata =
    SHOW_TIMER: 'showTimer'
    HIDE_TIMER: 'hideTimer'

# 選擇器名稱。
Selector =
    BODY : 'body'
    DIV  : '<div>'
    ARROW: '.arrow'
    POPUP: '.ts.popup'

# 元素標籤。
Attribute =
    CONTENT   : 'data-content'
    HTML      : 'data-html'
    TITLE     : 'data-title'
    VARIATION : 'data-variation'
    TRANSITION: 'data-popup-transition'
    POSITION  : 'data-position'
    STYLE     : 'style'

# 錯誤訊息。
Error = {}

# 過場動畫毫秒。
duration = 200

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $body          = ts Selector.BODY
    $popup         = ts()
    $boundary      = ts()
    popupRect      = {}
    rect           = {}
    boundaryRect   = {}
    boundary       = null
    $scrollContext = ts()
    scrollContext  = null
    offset         = 20
    padding = 10

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show: (callback) =>
            module.remove.timers()
            if module.is.animating()
                return
            if module.is.visible()
                return
            module.calculate.popup.position()
            module.animate.show =>
                module.set.animating false
                callback.call() if callback?
            return $allModules

        hide: (callback) =>
            module.remove.timers()
            if module.is.animating()
                return
            if module.is.hidden()
                return
            module.animate.hide =>
                module.set.animating false
                callback.call() if callback?
            return $allModules

        hideAll: =>
            return $allModules

        remove:
            timers: =>
                module.remove.show.timer()
                module.remove.hide.timer()
            show:
                timer: =>
                    $this.removeTimer Metadata.SHOW_TIMER
            hide:
                timer: =>
                    $this.removeTimer Metadata.HIDE_TIMER

        set:
            position: (position) =>
                $popup.attr Attribute.POSITION, position
            transition: (transition) =>
                settings.transition = transition
                $popup.attr Attribute.TRANSITION, transition
                if settings.duration is 'auto'
                    switch settings.transition
                        when 'fade'
                            duration = 300
            pointing: (value) =>
                settings.pointing = value
                if value
                    $popup.addClass ClassName.POINTING
                else
                    $popup.removeClass ClassName.POINTING
            inverted: (value) =>
                settings.inverted = value
                if value
                    $popup.addClass ClassName.INVERTED
                else
                    $popup.removeClass ClassName.INVERTED
            hoverable: (value) =>
                settings.hoverable = value
                if value
                    $popup.addClass ClassName.HOVERABLE
                else
                    $popup.removeClass ClassName.HOVERABLE
            boundary: (selector) =>
                $boundary = $this.closest selector
                boundary  = $boundary.get()
            scrollContext: (selector) =>
                $scrollContext = ts selector
                scrollContext  = $scrollContext.get()
            coordinate: (x, y) =>
                $popup.css
                    top : x
                    left: y
            width: (width) =>
                $popup.css
                    width: width
            animating: (value) =>
                if value
                    $popup.addClass ClassName.ANIMATING
                else
                    $popup.removeClass ClassName.ANIMATING
            size: (size) =>
                $popup
                    .removeClass ClassName.SIZES
                    .addClass    size
                return $allModules
            show:
                timer: =>
                    $this.setTimer
                        name    : Metadata.SHOW_TIMER
                        callback: module.show
                        interval: settings.delay.show
                        looping : false
                        visible : true
            hide:
                timer: =>
                    $this.setTimer
                        name    : Metadata.HIDE_TIMER
                        callback: module.hide
                        interval: settings.delay.hide
                        looping : false
                        visible : true

        get:
            $popup: =>
                if $popup.exists()
                    return $popup
                $next = $this.next()
                if $next.is Selector.POPUP
                    $popup = $next
                else
                    module.create.popup()
                $arrow = ts Selector.DIV
                    .addClass ClassName.ARROW
                    .appendTo $popup
                return $popup
            distance: =>
                bRect  = {...boundaryRect.toJSON()}
                isBody = $boundary.is Selector.BODY
                if isBody
                    bRect.top    = 0
                    bRect.left   = 0
                    bRect.bottom = 0
                    bRect.width  = boundary.clientWidth
                    bRect.height = boundary.clientHeight
                    bRect.right  = 0
                top    = rect.top - bRect.top
                left   = rect.left - bRect.left
                right  = (bRect.left + bRect.width) - (rect.left + rect.width)
                bottom = (bRect.top + bRect.height) - (rect.top + rect.height)
                if isBody
                    right  = bRect.width - (rect.left + rect.width)
                    bottom = bRect.height - (rect.top + rect.height)
                return {
                    top
                    left
                    right
                    bottom
                    boundary: bRect
                }
            directions: =>
                {top, left, right, bottom} = module.get.distance()
                return
                    top   : top    > popupRect.height
                    right : right  > popupRect.width
                    bottom: bottom > popupRect.height
                    left  : left   > popupRect.width
            position: =>
                return $popup.attr Attribute.POSITION

        reposition:
            arrow: =>
                $arrow = $popup
                    .find       Selector.ARROW
                    .removeAttr Attribute.STYLE
                setTimeout =>
                    module.refresh()
                    switch module.get.position()
                        when Position.TOP
                            $arrow.css
                                left: (rect.left + rect.width / 2) - popupRect.left - 8 - 2
                                top : popupRect.height - 2
                        when Position.RIGHT
                            $arrow.css
                                left: -20
                                top : (rect.top + rect.height / 2) - popupRect.top - 8 - 2
                        when Position.BOTTOM
                            $arrow.css
                                left: (rect.left + rect.width / 2) - popupRect.left - 8 - 2
                                top : -20
                        when Position.LEFT
                            $arrow.css
                                left: popupRect.width - 2
                                top : (rect.top + rect.height / 2) - popupRect.top - 8 - 2
                , 0

        calculate:
            arrow: =>




            popup:
                position: =>
                    module.refresh()
                    {right, bottom} = module.get.distance()
                    directions      = module.get.directions()
                    top             = element.offsetTop
                    left            = element.offsetLeft
                    position        = ''

                    switch settings.position
                        when Position.TOP
                            position = Position.TOP if directions.top
                        when Position.RIGHT
                            position = Position.RIGHT if directions.right
                        when Position.BOTTOM
                            position = Position.BOTTOM if directions.bottom
                        when Position.LEFT
                            position = Position.LEFT if directions.left

                    if position isnt settings.position
                        switch
                            when directions.top
                                position = Position.TOP
                            when directions.bottom
                                position = Position.BOTTOM
                            when directions.right
                                position = Position.RIGHT
                            when directions.left
                                position = Position.LEFT

                    position = Position.BOTTOM

                    switch position
                        when Position.TOP
                            $popup.css
                                left: (left + rect.width / 2) - popupRect.width / 2
                                top : top - popupRect.height
                        when Position.RIGHT
                            $popup.css
                                left: left + rect.width
                                top : (top  + rect.height / 2) - popupRect.height / 2
                        when Position.BOTTOM
                            $popup.css
                                left: (left + rect.width / 2) - popupRect.width / 2
                                top : top  + rect.height
                        when Position.LEFT
                            $popup.css
                                left: left - popupRect.width
                                top : (top  + rect.height / 2) - popupRect.height / 2

                    switch position
                        when Position.TOP, Position.BOTTOM
                            if popupRect.width / 2 > left
                                $popup.css
                                    left: 0
                            if rect.left < popupRect.width / 2
                                if rect.left > padding + 20
                                    $popup.css
                                        left: left - (left - Math.abs(boundaryRect.left))
                                else
                                    $popup.css
                                        left: left
                            else if right < popupRect.width / 2
                                if right > padding + 20
                                    $popup.css
                                        left: left - popupRect.width + right
                                else
                                    $popup.css
                                        left: left + rect.width - popupRect.width
                        when Position.LEFT, Position.RIGHT
                            if rect.top < popupRect.height / 2
                                if rect.top > padding + 20
                                    $popup.css
                                        top: top - (top - Math.abs(boundaryRect.top)) + padding
                                else
                                    $popup.css
                                        top: top
                            else if bottom < popupRect.height / 2
                                if bottom > padding + 20
                                    $popup.css
                                        top: top - popupRect.height + bottom + padding
                                else
                                    $popup.css
                                        top: top + rect.height - popupRect.height

                    module.set.position position
                    module.reposition.arrow()

        toggle: =>
            if module.is.hidden()
                module.show()
            else
                module.hide()
            return $allModules

        change:
            title: (title) =>
                $popup
                    .find Selector.TITLE
                    .html title
                return $allModules
            content: (content) =>
                $popup
                    .find Selector.CONTENT
                    .html content
                return $allModules
            html: (html) =>
                $popup.html html
                return $allModules

        animate:
            show: (callback) =>
                $popup
                    .addClass "#{ClassName.VISIBLE} #{ClassName.ANIMATING}"
                    .off      Event.ANIMATIONEND
                    .one      Event.ANIMATIONEND, =>
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration
            hide: (callback) =>
                $popup
                    .removeClass ClassName.VISIBLE
                    .addClass    ClassName.ANIMATING
                    .one         Event.ANIMATIONEND, =>
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration

        is:
            visible: =>
                $popup.hasClass ClassName.VISIBLE
            hidden: =>
                not module.is.visible()
            showing: =>
                $this.hasTimer Metadata.SHOW_TIMER
            hiding: =>
                $this.hasTimer Metadata.HIDE_TIMER
            animating: =>
                $popup.hasClass ClassName.ANIMATING
            hoverable: =>
                settings.hoverable is true

        create:
            popup: =>
                variation = settings.variation or ''
                content   = settings.content   or ''
                html      = settings.html      or ''
                title     = settings.title     or ''
                attr      =
                    variation: $this.attr Attribute.VARIATION
                    content  : $this.attr Attribute.CONTENT
                    title    : $this.attr Attribute.TITLE
                    html     : $this.attr Attribute.HTML

                if attr.variation isnt null
                    variation = attr.variation
                if attr.content isnt null
                    content = attr.content
                if attr.title isnt null
                    title = attr.title
                if attr.html isnt null
                    html = attr.html

                $popup = ts Selector.DIV
                    .addClass "#{ClassName.POPUP} #{variation}"
                if html isnt ''
                    $popup.html html
                if content isnt ''
                    $content = ts Selector.DIV
                        .addClass ClassName.CONTENT
                        .html     content
                    $title = ts Selector.DIV
                        .addClass ClassName.TITLE
                        .html     title
                    if title isnt ''
                        $popup.append $title
                    $popup.append $content
                $popup.insertAfter $this

        exists: =>

        repaint: =>
            $popup.repaint()

        #reposition: =>

        #remove:
        #    popup: =>

        trigger: =>

        bind:
            hover: =>
                $body.on Event.MOUSEMOVE, (event) =>
                    if not $popup.exists()
                        return

                    pointElement = ts.fromPoint(event.clientX, event.clientY).get()
                    popupElement = $popup.get()

                    isPointingSelf  = $this.is       pointElement
                    isPointingChild = $this.contains pointElement

                    if isPointingSelf or isPointingChild
                        module.remove.hide.timer()
                        if not module.is.showing()
                            module.set.show.timer()
                        return

                    if not module.is.hoverable()
                        module.remove.show.timer()
                        if not module.is.hiding()
                            module.set.hide.timer()
                        return

                    if $popup.contains pointElement
                        $this.removeTimer Metadata.HIDE_TIMER
                        return

                    module.refresh()

                    switch module.get.position()
                        when Position.TOP
                            if event.clientY > popupRect.bottom and event.clientY < rect.top and event.clientX < popupRect.right and event.clientX > popupRect.left
                                return
                        when Position.RIGHT
                            if event.clientY < popupRect.bottom and event.clientY > popupRect.top and event.clientX < popupRect.left and event.clientX > rect.right
                                return
                        when Position.BOTTOM
                            if event.clientY > rect.bottom and event.clientY < popupRect.top and event.clientX < popupRect.right and event.clientX > popupRect.left
                                return
                        when Position.LEFT
                            if event.clientY < popupRect.bottom and event.clientY > popupRect.top and event.clientX < rect.left and event.clientX > popupRect.right
                                return

                    module.remove.show.timer()

                    if not module.is.hiding()
                        module.set.hide.timer()
            click: =>
                $body.on Event.CLICK, (event) =>
                    pointElement    = ts.fromPoint(event.clientX, event.clientY).get()
                    isPointingSelf  = $this.is        pointElement
                    isPointingPopup = $popup.contains pointElement
                    if isPointingSelf
                        module.toggle()
                        return
                    if not isPointingPopup and settings.closable
                        module.hide()

            focus: =>
            scroll: =>
                $scrollContext.on Event.SCROLL, =>
                    module.hide()
            events: =>
                switch settings.on
                    when 'hover'
                        module.bind.hover()
                    when 'click'
                        module.bind.click()
                    when 'focus'
                        module.bind.focus()
                if settings.hideOnScroll is 'auto'
                    if settings.on is 'hover'
                        module.bind.scroll()
                if settings.hideOnScroll is true
                    module.bind.scroll()


        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化彈出式訊息', element

            $popup = module.get.$popup()

            if $this.attr(Attribute.POSITION) isnt null
                settings.position = $this.attr Attribute.POSITION
                module.set.position settings.position

            module.set.hoverable     settings.hoverable
            module.set.size          settings.size
            module.set.transition    settings.transition
            module.set.inverted      settings.inverted
            module.set.pointing      settings.pointing
            module.set.boundary      settings.boundary
            module.set.scrollContext settings.scrollContext
            module.bind.events()

        instantiate: =>
            debug '實例化彈出式訊息', element

        refresh: =>
            rect         = $this.rect()
            popupRect    = $popup.rect()
            boundaryRect = $boundary.rect()
            return $allModules

        destroy: =>
            debug '摧毀彈出式訊息', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules