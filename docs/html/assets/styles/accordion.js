// Generated by CoffeeScript 2.0.0-beta4
(function() {
  // ------------------------------------------------------------------------
  // 變數與常數設置
  // ------------------------------------------------------------------------

  // 模組名稱。
  var ClassName, EVENT_NAMESPACE, Error, Event, MODULE_NAMESPACE, NAME, Selector, Settings;

  NAME = 'accordion';

  // 模組事件鍵名。
  EVENT_NAMESPACE = `.${NAME}`;

  // 模組命名空間。
  MODULE_NAMESPACE = `module-${NAME}`;

  // 模組設定。
  Settings = {
    // 消音所有提示，甚至是錯誤訊息。
    silent: false,
    // 顯示除錯訊息。
    debug: true,
    // 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true,
    // 是否僅允許單個手風琴只有一個分頁能被打開。
    exclusive: true,
    // 展開的手風琴是否可以被關閉。
    collapsible: true,
    // 當手風琴被關閉時，是否一同閉合子手風琴。
    closeNested: true,
    // 當手風琴正在展開時所會呼叫的函式。
    onOpening: () => {},
    // 當手風琴展開時所會呼叫的函式。
    onOpen: () => {},
    // 當手風琴正在關閉時所會呼叫的函式。
    onClosing: () => {},
    // 當手風琴關閉時所會呼叫的函式。
    onClose: () => {},
    // 當手風琴被切換開關時所會呼叫的函式。
    onChange: () => {}
  };

  // 事件名稱。
  Event = {
    OPENING: `opening${EVENT_NAMESPACE}`,
    OPEN: `open${EVENT_NAMESPACE}`,
    CLOSING: `closing${EVENT_NAMESPACE}`,
    CLOSE: `close${EVENT_NAMESPACE}`,
    CHANGE: `change${EVENT_NAMESPACE}`,
    CLICK: `click${EVENT_NAMESPACE}`
  };

  // 樣式名稱。
  ClassName = {
    ACTIVE: 'active',
    ANIMATING: 'animating'
  };

  // 選擇器名稱。
  Selector = {
    TITLE: '.title',
    CONTENT: '.content',
    ACCORDION: '.ts.accordion',
    ACTIVE_CONTENT: '.active.content',
    ACTIVE: '.active'
  };

  // 錯誤訊息。
  Error = {};

  // ------------------------------------------------------------------------
  // 模組註冊
  // ------------------------------------------------------------------------
  ts.register({NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) => {
    var $content, $title, module;
    // ------------------------------------------------------------------------
    // 區域變數
    // ------------------------------------------------------------------------
    $title = $this.find(Selector.TITLE);
    $content = $this.find(Selector.CONTENT);
    // ------------------------------------------------------------------------
    // 模組定義
    // ------------------------------------------------------------------------
    return module = {
      open: (index) => {
        if (module.is.active(index)) {
          return;
        }
        if (settings.exclusive) {
          debug('由於手風琴分頁同時間僅能有一個打開，因此關閉其他分頁', index, element);
          module.closeAll();
        }
        debug('開啟手風琴分頁', index, element);
        module.trigger.open(index);
        module.set.active(index);
        return $allModules;
      },
      close: (index) => {
        debug('關閉手風琴分頁', index, element);
        if (module.is.hidden(index)) {
          return;
        }
        module.trigger.close(index);
        module.set.hidden(index);
        if (settings.closeNested) {
          debug('關閉子手風琴因應設定', index, element);
          module.closeChildren();
        }
        return $allModules;
      },
      closeChildren: () => {
        return $this.find(Selector.ACCORDION).accordion('close all');
      },
      closeOthers: (index) => {
        debug('關閉指定手風琴分頁以外的其他分頁', index, element);
        module.closeAll();
        return $allModules;
      },
      closeAll: () => {
        var i, j, ref;
        debug('關閉所有手風琴分頁', element);
        for (i = j = 0, ref = $title.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          module.close(i);
        }
        return $allModules;
      },
      toggle: (index) => {
        debug('切換手風琴分頁', index, element);
        if (module.is.active(index)) {
          if (settings.collapsible) {
            module.close(index);
          } else {
            debug('手風琴不允許閉合開啟的分頁，略過切換步驟', index, element);
          }
        } else {
          module.open(index);
        }
        return $allModules;
      },
      trigger: {
        open: (index) => {
          $this.trigger(Event.OPENING, $content.eq(index).get());
          $this.trigger(Event.OPEN, $content.eq(index).get());
          return $this.trigger(Event.CHANGE, $content.eq(index).get());
        },
        close: (index) => {
          $this.trigger(Event.CLOSING, $content.eq(index).get());
          $this.trigger(Event.CLOSE, $content.eq(index).get());
          return $this.trigger(Event.CHANGE, $content.eq(index).get());
        }
      },
      is: {
        active: (index) => {
          return $title.eq(index).hasClass(ClassName.ACTIVE);
        },
        hidden: (index) => {
          return !module.is.active(index);
        }
      },
      set: {
        active: (index) => {
          $title.eq(index).addClass(ClassName.ACTIVE);
          return $content.eq(index).addClass(ClassName.ACTIVE);
        },
        hidden: (index) => {
          $title.eq(index).removeClass(ClassName.ACTIVE);
          return $content.eq(index).removeClass(ClassName.ACTIVE);
        }
      },
      bind: {
        events: () => {
          $this.on(Event.CLICK, Selector.TITLE, function() {
            debug('發生 CLICK 事件', element, this);
            return module.toggle($title.indexOf(this));
          });
          $this.on(Event.OPENING, (event, context) => {
            debug('發生 OPENING 事件', context);
            return settings.onOpening.call(context, event);
          });
          $this.on(Event.OPEN, (event, context) => {
            debug('發生 OPEN 事件', context);
            return settings.onOpen.call(context, event);
          });
          $this.on(Event.CLOSING, (event, context) => {
            debug("發生 CLOSING 事件", context);
            return settings.onClosing.call(context, event);
          });
          $this.on(Event.CLOSE, (event, context) => {
            debug("發生 CLOSE 事件", context);
            return settings.onClose.call(context, event);
          });
          return $this.on(Event.CHANGE, (event, context) => {
            debug("發生 CHANGE 事件", context);
            return settings.onChange.call(context, event);
          });
        }
      },
      // ------------------------------------------------------------------------
      // 基礎方法
      // ------------------------------------------------------------------------
      initialize: () => {
        debug('初始化手風琴', element);
        return module.bind.events();
      },
      instantiate: () => {
        return debug('實例化手風琴', element);
      },
      refresh: () => {
        $title = $this.find(Selector.TITLE);
        $content = $this.find(Selector.CONTENT);
        return $allModules;
      },
      destroy: () => {
        debug('摧毀手風琴', element);
        $this.removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        return $allModules;
      }
    };
  });

}).call(this);
