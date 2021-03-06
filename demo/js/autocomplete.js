var RedisLabsAutocomplete = (function() {
  'use strict'
  function e(e, t) {
    if (!(e instanceof t))
      throw new TypeError('Cannot call a class as a function')
  }
  function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var s = t[n]
      ;(s.enumerable = s.enumerable || !1),
        (s.configurable = !0),
        'value' in s && (s.writable = !0),
        Object.defineProperty(e, s.key, s)
    }
  }
  function n(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    )
  }
  var s = function(e, t) {
      return e.matches
        ? e.matches(t)
        : e.msMatchesSelector
        ? e.msMatchesSelector(t)
        : e.webkitMatchesSelector
        ? e.webkitMatchesSelector(t)
        : null
    },
    i = function(e, t) {
      return e.closest
        ? e.closest(t)
        : (function(e, t) {
            for (var n = e; n && 1 === n.nodeType; ) {
              if (s(n, t)) return n
              n = n.parentNode
            }
            return null
          })(e, t)
    },
    o = function(e) {
      return Boolean(e && 'function' == typeof e.then)
    },
    r = function t() {
      var s = this,
        r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        a = r.search,
        l = r.autoSelect,
        u = void 0 !== l && l,
        c = r.setValue,
        d = void 0 === c ? function() {} : c,
        h = r.setAttribute,
        p = void 0 === h ? function() {} : h,
        f = r.onUpdate,
        b = void 0 === f ? function() {} : f,
        v = r.onSubmit,
        y = void 0 === v ? function() {} : v,
        g = r.onShow,
        w = void 0 === g ? function() {} : g,
        x = r.onHide,
        m = void 0 === x ? function() {} : x,
        L = r.onLoading,
        S = void 0 === L ? function() {} : L,
        C = r.onLoaded,
        R = void 0 === C ? function() {} : C
      e(this, t),
        n(this, 'value', ''),
        n(this, 'searchCounter', 0),
        n(this, 'results', []),
        n(this, 'selectedIndex', -1),
        n(this, 'handleInput', function(e) {
          var t = e.target.value
          s.updateResults(t), (s.value = t)
        }),
        n(this, 'handleKeyDown', function(e) {
          var t = e.key
          switch (t) {
            case 'Up':
            case 'Down':
            case 'ArrowUp':
            case 'ArrowDown':
              var n =
                'ArrowUp' === t || 'Up' === t
                  ? s.selectedIndex - 1
                  : s.selectedIndex + 1
              e.preventDefault(), s.handleArrows(n)
              break
            case 'Tab':
              s.selectResult()
              break
            case 'Enter':
              var i = s.results[s.selectedIndex]
              s.selectResult(), s.onSubmit(i)
              break
            case 'Esc':
            case 'Escape':
              s.hideResults(), s.setValue()
              break
            default:
              return
          }
        }),
        n(this, 'handleFocus', function(e) {
          var t = e.target.value
          s.updateResults(t), (s.value = t)
        }),
        n(this, 'handleBlur', function() {
          s.hideResults()
        }),
        n(this, 'handleResultMouseDown', function(e) {
          e.preventDefault()
        }),
        n(this, 'handleResultClick', function(e) {
          var t = e.target,
            n = i(t, '[data-result-index]')
          if (n) {
            s.selectedIndex = parseInt(n.dataset.resultIndex, 10)
            var o = s.results[s.selectedIndex]
            s.selectResult(), s.onSubmit(o)
          }
        }),
        n(this, 'handleArrows', function(e) {
          var t = s.results.length
          ;(s.selectedIndex = ((e % t) + t) % t),
            s.onUpdate(s.results, s.selectedIndex)
        }),
        n(this, 'selectResult', function() {
          var e = s.results[s.selectedIndex]
          e && s.setValue(e), s.hideResults()
        }),
        n(this, 'updateResults', function(e) {
          var t = ++s.searchCounter
          s.onLoading(),
            s.search(e).then(function(e) {
              t === s.searchCounter &&
                ((s.results = e),
                s.onLoaded(),
                0 !== s.results.length
                  ? ((s.selectedIndex = s.autoSelect ? 0 : -1),
                    s.onUpdate(s.results, s.selectedIndex),
                    s.showResults())
                  : s.hideResults())
            })
        }),
        n(this, 'showResults', function() {
          s.setAttribute('aria-expanded', !0), s.onShow()
        }),
        n(this, 'hideResults', function() {
          (s.selectedIndex = -1),
            (s.results = []),
            s.setAttribute('aria-expanded', !1),
            s.setAttribute('aria-activedescendant', ''),
            s.onUpdate(s.results, s.selectedIndex),
            s.onHide()
        }),
        n(this, 'checkSelectedResultVisible', function(e) {
          var t = e.querySelector(
            '[data-result-index="'.concat(s.selectedIndex, '"]')
          )
          if (t) {
            var n = e.getBoundingClientRect(),
              i = t.getBoundingClientRect()
            i.top < n.top
              ? (e.scrollTop -= n.top - i.top)
              : i.bottom > n.bottom && (e.scrollTop += i.bottom - n.bottom)
          }
        }),
        (this.search = o(a)
          ? a
          : function(e) {
              return Promise.resolve(a(e))
            }),
        (this.autoSelect = u),
        (this.setValue = d),
        (this.setAttribute = p),
        (this.onUpdate = b),
        (this.onSubmit = y),
        (this.onShow = w),
        (this.onHide = m),
        (this.onLoading = S),
        (this.onLoaded = R)
    },
    a = 0,
    l = function() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ''
      return ''.concat(e).concat(++a)
    },
    u = function(e, t) {
      var n = e.getBoundingClientRect(),
        s = t.getBoundingClientRect()
      return n.bottom + s.height > window.innerHeight &&
        window.innerHeight - n.bottom < n.top &&
        window.pageYOffset + n.top - s.height > 0
        ? 'above'
        : 'below'
    },
    c = function(e, t, n) {
      var s
      return function() {
        var i = this,
          o = arguments,
          r = function() {
            (s = null), n || e.apply(i, o)
          },
          a = n && !s
        clearTimeout(s), (s = setTimeout(r, t)), a && e.apply(i, o)
      }
    },
    d = (function() {
      function n(t, s, i) {
        e(this, n),
          (this.id = ''.concat(i, '-result-').concat(t)),
          (this.class = ''.concat(i, '-result')),
          (this['data-result-index'] = t),
          (this.tabindex = t),
          (this.role = 'option'),
          t === s && (this['aria-selected'] = 'true')
      }
      var s, i, o
      return (
        (s = n),
        (i = [
          {
            key: 'toString',
            value: function() {
              var e = this
              return Object.keys(this).reduce(function(t, n) {
                return ''
                  .concat(t, ' ')
                  .concat(n, '="')
                  .concat(e[n], '"')
              }, '')
            },
          },
        ]) && t(s.prototype, i),
        o && t(s, o),
        n
      )
    })()
  return function t(s) {
    var i = this,
      o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      a = o.search,
      h = o.onSubmit,
      p = void 0 === h ? function() {} : h,
      f = o.onUpdate,
      b = void 0 === f ? function() {} : f,
      v = o.baseClass,
      y = void 0 === v ? 'autocomplete' : v,
      g = o.autoSelect,
      w = o.getResultValue,
      x =
        void 0 === w
          ? function(e) {
              return e
            }
          : w,
      m = o.renderResult,
      L = o.debounceTime,
      S = void 0 === L ? 0 : L
    e(this, t),
      n(this, 'expanded', !1),
      n(this, 'loading', !1),
      n(this, 'position', {}),
      n(this, 'resetPosition', !0),
      n(this, 'initialize', function() {
        (i.root.style.position = 'relative'),
          i.input.setAttribute('role', 'combobox'),
          i.input.setAttribute('autocomplete', 'off'),
          i.input.setAttribute('autocapitalize', 'off'),
          i.input.setAttribute('autocorrect', 'off'),
          i.input.setAttribute('spellcheck', 'false'),
          i.input.setAttribute('aria-autocomplete', 'list'),
          i.input.setAttribute('aria-haspopup', 'listbox'),
          i.input.setAttribute('aria-expanded', 'false'),
          i.resultList.setAttribute('role', 'listbox'),
          (i.resultContainer.style.position = 'absolute'),
          (i.resultContainer.style.zIndex = '1'),
          (i.resultContainer.style.width = '100%'),
          (i.resultContainer.style.boxSizing = 'border-box'),
          i.resultList.id ||
            (i.resultList.id = l(''.concat(i.baseClass, '-result-list-'))),
          i.input.setAttribute('aria-owns', i.resultList.id),
          document.body.addEventListener('click', i.handleDocumentClick),
          i.input.addEventListener('keydown', i.handleKeyDown),
          i.input.addEventListener('input', i.core.handleInput),
          i.input.addEventListener('focus', i.core.handleFocus),
          i.resultList.addEventListener(
            'mousedown',
            i.core.handleResultMouseDown
          ),
          i.resultList.addEventListener('click', i.core.handleResultClick),
          i.updateStyle()
      }),
      n(this, 'updateStyle', function() {
        (i.root.dataset.expanded = i.expanded),
          (i.root.dataset.loading = i.loading),
          (i.root.dataset.position = i.position),
          (i.resultContainer.style.visibility = i.expanded
            ? 'visible'
            : 'hidden'),
          (i.resultContainer.style.pointerEvents = i.expanded
            ? 'auto'
            : 'none'),
          'below' === i.position
            ? ((i.resultContainer.style.bottom = null),
              (i.resultContainer.style.top = '100%'))
            : ((i.resultContainer.style.top = null),
              (i.resultContainer.style.bottom = '100%'))
      }),
      n(this, 'handleKeyDown', function(e) {
        var t = e.key
        switch (t) {
          case 'Up':
          case 'Down':
          case 'ArrowUp':
          case 'ArrowDown':
            var n =
              'ArrowUp' === t || 'Up' === t
                ? i.core.selectedIndex - 1
                : i.core.selectedIndex + 1
            e.preventDefault(), i.core.handleArrows(n)
            break
          case 'Tab':
            i.core.selectResult()
            break
          case 'Enter':
            var s = i.core.results[i.core.selectedIndex]
            if (!s) return
            i.core.selectResult(), i.core.onSubmit(s)
            break
          case 'Esc':
          case 'Escape':
            i.core.hideResults(), i.core.setValue()
            break
          default:
            return
        }
      }),
      n(this, 'setAttribute', function(e, t) {
        i.input.setAttribute(e, t)
      }),
      n(this, 'setValue', function(e) {
        i.input.value = e ? i.getResultValue(e) : ''
      }),
      n(this, 'renderResult', function(e, t, n) {
        return '<li '.concat(t, '>').concat(i.getResultValue(e, n), '</li>')
      }),
      n(this, 'organizeResultsBySection', function(e) {
        var t = {},
          n = []
        return (
          e.forEach(function(e) {
            var s = e.hierarchy[0],
              i = e.hierarchy.length > 1 ? e.hierarchy[1] : e.hierarchy[0],
              o = t[s]
            if (void 0 === o) {
              var r = { name: s, secondLevelOrder: [i] }
              ;(r[i] = [e]), (t[s] = r), n.push(s)
            } else o.hasOwnProperty(i) || ((o[i] = []), o.secondLevelOrder.push(i)), o[i].push(e)
          }),
          { topLevelNodes: t, topLevelOrder: n }
        )
      }),
      n(this, 'handleUpdate', function(e, t) {
        i.resultList.innerHTML = ''
        var n = -1,
          s = [],
          o = i.organizeResultsBySection(e)
        o.topLevelOrder.forEach(function(e) {
          var r = o.topLevelNodes[e]
          i.resultList.insertAdjacentHTML(
            'beforeend',
            '\n        <li class="search-root-item">\n          <div class="search-root">\n            '.concat(
              e,
              '\n          </div>\n        </li>\n      '
            )
          ),
            r.secondLevelOrder.forEach(function(e) {
              r[e].forEach(function(e) {
                var o = new d((n += 1), t, i.baseClass),
                  r = i.renderResult(e, o, n)
                'string' == typeof r
                  ? i.resultList.insertAdjacentHTML('beforeend', r)
                  : i.resultList.insertAdjacentElement('beforeend', r),
                  s.push(e)
              })
            })
        }),
          (i.core.results = s),
          (e = s),
          i.input.setAttribute(
            'aria-activedescendant',
            t > -1 ? ''.concat(i.baseClass, '-result-').concat(t) : ''
          ),
          i.resetPosition &&
            ((i.resetPosition = !1),
            (i.position = u(i.input, i.resultList)),
            i.updateStyle()),
          i.core.checkSelectedResultVisible(i.resultList),
          i.onUpdate(e, t)
      }),
      n(this, 'handleShow', function() {
        (i.expanded = !0), i.updateStyle()
      }),
      n(this, 'handleHide', function() {
        (i.expanded = !1), (i.resetPosition = !0), i.updateStyle()
      }),
      n(this, 'handleLoading', function() {
        (i.loading = !0), i.updateStyle()
      }),
      n(this, 'handleLoaded', function() {
        (i.loading = !1), i.updateStyle()
      }),
      n(this, 'handleDocumentClick', function(e) {
        (e.target && i.root.contains(e.target)) || i.core.hideResults()
      }),
      n(this, 'updateStyle', function() {
        (i.root.dataset.expanded = i.expanded),
          (i.root.dataset.loading = i.loading),
          (i.root.dataset.position = i.position),
          (i.resultContainer.style.visibility = i.expanded
            ? 'visible'
            : 'hidden'),
          (i.resultContainer.style.pointerEvents = i.expanded
            ? 'auto'
            : 'none'),
          'below' === i.position
            ? ((i.resultContainer.style.bottom = null),
              (i.resultContainer.style.top = '100%'))
            : ((i.resultContainer.style.top = null),
              (i.resultContainer.style.bottom = '100%'))
      }),
      (this.root = 'string' == typeof s ? document.querySelector(s) : s),
      (this.input = this.root.querySelector('input')),
      (this.resultList = this.root.querySelector('ul')),
      (this.baseClass = y),
      (this.getResultValue = x),
      (this.onUpdate = b),
      'function' == typeof m && (this.renderResult = m)
    var C = new r({
      search: a,
      autoSelect: g,
      setValue: this.setValue,
      setAttribute: this.setAttribute,
      onUpdate: this.handleUpdate,
      onSubmit: p,
      onShow: this.handleShow,
      onHide: this.handleHide,
      onLoading: this.handleLoading,
      onLoaded: this.handleLoaded,
    })
    S > 0 && (C.handleInput = c(C.handleInput, S)),
      (this.core = C),
      (this.resultContainer = this.root.querySelector(
        '.autocomplete-result-list-wrapper'
      )),
      (this.resultContainer.style.position = 'absolute'),
      (this.resultContainer.style['z-index'] = '1'),
      (this.resultContainer.style.width = '100%'),
      (this.resultContainer.style['box-sizing'] = 'border-box'),
      (this.resultContainer.style.visibility = 'hidden'),
      (this.resultContainer.style['pointer-events'] = 'none'),
      (this.resultContainer.style.bottom = '100%'),
      (this.redisearchLogo = this.root.querySelector('.redisearch-logo')),
      this.initialize()
  }
})()
