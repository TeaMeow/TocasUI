// Generated by CoffeeScript 2.0.0-beta4

// Dropdown 收縮時的 Menu 會變成跑到一個 Button 的底下。
// Selection Dropdown 點擊 Item 時好像會又展開一次然後收縮。

// <select class="selectpicker">
//   <optgroup label="Picnic">
//     <option>Mustard</option>
//     <option>Ketchup</option>
//     <option>Relish</option>
//   </optgroup>
//   <optgroup label="Camping">
//     <option>Tent</option>
//     <option>Flashlight</option>
//     <option>Toilet Paper</option>
//   </optgroup>
// </select>

// Dropdown

// 下拉式選單。
var Dropdown;

Dropdown = (function() {
  var $input;

  class Dropdown {
    constructor() {
      // Quadrant

      // 取得下拉式選單的元素象限並給予應該朝哪個方向展開。
      this.quadrant = this.quadrant.bind(this);
      // Expand

      // 展開目前的下拉式選單。
      this.expand = this.expand.bind(this);
      // Contract

      // 閉合目前的下拉式選單。
      this.contract = this.contract.bind(this);
      // Event

      // 呼叫指定的事件。
      this.event = this.event.bind(this);
      // Calculate Width

      // 透過 Canvas 計算字的真實像素長度，並且回傳，這樣能我們更方便處理響應式輸入欄位寬度。
      // 詳細用法請參考：
      // https://stackoverflow.com/a/43922708/5203951
      this.calculateWidth = this.calculateWidth.bind(this);
      // Add Label

      // 建立一個新的標籤。
      this.addLabel = this.addLabel.bind(this);
      // Remove Label

      // 移除多選下拉式選單中的一個標籤，如果沒有指定則移除最後的一個標籤。
      this.removeLabel = this.removeLabel.bind(this);
      
      this.selection = this.selection.bind(this);
      
      this.multiple = this.multiple.bind(this);
      
      this.searchMultiple = this.searchMultiple.bind(this);
      // Generator

      // 依照下拉式選單的樣式，產生相對應的模板 HTML 原始碼。
      this.generator = this.generator.bind(this);
      // Input Event

      // 處理搜尋輸入欄位的事件函式。
      this.inputEvent = this.inputEvent.bind(this);
      // 元素初始化函式。
      this.init = this.init.bind(this);
      // Select Value

      // 選擇、套用一個值。
      this.selectValue = this.selectValue.bind(this);
      // 元素摧毀函式。
      this.destroy = this.destroy.bind(this);
      // 模組可用的方法。
      this.methods = this.methods.bind(this);
    }

    quadrant() {
      var height, heightHalf, position, width, widthHalf;
      position = this.$this.get().getBoundingClientRect();
      width = window.innerWidth;
      widthHalf = width / 2;
      height = window.innerHeight;
      heightHalf = height / 2;
      if (position.left < widthHalf && position.top < heightHalf) {
        return 'top left';
      } else if (position.left < widthHalf && position.top > heightHalf) {
        return 'bottom left';
      } else if (position.left > widthHalf && position.top > heightHalf) {
        return 'bottom right';
      } else if (position.left > widthHalf && position.top < heightHalf) {
        return 'top right';
      }
    }

    expand() {
      return this.$this.css('z-index', this.zIndex.ACTIVE).removeClass(this.className.HIDDEN).addClass(`${this.className.VISIBLE} ${this.className.ANIMATING}`).one('animationend', () => {
        return this.$this.removeClass(this.className.ANIMATING);
      }).emulate('animtionend', this.duration);
    }

    contract() {
      if (!this.$this.hasClass(this.className.VISIBLE)) {
        return;
      }
      return this.$this.css('z-index', this.zIndex.MENU).removeClass(this.className.VISIBLE).addClass(`${this.className.HIDDEN} ${this.className.ANIMATING}`).one('animationend', () => {
        return this.$this.removeClass(`${this.className.ANIMATING} ${this.className.UPWARD} ${this.className.DOWNWARD} ${this.className.LEFTWARD} ${this.className.RIGHTWARD}`);
      }).emulate('animtionend', this.duration);
    }

    event(event, arg, arg2, arg3) {
      var ref;
      return (ref = this.$this.data(event)) != null ? ref.call(arg, arg2, arg3) : void 0;
    }

    calculateWidth(text, fontSize, fontName) {
      var canvas, context;
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      context.font = fontSize + fontName;
      return context.measureText(text).width;
    }

    addLabel(text, value) {
      var classes, label;
      // 移除文字和值開頭與結尾的多餘空白。
      text = text.trim();
      value = value.trim();
      // 如果文字是空白的，那麼就沒必要加入。
      if (text === '') {
        return;
      }
      // 呼叫 labelClass 函式來檢查這個標籤有沒有必要新增額外的自訂類別或語義。
      classes = this.$this.data('labelClass').call(this.$this.get(), text, value) || '';
      // 以模板初始化一個標籤元素。
      label = this.createElement(`<a class=\"${this.className.DEFAULT_LABEL} ${classes}\" data-value=\"${value}\">\n    ${text}\n    <button class=\"${this.className.DEFAULT_BUTTON}\"></button>\n</a>`);
      // 呼叫標籤建立函式，並且將自己傳遞過去取得回傳後的自己。
      // 這樣能讓開發者更方便對此標籤進行改變。
      label = this.event('onLabelCreate', label, text, value);
      // 監聽這個標籤裡的關閉按鈕事件。
      $selector(label).find(this.selector.DEFAULT_BUTTON).on('click', () => {
        //@removeLabel(text, value)
        return $selector(label).remove();
      });
      // 如果回傳的標籤沒有問題，而且是正常的 HTML 元素。
      if (label !== false && label instanceof HTMLElement) {
        // 那麼就可以插入到標籤容器中了。
        return this.$this.find(this.selector.LABELS).append(label);
      }
    }

    removeLabel() {
      var labels;
      // 尋找多選下拉式選單裡的所有標籤。
      labels = this.$this.find(this.selector.LABEL);
      // 當標籤數量大於零時。
      if (labels.length > 0) {
        // 選出最後一個新增的標籤，然後移除。
        return labels.eq(labels.length - 1).remove();
      }
    }

    selection() {}

    multiple() {}

    searchMultiple() {}

    generator() {}

    inputEvent(event) {
      // 如果事件種類是 `input` 就執行輸入欄位的長度計算，然後離開。
      // 因為我們同時監聽 `keydown` 和 `input` 事件，避免重複觸發。
      if (event.type === 'input') {
        // 以欄位內的文字作為基礎來更改搜尋欄位的長度，也就是響應式長度。
        this.$input.css('width', this.calculateWidth(this.$input.get().value, this.$input.css('font-size'), this.$input.css('font-family')));
        return;
      }
      // 如果沒有接收到按鍵代號的話就離開。
      if (!event.keyCode) {
        return;
      }
      // 依照按鍵代號執行不同的事情。
      switch (event.keyCode) {
        // Enter 按鍵。
        case 13:
          // 建立使用者輸入的自訂標籤。
          this.addLabel(this.$input.val(), this.$input.val());
          // 重設輸入欄位的值、寬度，並且重新聚焦在該欄位上。
          return this.$input.val('').css('width', '1em').get().focus();
        // Backspace 按鍵。
        case 8:
          // 如果輸入欄位這個時候只有空白，但使用者又按下 Backspace 的話。
          if (this.$input.val().trim() === '') {
            // 就表示使用者想移除最後一個新增的標籤。
            return this.removeLabel();
          }
          break;
        // 上按鍵。
        case 38:
          break;
        // 下按鍵。
        case 40:
          break;
        // 左按鍵。
        case 37:
          break;
        // 右按鍵。
        case 39:
          break;
      }
    }

    init() {
      // 監聽頁面的點擊事件，當點擊非下拉式選單的元素時就收合所有選單。
      $selector(document).off('click.dropdown').on('click.dropdown', (event) => {
        var $target, noDropdownParent, notDropdown;
        // 取得此次點擊的目標。
        $target = $selector(event.target);
        // 一個表明點擊目標是不是沒有下拉式選單父容器的布林值。
        noDropdownParent = $target.closest(this.selector.NOT_BASIC_DROPDOWN).length === 0;
        // 表明點擊目標並不是下拉式選單的布林值。
        notDropdown = !$target.hasClass(this.className.DROPDOWN);
        // 如果點擊的目標不是下拉式選單內的元素，也不是下拉式選單本體。
        if (noDropdownParent && notDropdown) {
          // 那麼就隱藏所有可見的下拉式選單。
          return ts(this.selector.VISIBLE_DROPDOWN).dropdown('hide');
        }
      });
      // 找出下拉式選單內的搜尋輸入欄位。
      this.$input = this.$this.find('input.search');
      // 監聽下拉式選單內搜尋欄位的輸入事件。
      this.$input.on('keydown input', this.inputEvent);
      // 當下拉式選單被點擊時的監聽事件。
      this.$this.on('click', (event) => {
        var $target, dropdownParent, isCloseButton, isDropdown, isItem, isMultiple, isSelection, isVisible, itemParent, labelsParent, menuParent, multipleParent, ref, targetSelection;
        // 如果使用者沒有手動設置選單應該向何處展開的話。
        if (!this.$this.hasClass(this.className.DOWNWARD) && !this.$this.hasClass(this.className.UPWARD) && !this.$this.hasClass(this.className.RIGHTWARD) && !this.$this.hasClass(this.className.LEFTWARD)) {
          // 就取得選單的象限，然後依此決定要往哪個方向展開。
          switch (this.quadrant()) {
            case 'top left':
              this.$this.addClass(`${this.className.DOWNWARD} ${this.className.RIGHTWARD}`);
              break;
            case 'top right':
              this.$this.addClass(`${this.className.DOWNWARD} ${this.className.LEFTWARD}`);
              break;
            case 'bottom left':
              this.$this.addClass(`${this.className.UPWARD} ${this.className.RIGHTWARD}`);
              break;
            case 'bottom right':
              this.$this.addClass(`${this.className.UPWARD} ${this.className.LEFTWARD}`);
          }
        }
        // 取得事件點擊的目標對象。
        $target = $selector(event.target);
        // 自己是不是下拉式選單。
        isDropdown = this.$this.hasClass(this.className.DROPDOWN);
        // 自己是不是選擇用下拉式選單。
        isSelection = this.$this.hasClass(this.className.SELECTION);
        // 自己是不是可多選的下拉式選單。
        isMultiple = this.$this.hasClass(this.className.MULTIPLE);
        // 自己目前可不可見。
        isVisible = this.$this.hasClass(this.className.VISIBLE);
        // 點擊目標是否為選擇用下拉式選單。
        targetSelection = $target.hasClass(`${this.className.SELECTION}`);
        // 點擊目標的父容器是否為多選下拉式選單。
        multipleParent = $target.parent().hasClass(this.className.MULTIPLE);
        // 點擊目標是不是一個項目。
        isItem = $target.hasClass(this.className.ITEM);
        // 點擊目標的父容器是否為一個下拉式選單。
        dropdownParent = $target.parent().hasClass(this.className.DROPDOWN);
        // 點擊目標的父容器是否為選單。
        menuParent = $target.parent().hasClass(this.className.MENU);
        // 點擊目標的父容器是否為一個項目。
        itemParent = $target.parent().hasClass(this.className.ITEM);
        // 點擊目標的父容器是否為標籤容器。
        labelsParent = $target.parent().hasClass(this.className.LABELS);
        // 點擊目標是否為標籤裡的一個關閉按鈕。
        isCloseButton = $target.hasClass(this.className.CLOSE);
        switch (false) {
          // 如果點擊的是一個標籤裡的關閉按鈕。
          // 基於相關條件執行處理相對應的點擊動作。
          case !isCloseButton:
            // 就不要做任何動作。
            break;
          // 如果點擊的是選單內的項目。
          case !isItem:
            // 如果下拉式選單是可供多選的話。
            if (isMultiple) {
              
              this.addLabel($target.html(), $target.attr('data-value'));
            }
            // 如果下拉式選單是可供選擇的話。
            if (isSelection) {
              this.selectValue($target.html(), $target.attr('data-value'));
            }
            // 觸發選擇事件，並呼叫相關回呼函式。
            this.event('onSelect', this.$this.get(), $target.attr('data-value'), $target.get());
            // 接著隱藏所有下拉式選單。
            return ts(this.selector.DROPDOWN).dropdown('hide');
          
          case !(targetSelection || multipleParent || labelsParent || !isCloseButton):
            if (!isVisible) {
              this.expand();
            }
            return (ref = this.$this.find(this.selector.SEARCH).get()) != null ? ref.focus() : void 0;
          // 如果點擊的是下拉式選單本體，或是下拉式選單中的圖示與文字。
          case !(isDropdown || dropdownParent):
            // 就隱藏所有下拉式選單。
            ts(this.selector.DROPDOWN).dropdown('hide');
            // 如果下拉式選單本身原本是不可見的話，現在就是時候展開了。
            if (!isVisible) {
              return this.expand();
            }
        }
      });
      return ts.fn;
    }

    selectValue(text, value) {
      this.$this.find('.item').removeClass('selected active');
      this.$this.find(`.item[data-value='${value}']`).addClass('selected active');
      return this.$this.find(':scope > .text').removeClass('default').html(text);
    }

    destroy() {}

    methods() {
      return {
        // Change Values

        // 更改可選下拉式選單中的所有值為新值。
        'change valuess': (values) => {
          return ts.fn;
        },
        // Toggle

        // 切換下拉式選單的可見度，若原本顯示則閉合，相反之。
        toggle: () => {
          return ts.fn;
        },
        // Show

        // 展開一個下拉式選單。
        show: () => {
          this.expand();
          return ts.fn;
        },
        // Hide

        // 收合一個下拉式選單。
        hide: () => {
          this.contract();
          return ts.fn;
        },
        // Clear

        clear: () => {
          return ts.fn;
        },
        // Hide Others

        'hide others': () => {
          return ts.fn;
        },
        // Restore Defaults

        'restore defaults': () => {
          return ts.fn;
        },
        // Restore Placeholder Text

        'restore placeholder text': () => {
          return ts.fn;
        },
        // Restore Default Value

        'restore default value': () => {
          return ts.fn;
        },
        // Save Defaults

        'save defaults': () => {
          return ts.fn;
        },
        // Set Selected

        'set selected': () => {
          return ts.fn;
        },
        // Removed Selected

        'remove selected': () => {
          return ts.fn;
        },
        // Set Exactly

        'set exactly': () => {
          return ts.fn;
        },
        // Set Text

        // 設置可選下拉式選單的文字。
        'set text': () => {
          return ts.fn;
        },
        // Set Value

        // 設置可選下拉式選單的值。
        'set value': () => {
          return ts.fn;
        },
        // Get Text

        // 取得目前可選下拉式選單所顯示的文字。
        'get text': () => {},
        // Get Value

        // 取得目前可選下拉式選單所選擇的值。
        'get value': () => {},
        // Get Item

        // 取得目前可選下拉式選單所選擇的項目元素。
        'get item': () => {},
        // Set Active

        'set active': () => {
          return ts.fn;
        },
        // Set Visible

        'set visible': () => {
          return ts.fn;
        },
        // Remove Active

        'remove active': () => {
          return ts.fn;
        },
        // Remove Visible

        'remove visible': () => {
          return ts.fn;
        },
        // Is Selection

        'is selection': () => {},
        // Is Animated

        'is animated': () => {},
        // Is Visible

        // 回傳一個此下拉式選單是否正處於展開狀態的布林值。
        'is visible': () => {},
        // Is Hidden

        // 回傳一個此下拉式選單是否正處於收合隱藏狀態的布林值。
        'is hidden': () => {},
        // Get Default Text

        // 取得預設的文字。
        'get default text': () => {},
        // Get Placeholder Text

        'get placeholder text': () => {}
      };
    }

  };

  // 模組名稱。
  Dropdown.module = 'dropdown';

  // 模組屬性。
  Dropdown.prototype.props = {
    // 當選單的值被變動時所會呼叫的回呼函式。
    onChange: (value, text, element) => {},
    // 當多選選單多選了一個值所會呼叫的回呼函式。
    onAdd: (addedValue, addedText, addedElement) => {},
    // 當多選選單有一個值被移除時所會呼叫的回呼函式。
    onRemove: (removedValue, removedText, removedElement) => {},
    // 當使用者在多選選單自創了一個新的值所會呼叫的回呼函式。
    onLabelCreate: function(value, text) {
      return this;
    },
    
    // {
    //     image: ''
    //     icon: ''
    //    emphasis: ''
    //    class: ''
    // }

    // 當使用者再多選選單移除了一個值所會呼叫的回呼函式。
    onLabelRemove: (value, text) => {},
    // 當使用者選取或按壓多選選單其中一個標籤時所會呼叫的回呼函式。
    onLabelSelect: (value, text, element) => {},
    // 當使用者在選單中輸入文字時所呼叫的回呼函式。
    onInput: () => {},
    // 當沒有相符搜尋內容所會呼叫的回呼函式。
    onNoResults: () => {},
    // 當選單展開時所呼叫的回呼函式。
    onShow: () => {},
    // 當選單隱藏時所呼叫的回呼函式。
    onHide: () => {},
    // 當使用者按下選單中其中一個選項時所呼叫的回呼函式。
    onSelect: (value, element) => {},
    // 用以初始化選單內容的選項，當這個選項是 `false` 而不是陣列的時候會從 HTML 架構初始化。
    values: false,
    // 開啟選單的事件名稱，可以是 `click`、`hover`。
    on: 'click',
    
    labelClass: (text, value) => {
      return null;
    },
    
    allowReselection: false,
    
    allowAdditions: false,
    
    hideAdditions: true,
    
    action: 'auto',
    // 搜尋的底限字數，超過此字數才會開始搜尋。
    minCharacters: 1,
    // 搜尋時的依據，可用：`both` 符合文字或值、`value` 符合值、`text` 符合文字。
    match: 'both',
    
    selectOnKeydown: true,
    
    forceSelection: true,
    
    allowCategorySelection: false,
    
    placeholder: 'auto',
    // 多選選單是否使用標籤？若設置為 `false` 會以「已選擇 x 個」純文字替代標籤。
    useLabels: true,
    // 多選選單最多可以選擇幾個項目？設置為 `0` 表示無限。
    maxSelections: 0,
    
    storedData: {
      default: '',
      placeholder: '',
      values: []
    },
    
    storedDefaultData: {
      default: '',
      placeholder: '',
      values: []
    },
    
    selectedData: {
      text: null,
      value: null,
      element: null
    }
  };

  
  // 類別樣式名稱。
  Dropdown.prototype.className = {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    ANIMATING: 'animating',
    DROPDOWN: 'dropdown',
    TEXT: 'text',
    ICON: 'icon',
    IMAGE: 'image',
    ITEM: 'item',
    MENU: 'menu',
    UPWARD: 'upward',
    DOWNWARD: 'downward',
    LEFTWARD: 'leftward',
    RIGHTWARD: 'rightward',
    SELECTION: 'selection',
    MULTIPLE: 'multiple',
    LABELS: 'labels',
    CLOSE: 'close',
    DEFAULT_LABEL: 'ts compact label',
    DEFAULT_BUTTON: 'ts tiny close button'
  };

  // 選擇器名稱。
  Dropdown.prototype.selector = {
    DROPDOWN: '.ts.dropdown',
    VISIBLE_DROPDOWN: '.ts.visible.dropdown',
    MENU: '.ts.menu',
    NOT_BASIC_DROPDOWN: '.ts.dropdown:not(.basic)',
    DEFAULT_BUTTON: '.ts.tiny.close.button',
    LABEL: ':scope > .labels > .ts.label',
    LABELS: ':scope > .labels',
    SEARCH: 'input.search'
  };

  //.ts.dropdown:not(.basic).visible

  // 下拉式選單所會用到的 z 軸索引。
  Dropdown.prototype.zIndex = {
    MENU: 9,
    ACTIVE: 10,
    HOVERED: 11
  };

  
  $input = null;

  // 下拉式選單的動畫時間。
  Dropdown.prototype.duration = 300;

  return Dropdown;

})();

ts(Dropdown);
