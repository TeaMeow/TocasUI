# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'slider'
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
    # 允許的最小值。
    min           : false
    # 允許的最大值。
    max           : false
    # 起始值。
    value         : false
    # 每階的數值變更階層。
    step          : false
    # 軌道。
    track:
        # 背景顏色。
        color: '#e9e9e9'
    # 進度條。
    progressBar:
        # 背景顏色。
        color: 'rgb(150, 150, 150)'
    # 當數值更改時所會呼叫的回呼函式。
    onChange      : =>
    # 當數值正在進行改變時所會呼叫的回呼函式。
    onInput       : =>

# 屬性。
Property =
    MIN     : 'min'
    MAX     : 'max'
    STEP    : 'step'
    VALUE   : 'value'
    DISABLED: 'disabled'

# 標籤。
Attribute =
    VALUE   : 'value'

# 事件名稱。
Event =
    CHANGE : "change#{EVENT_NAMESPACE}"
    INPUT  : "input#{EVENT_NAMESPACE}"

# 樣式名稱。
ClassName =
    {}

# 選擇器名稱。
Selector =
    SLIDER: 'input[type=range]'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $slider = ts()

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        set:
            value: (value) =>
                $slider.val value
                module.set.progress()
            min: (value) =>
                $slider.prop Property.MIN, value
            max: (value) =>
                $slider.prop Property.MAX, value
            step: (value) =>
                $slider.prop Property.STEP, value
            progress: =>
                value = (module.get.value() - module.get.min()) / (module.get.max() - module.get.min())
                if (value is Number.POSITIVE_INFINITY or isNaN(value))
                    value = module.get.value() / 100
                $slider.css 'background-image', "-webkit-gradient(linear, left top, right top, color-stop(#{value}, #{settings.progressBar.color}), color-stop(#{value}, #{settings.track.color}))"

        get:
            min: =>
                $slider.prop Property.MIN
            max: =>
                $slider.prop Property.MAX
            step: =>
                $slider.prop Property.STEP
            value: =>
                $slider.val()

        enable: =>
            $slider.prop Property.DISABLED, false
            return $allModules

        disable: =>
            $slider.prop Property.DISABLED, true
            return $allModules

        bind:
            events: =>
                $this.on Event.CHANGE, (event) =>
                    debug '發生 CHANGE 事件', $slider.get()
                    module.set.progress()
                    settings.onChange.call $slider.get(), event, module.get.value()
                $this.on Event.INPUT, (event) =>
                    debug '發生 INPUT 事件', $slider.get()
                    module.set.progress()
                    settings.onInput.call $slider.get(), event, module.get.value()

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化滑桿', element
            $slider = $this.find Selector.SLIDER
            module.bind.events()
            if settings.value
                module.set.value settings.value
            if settings.min
                module.set.min settings.min
            if settings.max
                module.set.max settings.max
            if settings.step
                module.set.step settings.step
            module.set.progress()

        instantiate: =>
            debug '實例化滑桿', element

        refresh: =>
            $title   = $this.find Selector.TITLE
            $content = $this.find Selector.CONTENT
            return $allModules

        destroy: =>
            debug '摧毀滑桿', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules