// Generated by CoffeeScript 2.0.0-beta4
// Dropdown

// 下拉式選單。
var Dropdown;

Dropdown = (function() {
  class Dropdown {
    constructor() {
      // Quadrant

      // 取得下拉式選單的元素象限並給予應該朝哪個方向展開。
      this.quadrant = this.quadrant.bind(this);
      
      this.selection = this.selection.bind(this);
      
      this.searchSelection = this.searchSelection.bind(this);
      
      this.multipleSelection = this.multipleSelection.bind(this);
      
      this.multipleSearchSelection = this.multipleSearchSelection.bind(this);
      // Set Quadrant

      // 取得選單的象限，並以此為據向某方向展開。
      this.setQuadrant = this.setQuadrant.bind(this);
      // Expand

      // 展開目前的下拉式選單。
      this.expand = this.expand.bind(this);
      // Contract

      // 閉合目前的下拉式選單。
      this.contract = this.contract.bind(this);
      // Convertor

      // 從現有的 `<select>` 元素中取得相關資料並且轉換成可供 Tocas Dropdown 模組解析的物件。
      this.convertor = this.convertor.bind(this);
      // Generator

      // 依照下拉式選單的樣式，產生相對應的模板 HTML 原始碼。
      this.generator = this.generator.bind(this);
      // Document Listener

      // 頁面監聽器。
      this.documentListener = this.documentListener.bind(this);
      // Add Value

      // 建立新值。
      this.addValue = this.addValue.bind(this);
      // Placeholder Listener

      this.watchText = this.watchText.bind(this);
      // Search Listener

      // 搜尋輸入欄位的輸入監聽事件。
      this.searchListener = this.searchListener.bind(this);
      // Message

      // 控制「找不到資料」訊息元素的可見度。
      this.message = this.message.bind(this);
      // Filter

      // 依照輸入的值來過濾沒必要的選項元素並將其隱藏。
      this.filter = this.filter.bind(this);
      // Scroll To Selected

      // 將選單的捲軸位置捲到選擇的元素。
      this.scrollToSelected = this.scrollToSelected.bind(this);
      // Dropdown Listener

      // 下拉式選單點擊事件監聽函式。
      this.dropdownListener = this.dropdownListener.bind(this);
      // Event

      // 呼叫指定的事件。
      this.event = this.event.bind(this);
      // Add Label

      // 建立一個新的標籤。
      this.addLabel = this.addLabel.bind(this);
      // Remove Label

      // 移除多選下拉式選單中的一個標籤，如果沒有指定則移除最後的一個標籤。
      this.removeLabel = this.removeLabel.bind(this);
      // Unselect

      // 取消選取某個選項。
      this.unselect = this.unselect.bind(this);
      
      this.removeOption = this.removeOption.bind(this);
      // Change Value

      // 更改一個下拉式選單的選擇值，並與 `<select>` 同步。
      this.changeValue = this.changeValue.bind(this);
      // Resync

      // 將下拉式選單的內容資料與真實的 `<select>` 同步，此為單向同步，從 `<select>` 同步到選單資料。
      this.resync = this.resync.bind(this);
      // Set Text

      // 設置下拉式選單的文字。
      this.setText = this.setText.bind(this);
      // Repaint

      // 依據下拉式選單的內容（須先與 `<select>` 同步）資料來重新繪製下拉式選單的真實樣貌。
      this.repaint = this.repaint.bind(this);
      // 元素初始化函式。
      this.init = this.init.bind(this);
      // Data

      // 取得下拉式選單的資料，這個資料是從 `<select>` 所取得並整理的。
      this.data = this.data.bind(this);
      // Get Option

      // 依照傳入的索引取得相對應的選項資料。
      this.getOption = this.getOption.bind(this);
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

    selection() {}

    searchSelection() {}

    multipleSelection() {}

    multipleSearchSelection() {}

    setQuadrant() {
      // 如果使用者沒有手動設置選單應該向何處展開的話。
      if (!this.$this.hasClass(this.className.DOWNWARD) && !this.$this.hasClass(this.className.UPWARD) && !this.$this.hasClass(this.className.RIGHTWARD) && !this.$this.hasClass(this.className.LEFTWARD)) {
        // 就取得選單的象限，然後依此決定要往哪個方向展開。
        switch (this.quadrant()) {
          case 'top left':
            return this.$this.addClass(`${this.className.DOWNWARD} ${this.className.RIGHTWARD}`);
          case 'top right':
            return this.$this.addClass(`${this.className.DOWNWARD} ${this.className.LEFTWARD}`);
          case 'bottom left':
            return this.$this.addClass(`${this.className.UPWARD} ${this.className.RIGHTWARD}`);
          case 'bottom right':
            return this.$this.addClass(`${this.className.UPWARD} ${this.className.LEFTWARD}`);
        }
      }
    }

    expand() {
      // 設置選單的展開方向。
      this.setQuadrant();
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

    convertor($select) {
      var multiple, placeholder, searchable, selectData, selected, values;
      // 如果這個選單不是一個 `select` 元素就離開。
      if (!$select.is('select')) {
        return false;
      }
      // 是否可供多選。
      multiple = $select.attr('multiple') != null;
      // 是否可供輸入搜尋。
      searchable = $select.hasClass('search');
      // 現有且可供使用的值。
      values = {};
      // 已選取的值。
      selected = null;
      // 預置文字內容。
      placeholder = null;
      // 取得每一個選項，推入選項陣列中。
      $select.find('option').each((element) => {
        var $element, isDisabled, isSelected, text, value;
        // 已選擇器選取此選項。
        $element = $selector(element);
        // 取得此選項的值。
        value = $element.val();
        // 取得此選項的 HTML 內容或者純文字。
        text = $element.attr('data-text') || $element.text();
        // 這個選項是否已選擇。
        isSelected = $element.attr('selected') != null;
        // 這個選項是否已停用。
        isDisabled = $element.attr('disabled') != null;
        // 將這個選項存入總值物件中。
        values[value] = {
          text: text,
          selected: isSelected,
          disabled: isDisabled
        };
        // 如果這個選項有被選擇的話，則保存這個值為預設選擇值。
        if (isSelected) {
          selected = value;
        }
        // 如果這個的值是空的話，則作為預置文字。
        if (value === '') {
          return placeholder = text;
        }
      });
      // 集合本次的所有資料。
      selectData = {multiple, searchable, $select, values, selected, placeholder};
      // 儲存到 Tocas 下拉式選單中，這樣就能確保選單與 `select` 元素的內容相符。
      this.data().save(selectData);
      // 回傳這個新的同步資料。
      return selectData;
    }

    generator(data) {
      var $selection, classes, hiddenField, items, labelContainer, message, option, placeholder, ref, ref1, searchInput, selectedText, selection, text, value;
      
      items = '';
      
      hiddenField = '';
      
      labelContainer = '';
      
      searchInput = '';
      
      placeholder = '';
      
      selectedText = '';
      
      classes = 'selection';
      // 如果這個選單有選項的話。
      if (data.values != null) {
        ref = data.values;
        // 遍歷並根據每個選項來產生一個項目的 HTML。
        for (value in ref) {
          option = ref[value];
          // 單個下拉式選單項目。
          items += `<div class=\"item\" data-value=\"${value}\">\n    ${option.text}\n</div>`;
        }
      }
      // 如果這個下拉式選單可供搜尋的話。
      if (data.searchable) {
        // 加上搜尋樣式。
        classes += ' search';
        // 建立供使用者輸入的搜尋輸入欄位。
        searchInput = "<input type=\"text\" class=\"search\">";
      }
      // 初始化一個空的文字容器。
      text = "<div class=\"text\"></div>";
      // 如果有選擇的值。
      if (data.selected != null) {
        // 就將文字容器改為已選擇值的文字。
        text = `<div class=\"text\">${data.values[data.selected].text}</div>`;
      // 不然如果有預置文字但沒有已選值的話。
      } else if (data.placeholder != null) {
        // 在沒有值的情況下所使用的預置文字。
        text = `<div class=\"placeholder text\">${data.placeholder}</div>`;
      }
      // 如果這個下拉式選單是可供多選的話。
      if (data.multiple) {
        // 就加入多選樣式。
        classes += ' multiple';
        // 建立用以擺置標籤的主容器。
        labelContainer = "<div class=\"labels\"></div>";
      }
      // 初始化一個無資料的訊息提示元素。
      message = "<div class=\"message\">No results found.</div>";
      // 總結並組合以上所有元素成為單一個 Tocas 下拉式選單。
      selection = `<div class=\"ts ${classes} dropdown\">\n    ${hiddenField}\n    ${labelContainer}\n    ${searchInput}\n    ${text}\n    <div class=\"menu\">\n        ${items}\n        ${message}\n    </div>\n</div>`;
      // 將這個結合的 HTML 建立成一個元素。
      selection = this.createElement(selection);
      if ((ref1 = data.$select) != null) {
        ref1.clone().removeAttr('class').prependTo(selection);
      }
      // 用選擇器選取這個新的元素。
      $selection = $selector(selection);
      // 如果這個新選單允許搜尋的話，就監聽搜尋欄位的輸入事件。
      if (data.searchable) {
        $selection.find('input.search').on('keydown input', this.searchListener);
      }
      // 回傳選擇器。
      return $selection;
    }

    documentListener(event) {
      var $target, noDropdownParent;
      // 取得此次點擊的目標。
      $target = $selector(event.target);
      // 點擊目標是不是沒有下拉式選單父容器的布林值。
      noDropdownParent = $target.closest('.ts.dropdown').length === 0;
      // 如果點擊的目標不是下拉式選單內的元素，也不是下拉式選單本體。
      if (noDropdownParent) {
        // 那麼就隱藏所有可見的下拉式選單。
        return ts(this.selector.VISIBLE_DROPDOWN).dropdown('hide');
      }
    }

    addValue(text, value) {
      var htmlText;
      // 如果這個值早已存在，那麼就略過。
      if (this.getOption(value) !== void 0) {
        return;
      }
      // 取得 HTML 文字。
      htmlText = text;
      // 取得一般文字。
      text = $selector('<div>').html(text).text();
      // 將新的元素推入至 `select` 元素中。
      this.$this.find('select').append(`<option value=\"${value}\" data-text=\"${htmlText}\">${text}</option>`);
      // 將新項目推入至選單中。
      this.$this.find('.menu').append(`<div class=\"item\" data-value=\"${value}\">${htmlText}</div>`);
      this.resync();
      return this.repaint();
    }

    watchText() {
      var data, ref, value;
      
      data = this.data().get();
      // 取得搜尋輸入欄位的值。
      value = (ref = this.$this.find('input.search').val()) != null ? ref.trim() : void 0;
      
      if (value === void 0) {
        value = '';
      }
      // 如果搜尋輸入欄位的值是空的，就顯示原本選取的值。
      if (value === '') {
        if (data.multiple && this.$this.find('.labels .label').length === 0) {
          return this.$this.find('.text').removeClass('filtered');
        } else if (!data.multiple) {
          return this.$this.find('.text').removeClass('filtered');
        } else {
          return this.$this.find('.text').addClass('filtered');
        }
      } else {
        // 如果不是空的則隱藏選取值的文字。
        return this.$this.find('.text').addClass('filtered');
      }
    }

    searchListener(event) {
      var $input, calculateWidth, value;
      // 用選擇器選取輸入欄位。
      $input = $selector(event.target);
      // 取得輸入欄位的值。
      value = $input.val();
      // Calculate Width

      // 透過 Canvas 計算字的真實像素長度，並且回傳，這樣能我們更方便處理響應式輸入欄位寬度。
      // 詳細用法請參考：
      // https://stackoverflow.com/a/43922708/5203951
      calculateWidth = () => {
        var canvas, context;
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
        context.font = $input.css('font-size') + $input.css('font-family');
        return context.measureText($input.val()).width;
      };
      // 如果事件種類是 `input` 就執行輸入欄位的長度計算，然後離開。
      // 因為我們同時監聽 `keydown` 和 `input` 事件，避免重複觸發。
      if (event.type === 'input') {
        
        this.filter(value);
        
        if (this.data().get().multiple) {
          // 以欄位內的文字作為基礎來更改搜尋欄位的長度，也就是響應式長度。
          $input.css('width', calculateWidth());
        }
        
        this.watchText();
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
          // 建立使用者輸入的值。
          this.addValue(value, value);
          // 建立一個新的標籤。
          this.addLabel(value);
          // 更改選取的值為這個新建立的值。
          this.changeValue(value);
          // 重設輸入欄位的值、寬度，並且重新聚焦在該欄位上。
          return $input.val('').css('width', '1em').get().focus();
        // Backspace 按鍵。
        case 8:
          // 如果輸入欄位的游標在第一個，而且使用者又按下 Backspace 的話。
          if ($input.get().selectionStart === 0) {
            // 就移除最後一個新增的標籤。
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

    message(action) {
      switch (action) {
        case 'show':
          return this.$this.find('.message').addClass('active');
        case 'hide':
          return this.$this.find('.message').removeClass('active');
      }
    }

    filter(value) {
      var $filtered, $items, fullTextSearch, items;
      // 取得所有項目。
      $items = this.$this.find('.menu .item');
      // 是否允許全文搜尋。
      fullTextSearch = this.$this.data('fullTextSearch');
      // 移除所有已過濾的值，並且重新過濾一次。
      items = $items.removeClass('filtered').toArray().filter((item) => {
        // 如果允許全文搜尋。
        if (fullTextSearch) {
          // 檢查選項裡的文字是不是有包含搜尋的值。
          return !item.innerText.trim().toLowerCase().includes(value.toLowerCase());
        } else {
          // 檢查選項裡的文字開頭是不是跟搜尋的值類似。
          return !item.innerText.trim().toLowerCase().startsWith(value.toLowerCase());
        }
      });
      // 用選擇器選擇所有該過濾的選項元素。
      $filtered = $selector(items);
      // 如果要過濾的選項數量跟原先的項目數量ㄧ樣。
      if ($filtered.length === $items.length) {
        // 那麼就顯示無資料訊息。
        this.message('show');
      } else {
        this.message('hide');
      }
      // 過濾該過濾的項目元素。
      return $filtered.addClass('filtered');
    }

    scrollToSelected() {
      var offsetTop, ref;
      offsetTop = (ref = this.$this.find('.menu .item.selected').get()) != null ? ref.offsetTop : void 0;
      return this.$this.find('.menu').get().scrollTop = offsetTop;
    }

    dropdownListener(event) {
      var $item, $target, data, isCloseButton, isDropdown, isInput, isItem, isMultiple, isVisible, ref;
      // 以選擇器選擇點擊目標，這不一定是下拉式選單本身。
      $target = $selector(event.target);
      // 是否點擊一個標籤移除按鈕。
      isCloseButton = $target.closest('.ts.close.button').length !== 0;
      // 點擊的目標是不是在下拉式選單內且並不是一個項目也不是一個標籤。
      isDropdown = $target.closest('.dropdown').length !== 0 && $target.closest('.item').length === 0 && $target.closest('.labels').length === 0;
      
      isMultiple = this.$this.hasClass('multiple');
      // 點擊的目標是不是輸入欄位。
      isInput = $target.closest('input').length !== 0;
      // 點擊的目標是不是一個項目。
      isItem = $target.closest('.item').length !== 0;
      
      isVisible = this.$this.hasClass('visible');
      switch (false) {
        // 如果是標籤的移除按鈕。
        // 依照不同的點擊目標處理不同的事。
        case !isCloseButton:
          break;
        // 如果是下拉式選單本身。
        case !isDropdown:
          // 關閉所有正在開啟的下拉式選單。
          if (!isInput) {
            ts(this.selector.VISIBLE_DROPDOWN).dropdown('hide');
          }
          // 如果點擊的下拉式選單不是展開的話。
          if (!isVisible) {
            // 展開下拉式選單。
            this.expand();
          }
          // 如果下拉式選單不是多選的話。
          if (!this.$this.hasClass('multiple')) {
            // 將選單捲動到選擇的那一個選項。
            this.scrollToSelected();
            
            this.$this.find('.menu .item').removeClass('filtered');
          }
          // 如果這個下拉式選單可供搜尋的話。
          if (this.$this.hasClass('search')) {
            return (ref = this.$this.find(this.selector.SEARCH).get()) != null ? ref.focus() : void 0;
          }
          break;
        // 如果是第一次在行動裝置上點擊，就展開列表。
        // 當展開列表時又被點擊一次才聚焦在輸入欄位上，避免一展開選單，就會呼叫輸入鍵盤阻擋螢幕位置。

        // 如果點擊的是項目。
        case !isItem:
          // 取得點擊的項目本身。
          $item = $target.closest('.item');
          // 更改下拉式選單所選擇的值到點擊的新值。
          this.changeValue($item.attr('data-value'));
          // 取得下拉式選單的資料。
          data = this.data().get();
          // 如果選單不是多選的話。
          if (!data.multiple) {
            // 清除搜尋輸入欄位的值。
            this.$this.find('input.search').val('');
            
            this.watchText();
            // 點擊項目後就關閉下拉式選單。
            this.contract();
          }
          // 如果選單是多選，但是已經沒有項目可供選擇的話。
          if (data.multiple && this.$this.find('select option:not([selected])').length === 1) {
            // 關閉下拉式選單。
            return this.contract();
          }
      }
    }

    event() {}

    addLabel(value) {
      var classes, label, option, text;
      option = this.getOption(value);
      if (option === void 0) {
        return;
      }
      // 移除文字和值開頭與結尾的多餘空白。
      text = option.text.trim();
      value = value.trim();
      // 如果文字是空白的，那麼就沒必要加入。
      if (text === '') {
        return;
      }
      // 呼叫 labelClass 函式來檢查這個標籤有沒有必要新增額外的自訂類別或語義。
      classes = this.$this.data('labelClass').call(this.$this.get(), text, value) || '';
      // 以模板初始化一個標籤元素。
      label = this.createElement(`<a class=\"${this.className.DEFAULT_LABEL} ${classes}\" data-value=\"${value}\">\n    ${text}\n    <button class=\"${this.className.DEFAULT_BUTTON}\"></button>\n</a>`);
      // 監聽這個標籤裡的關閉按鈕事件。
      $selector(label).find(this.selector.DEFAULT_BUTTON).on('click', async() => {
        await this.delay();
        return this.removeLabel(value);
      });
      // 如果回傳的標籤沒有問題，而且是正常的 HTML 元素。
      if (label !== false && label instanceof HTMLElement) {
        // 那麼就可以插入到標籤容器中了。
        this.$this.find(this.selector.LABELS).append(label);
        
        this.watchText();
        // 插入之後隱藏這個值在選單內的項目。
        return this.$this.find(`.menu .item[data-value='${value}']`).addClass('selected active filtered');
      }
    }

    removeLabel(value = null) {
      var $label;
      // 取得這個值相對應的標籤。
      $label = this.$this.find(`.labels .label[data-value='${value}']`);
      // 如果無法取得標籤。
      if ($label.length === 0) {
        // 就以最後新增的標籤為主。
        $label = this.$this.find('.labels .label').last();
        // 值則從最後新增的標籤取得。
        value = $label.attr('data-value');
      }
      // 移除這個標籤。
      $label.remove();
      
      this.unselect(value);
      
      this.watchText();
      // 重新渲染。
      this.resync();
      return this.repaint();
    }

    unselect(value) {
      // 在 `select` 中尋找相對應的選項元素，然後取消選取。
      this.$this.find(`select option[value='${value}']`).removeAttr('selected');
      // 顯示選單裡相對應的選項，因為原本被藏起來了。
      return this.$this.find(`.menu .item[data-value='${value}']`).removeClass('filtered');
    }

    removeOption(value) {}

    changeValue(value) {
      var data;
      // 取得選單資料。
      data = this.data().get();
      // 如果選單不是多選的話。
      if (!data.multiple) {
        // 將所有選項都取消選取。
        this.$this.find('select option').removeAttr('selected');
      }
      // 找到相對應的選項，然後選取。
      this.$this.find(`select option[value='${value}']`).attr('selected', 'selected');
      // 重新渲染。
      this.resync();
      return this.repaint();
    }

    resync() {
      
      return this.convertor(this.$this.find('select'));
    }

    setText(type, text) {
      var $text;
      // 尋找下拉式選單內的文字項目。
      $text = this.$this.find('.text');
      // 依照文字種類執行相對應的動作。
      switch (type) {
        // 如果是值文字的話就移除預置樣式。
        case 'text':
          $text.removeClass('placeholder');
          break;
        // 如果是預置文字的話就增加預置樣式。
        case 'placeholder':
          $text.addClass('placeholder');
      }
      // 設置文字。
      return $text.html(text);
    }

    repaint() {
      var allSelected, data, option, ref, value;
      // 取得現有的選單資料。
      data = this.data().get();
      switch (false) {
        // 如果有選取的值。
        // 基於現有的選取值進行決定。
        case data.selected == null:
          // 取得這個值的文字並且套用到選單上。
          this.setText('text', data.values[data.selected].text);
          // 在選單裡將這個選取的選項套用選取樣式。
          this.$this.find(`.menu .item[data-value='${data.selected}']`).addClass('selected active');
          break;
        // 如果有預置文字的話。
        case data.placeholder == null:
          this.setText('placeholder', data.placeholder);
          break;
        default:
          // 如果沒有選取的值也沒有預置文字。
          this.setText('text', '');
      }
      // 如果沒有值選項的話則離開。
      if (!data.values) {
        return;
      }
      // 先假設所有的值都被選取了，等一下逐一過濾。
      allSelected = true;
      // 清空所有標籤。
      this.$this.find('.labels').html('');
      ref = data.values;
      // 遍歷值選項陣列。
      for (value in ref) {
        option = ref[value];
        // 如果這是預置元素則跳到下一個。
        if (value === '') {
          continue;
        }
        // 如果這個選項沒有被選取。
        if (!option.selected) {
          // 表明並不是所有的值都被選取了
          allSelected = false;
          // 移除這個選項在選單中的選取樣式。
          this.$this.find(`.menu .item[data-value='${value}']`).removeClass('selected active');
          // 直接繼續下一輪。
          continue;
        }
        // 如果這個下拉式選單是可供多選且這個值被選取的話。
        if (data.multiple) {
          // 替這個選項建立標籤到下拉式選單中。
          this.addLabel(value);
        }
      }
      // 如果全部的標籤都被選取，而且這個下拉式選單支援多選的話。
      if (allSelected && data.multiple) {
        // 就顯示找不到資料的訊息。
        return this.message('show');
      } else {
        // 不然就移除訊息。
        return this.message('hide');
      }
    }

    init() {
      var $dropdown, data;
      // 將 `<select>` 選單轉換成 Tocas 的下拉式選單。
      $dropdown = this.generator(this.convertor(this.$this));
      // 先保存舊的資料。
      data = this.$this.get().$data;
      // 將 Tocas 的下拉式選單替換掉原本的 `<select>` 選單。
      this.$this.replaceWith($dropdown);
      // 重新取代下拉式選單元素。
      this.$this = $dropdown;
      // 還原資料。
      this.$this.get().$data = data;
      // 重新繪製下拉式選單。
      this.repaint();
      // 監聽頁面的點擊事件，當點擊非下拉式選單的元素時就收合所有選單。
      $selector(document).off('click.dropdown').on('click.dropdown', this.documentListener);
      // 監聽選單的點擊事件。
      this.$this.on('click', this.dropdownListener);
      return ts.fn;
    }

    data() {
      return {
        // 保存新的資料。
        // 回傳一連串可用函式。
        save: (newData) => {
          return this.selectData = newData;
        },
        // 取得目前保存的資料。
        get: () => {
          if (this.selectData === void 0) {
            return {};
          } else {
            return this.selectData;
          }
        }
      };
    }

    getOption(value) {
      return this.data().get().values[value];
    }

    destroy() {}

    methods() {
      return {
        // Change Values

        // 更改可選下拉式選單中的所有值為新值。
        'change values': (values) => {
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
    //on           : 'click'

    labelClass: (text, value) => {
      return null;
    },
    // 是否允許重新選取，當設為 `true` 時，就算使用者選取了正在選取的值，仍會呼叫 `onChange`。
    allowReselection: false,
    // 是否允許使用者擅自新增選單值。
    allowAdditions: false,
    // 當使用者新增了值並移除後，是否要在選單中隱藏這個值。
    hideAdditions: true,
    
    //action          : 'auto'
    // 搜尋的底限字數，超過此字數才會開始搜尋。
    minCharacters: 1,
    // 搜尋時的依據，可用：`both` 符合文字或值、`value` 符合值、`text` 符合文字。
    match: 'both',
    // 是否要進行全文搜尋，若為 `true` 只要搜尋的值符合選項文字其中即可；`false` 則會強迫搜尋的值必須和選項文字開頭相符。
    fullTextSearch: false,
    
    sortSelect: false,
    
    selectOnKeydown: true,
    
    //forceSelection  : true
    // 是否要使用標籤而非純計數文字。
    useLabels: true,
    
    //allowCategorySelection: false

    //placeholder           : 'auto'
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

  // 下拉式選單的動畫時間。
  Dropdown.prototype.duration = 300;

  return Dropdown;

})();

ts(Dropdown);
