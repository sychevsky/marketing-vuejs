! function(global, factory) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.VueForm = factory()
}(this, function() {
  "use strict";

  function getClasses(classConfig, state) {
    var _ref;
    return _ref = {}, defineProperty(_ref, classConfig.dirty, state.$dirty), defineProperty(_ref, classConfig.pristine, state.$pristine), defineProperty(_ref, classConfig.valid, state.$valid), defineProperty(_ref, classConfig.invalid, state.$invalid), defineProperty(_ref, classConfig.touched, state.$touched), defineProperty(_ref, classConfig.untouched, state.$untouched), defineProperty(_ref, classConfig.pending, state.$pending), _ref
  }

  function addClass(el, className) {
    el.classList ? el.classList.add(className) : el.className += " " + className
  }

  function removeClass(el, className) {
    el.classList ? el.classList.remove(className) : el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ")
  }

  function vModelValue(data) {
    return data.model ? data.model.value : data.directives.filter(function(v) {
      return "model" === v.name
    })[0].value
  }

  function getVModelAndLabel(nodes) {
    function traverse(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ("label" !== node.tag || foundVnodes.label || (foundVnodes.label = node), node.data)
          if (node.data.directives) {
            var match = node.data.directives.filter(function(v) {
              return "model" === v.name
            });
            match.length && foundVnodes.vModel.push(node)
          } else node.data.model && foundVnodes.vModel.push(node);
        node.children && traverse(node.children)
      }
    }
    var foundVnodes = {
      vModel: [],
      label: null
    };
    return traverse(nodes), foundVnodes
  }

  function getName(vnode) {
    return vnode.data && vnode.data.attrs && vnode.data.attrs.name ? vnode.data.attrs.name : vnode.componentOptions && vnode.componentOptions.propsData && vnode.componentOptions.propsData.name ? vnode.componentOptions.propsData.name : void 0
  }

  function hyphenate(str) {
    return str.replace(hyphenateRE, "$1-$2").replace(hyphenateRE, "$1-$2").toLowerCase()
  }

  function randomId() {
    return Math.random().toString(36).substr(2, 10)
  }

  function findLabel(nodes) {
    if (nodes)
      for (var i = 0; i < nodes.length; i++) {
        var vnode = nodes[i];
        if ("label" === vnode.tag) return nodes[i];
        if (nodes[i].children) return findLabel(nodes[i].children)
      }
  }

  function compareChanges(vnode, oldvnode, validators) {
    var hasChanged = !1,
      attrs = vnode.data.attrs || {},
      oldAttrs = oldvnode.data.attrs || {},
      out = {};
    if (vModelValue(vnode.data) !== vModelValue(oldvnode.data) && (out.vModel = !0, hasChanged = !0), Object.keys(validators).forEach(function(validator) {
        attrs[validator] !== oldAttrs[validator] && (out[validator] = !0, hasChanged = !0)
      }), vnode.componentOptions && vnode.componentOptions.propsData) {
      var _attrs = vnode.componentOptions.propsData,
        _oldAttrs = oldvnode.componentOptions.propsData;
      Object.keys(validators).forEach(function(validator) {
        _attrs[validator] !== _oldAttrs[validator] && (out[validator] = !0, hasChanged = !0)
      })
    }
    if (hasChanged) return out
  }

  function VueFormBase(options) {
    var _components, c = index(!0, {}, config, options);
    this.provide = defineProperty({}, vueFormConfig, c), this.components = (_components = {}, defineProperty(_components, c.formComponent, vueForm), defineProperty(_components, c.messagesComponent, messages), defineProperty(_components, c.validateComponent, validate), defineProperty(_components, c.fieldComponent, field), _components), this.directives = {
      vueFormValidator: vueFormValidator
    }
  }
  var emailRegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    urlRegExp = /^(http\:\/\/|https\:\/\/)(.{4,})$/,
    validators = {
      email: function(value, attrValue, vnode) {
        return emailRegExp.test(value)
      },
      number: function(value) {
        return !isNaN(value)
      },
      url: function(value) {
        return urlRegExp.test(value)
      },
      required: function(value, attrValue, vnode) {
        return !1 === attrValue || (0 === value || (Array.isArray(value) ? !!value.length : !!value))
      },
      minlength: function(value, length) {
        return value.length >= length
      },
      maxlength: function(value, length) {
        return length >= value.length
      },
      pattern: function(value, _pattern) {
        return new RegExp("^" + _pattern + "$").test(value)
      },
      min: function(value, _min, vnode) {
        return "number" == (vnode.data.attrs.type || "").toLowerCase() ? +value >= +_min : value >= _min
      },
      max: function(value, _max, vnode) {
        return "number" == (vnode.data.attrs.type || "").toLowerCase() ? +_max >= +value : _max >= value
      }
    },
    config = {
      validators: validators,
      formComponent: "vueForm",
      formTag: "form",
      messagesComponent: "fieldMessages",
      messagesTag: "div",
      validateComponent: "validate",
      validateTag: "div",
      fieldComponent: "field",
      fieldTag: "div",
      formClasses: {
        dirty: "vf-form-dirty",
        pristine: "vf-form-pristine",
        valid: "vf-form-valid",
        invalid: "vf-form-invalid",
        touched: "vf-form-touched",
        untouched: "vf-form-untouched",
        submitted: "vf-form-submitted",
        pending: "vf-form-pending"
      },
      validateClasses: {
        dirty: "vf-field-dirty",
        pristine: "vf-field-pristine",
        valid: "vf-field-valid",
        invalid: "vf-field-invalid",
        touched: "vf-field-touched",
        untouched: "vf-field-untouched",
        submitted: "vf-field-submitted",
        pending: "vf-field-pending"
      },
      inputClasses: {
        dirty: "vf-dirty",
        pristine: "vf-pristine",
        valid: "vf-valid",
        invalid: "vf-invalid",
        touched: "vf-touched",
        untouched: "vf-untouched",
        submitted: "vf-submitted",
        pending: "vf-pending"
      },
      Promise: "function" == typeof Promise ? Promise : null
    },
    classCallCheck = function(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
    },
    createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
        }
      }
      return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
      }
    }(),
    defineProperty = function(obj, key, value) {
      return key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : obj[key] = value, obj
    },
    inherits = function(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    },
    possibleConstructorReturn = function(self, call) {
      if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !call || "object" != typeof call && "function" != typeof call ? self : call
    },
    hyphenateRE = /([^-])([A-Z])/g,
    s = "function" == typeof Symbol,
    vueFormConfig = s ? Symbol() : "VueFormProviderConfig" + randomId,
    vueFormState = s ? Symbol() : "VueFormProviderState" + randomId,
    hasOwn = Object.prototype.hasOwnProperty,
    toStr = Object.prototype.toString,
    isArray = function(arr) {
      return "function" == typeof Array.isArray ? Array.isArray(arr) : "[object Array]" === toStr.call(arr)
    },
    isPlainObject = function(obj) {
      if (!obj || "[object Object]" !== toStr.call(obj)) return !1;
      var hasOwnConstructor = hasOwn.call(obj, "constructor"),
        hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) return !1;
      var key;
      for (key in obj);
      return void 0 === key || hasOwn.call(obj, key)
    },
    index = function extend() {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0],
        i = 1,
        length = arguments.length,
        deep = !1;
      for ("boolean" == typeof target ? (deep = target, target = arguments[1] || {}, i = 2) : ("object" != typeof target && "function" != typeof target || null == target) && (target = {}); i < length; ++i)
        if (null != (options = arguments[i]))
          for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && isArray(src) ? src : []) : clone = src && isPlainObject(src) ? src : {}, target[name] = extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
      return target
    },
    vueForm = {
      render: function(h) {
        var _this = this;
        return h(this.tag || this.vueFormConfig.formTag, {
          on: {
            submit: function(event) {
              _this.state.$submitted = !0, _this.state._cloneState(), _this.$emit("submit", event)
            }
          },
          class: this.className,
          attrs: {
            novalidate: ""
          }
        }, [this.$slots.default])
      },
      props: {
        state: Object,
        tag: String
      },
      inject: {
        vueFormConfig: vueFormConfig
      },
      provide: function() {
        return defineProperty({}, vueFormState, this.state)
      },
      created: function() {
        var _this2 = this,
          controls = {},
          state = this.state,
          formstate = {
            $dirty: !1,
            $pristine: !0,
            $valid: !0,
            $invalid: !1,
            $submitted: !1,
            $touched: !1,
            $untouched: !0,
            $pending: !1,
            $error: {},
            $submittedState: {},
            _id: "",
            _cloneState: function() {
              var cloned = JSON.parse(JSON.stringify(state));
              delete cloned.$submittedState, Object.keys(cloned).forEach(function(key) {
                _this2.$set(_this2.state.$submittedState, key, cloned[key])
              })
            },
            _addControl: function(ctrl) {
              controls[ctrl.$name] = ctrl, _this2.$set(state, ctrl.$name, ctrl)
            },
            _removeControl: function(ctrl) {
              delete controls[ctrl.$name], _this2.$delete(_this2.state, ctrl.$name), _this2.$delete(_this2.state.$error, ctrl.$name)
            }
          };
        Object.keys(formstate).forEach(function(key) {
          _this2.$set(_this2.state, key, formstate[key])
        }), this.$watch("state", function() {
          var isDirty = !1,
            isValid = !0,
            isTouched = !1,
            isPending = !1;
          Object.keys(controls).forEach(function(key) {
            var control = controls[key];
            control.$submitted = state.$submitted, control.$dirty && (isDirty = !0), control.$touched && (isTouched = !0), control.$pending && (isPending = !0), control.$valid ? _this2.$delete(state.$error, control.$name) : (isValid = !1, _this2.$set(state.$error, control.$name, control))
          }), state.$dirty = isDirty, state.$pristine = !isDirty, state.$touched = isTouched, state.$untouched = !isTouched, state.$valid = isValid, state.$invalid = !isValid, state.$pending = isPending
        }, {
          deep: !0,
          immediate: !0
        })
      },
      computed: {
        className: function() {
          var c = this.vueFormConfig.formClasses,
            s = this.state,
            classes = getClasses(c, s);
          return classes[c.submitted] = s.$submitted, classes
        }
      }
    },
    messages = {
      inject: {
        vueFormConfig: vueFormConfig,
        vueFormState: vueFormState
      },
      render: function(h) {
        var _this = this,
          children = [],
          field = this.formstate[this.name];
        if (field && field.$error && this.isShown && (Object.keys(field.$error).forEach(function(key) {
            if (_this.$slots[key] || _this.$scopedSlots[key]) {
              var out = _this.$slots[key] || _this.$scopedSlots[key](field);
              if (_this.autoLabel) {
                var label = findLabel(out);
                label && (label.data = label.data || {}, label.data.attrs = label.data.attrs || {}, label.data.attrs.for = field._id)
              }
              children.push(out)
            }
          }), !children.length && field.$valid && (this.$slots.default || this.$scopedSlots.default))) {
          var out = this.$slots.default || this.$scopedSlots.default(field);
          if (this.autoLabel) {
            var label = findLabel(out);
            label && (label.data = label.data || {}, label.data.attrs = label.data.attrs || {}, label.data.attrs.for = field._id)
          }
          children.push(out)
        }
        return h(this.tag || this.vueFormConfig.messagesTag, children)
      },
      props: {
        state: Object,
        name: String,
        show: {
          type: String,
          default: ""
        },
        tag: {
          type: String
        },
        autoLabel: Boolean
      },
      data: function() {
        return {
          formstate: null
        }
      },
      created: function() {
        this.formstate = this.state || this.vueFormState
      },
      computed: {
        isShown: function() {
          var field = this.formstate[this.name];
          if (!this.show || !field) return !0;
          var compare = function(v) {
            return field[v.trim()]
          };
          if (this.show.indexOf("&&") > -1) {
            return this.show.split("&&").every(compare)
          }
          if (this.show.indexOf("||") > -1) {
            return this.show.split("||").some(compare)
          }
          return field[this.show]
        }
      }
    },
    validate = {
      render: function(h) {
        var _this = this,
          foundVnodes = getVModelAndLabel(this.$slots.default),
          vModelnodes = foundVnodes.vModel,
          attrs = {
            for: null
          };
        if (vModelnodes.length) {
          if (this.name = getName(vModelnodes[0]), this.autoLabel) {
            var id = this.fieldstate._id || vModelnodes[0].data.attrs.id || "vf" + randomId();
            this.fieldstate._id = id, vModelnodes[0].data.attrs.id = id, foundVnodes.label ? (foundVnodes.label.data = foundVnodes.label.data || {}, foundVnodes.label.data.attrs = foundVnodes.label.data.attrs = {}, foundVnodes.label.data.attrs.for = id) : "label" === this.tag && (attrs.for = id)
          }
          vModelnodes.forEach(function(vnode) {
            vnode.data.directives || (vnode.data.directives = []), vnode.data.directives.push({
              name: "vue-form-validator",
              value: {
                fieldstate: _this.fieldstate,
                config: _this.vueFormConfig
              }
            }), vnode.data.attrs["vue-form-validator"] = ""
          })
        } else console.warn("Element with v-model not found");
        return h(this.tag || this.vueFormConfig.validateTag, {
          class: this.className,
          attrs: attrs
        }, this.$slots.default)
      },
      props: {
        state: Object,
        custom: null,
        autoLabel: Boolean,
        tag: {
          type: String
        }
      },
      inject: {
        vueFormConfig: vueFormConfig,
        vueFormState: vueFormState
      },
      data: function() {
        return {
          name: "",
          formstate: null,
          fieldstate: {}
        }
      },
      methods: {
        getClasses: function(classConfig) {
          var s = this.fieldstate;
          return Object.keys(s.$error).reduce(function(classes, error) {
            return classes[classConfig.invalid + "-" + hyphenate(error)] = !0, classes
          }, getClasses(classConfig, s))
        }
      },
      computed: {
        className: function() {
          return this.getClasses(this.vueFormConfig.validateClasses)
        },
        inputClassName: function() {
          return this.getClasses(this.vueFormConfig.inputClasses)
        }
      },
      mounted: function() {
        this.fieldstate.$name = this.name, this.formstate._addControl(this.fieldstate);
        var vModelEls = this.$el.querySelectorAll("[vue-form-validator]");
        this.$watch("inputClassName", function(value, oldValue) {
          for (var el, i = 0; el = vModelEls[i++];) ! function(i, el) {
            oldValue && Object.keys(oldValue).filter(function(k) {
              return oldValue[k]
            }).forEach(function(k) {
              return removeClass(el, k)
            }), Object.keys(value).filter(function(k) {
              return value[k]
            }).forEach(function(k) {
              return addClass(el, k)
            })
          }(0, el)
        }, {
          deep: !0,
          immediate: !0
        })
      },
      created: function() {
        var _this3 = this;
        this.formstate = this.state || this.vueFormState;
        var vm = this,
          pendingValidators = [],
          _val = void 0;
        this.fieldstate = {
          $name: "",
          $dirty: !1,
          $pristine: !0,
          $valid: !0,
          $invalid: !1,
          $touched: !1,
          $untouched: !0,
          $pending: !1,
          $submitted: !1,
          $error: {},
          _id: "",
          _setValidatorVadility: function(validator, isValid) {
            isValid ? vm.$delete(this.$error, validator) : vm.$set(this.$error, validator, !0)
          },
          _setVadility: function(isValid) {
            this.$valid = isValid, this.$invalid = !isValid
          },
          _setDirty: function() {
            this.$dirty = !0, this.$pristine = !1
          },
          _setPristine: function() {
            this.$dirty = !1, this.$pristine = !0
          },
          _setTouched: function() {
            this.$touched = !0, this.$untouched = !1
          },
          _setUntouched: function() {
            this.$touched = !1, this.$untouched = !0
          },
          _setFocused: function() {
            this._hasFocused = !0
          },
          _hasFocused: !1,
          _validators: {},
          _validate: function(vnode) {
            var _this2 = this;
            this.$pending = !0;
            var isValid = !0,
              emptyAndRequired = !1,
              value = vModelValue(vnode.data);
            _val = value;
            var pending = {
              promises: [],
              names: []
            };
            pendingValidators.push(pending);
            var attrs = vnode.data.attrs || {},
              propsData = vnode.componentOptions && vnode.componentOptions.propsData ? vnode.componentOptions.propsData : {};
            Object.keys(this._validators).forEach(function(validator) {
              if (("" === value || void 0 === value || null === value) && "required" !== validator) return _this2._setValidatorVadility(validator, !0), void(emptyAndRequired = !0);
              var attrValue = void 0 !== attrs[validator] ? attrs[validator] : propsData[validator],
                result = _this2._validators[validator](value, attrValue, vnode);
              "boolean" == typeof result ? result ? _this2._setValidatorVadility(validator, !0) : (isValid = !1, _this2._setValidatorVadility(validator, !1)) : (pending.promises.push(result), pending.names.push(validator))
            }), pending.promises.length ? vm.vueFormConfig.Promise.all(pending.promises).then(function(results) {
              pending === pendingValidators[pendingValidators.length - 1] && (pendingValidators = [], results.forEach(function(result, i) {
                var name = pending.names[i];
                result ? _this2._setValidatorVadility(name, !0) : (isValid = !1, _this2._setValidatorVadility(name, !1))
              }), _this2._setVadility(isValid), _this2.$pending = !1)
            }) : (this._setVadility(isValid), this.$pending = !1)
          }
        }, this.custom && Object.keys(this.custom).forEach(function(prop) {
          _this3.fieldstate._validators[prop] = _this3.custom[prop]
        })
      },
      destroyed: function() {
        this.formstate._removeControl(this.fieldstate)
      }
    },
    field = {
      inject: {
        vueFormConfig: vueFormConfig
      },
      render: function(h) {
        var foundVnodes = getVModelAndLabel(this.$slots.default),
          vModelnodes = foundVnodes.vModel,
          attrs = {
            for: null
          };
        if (vModelnodes.length && this.autoLabel) {
          var id = vModelnodes[0].data.attrs && vModelnodes[0].data.attrs.id || "vf" + randomId();
          vModelnodes[0].data.attrs.id = id, foundVnodes.label ? (foundVnodes.label.data = foundVnodes.label.data || {}, foundVnodes.label.data.attrs = foundVnodes.label.data.attrs = {}, foundVnodes.label.data.attrs.for = id) : "label" === this.tag && (attrs.for = id)
        }
        return h(this.tag || this.vueFormConfig.fieldTag, {
          attrs: attrs
        }, this.$slots.default)
      },
      props: {
        tag: {
          type: String
        },
        autoLabel: {
          type: Boolean,
          default: !0
        }
      }
    },
    vueFormValidator = {
      name: "vue-form-validator",
      bind: function(el, binding, vnode) {
        var fieldstate = binding.value.fieldstate,
          validators = binding.value.config.validators,
          attrs = vnode.data.attrs || {};
        if (!getName(vnode)) return void console.warn("vue-form: name attribute missing");
        Object.keys(attrs).forEach(function(attr) {
          var prop = void 0;
          prop = "type" === attr ? attrs[attr].toLowerCase() : attr.toLowerCase(), validators[prop] && !fieldstate._validators[prop] && (fieldstate._validators[prop] = validators[prop])
        }), vnode.componentOptions && vnode.componentOptions.propsData && Object.keys(vnode.componentOptions.propsData).forEach(function(prop) {
          validators[prop] && !fieldstate._validators[prop] && (fieldstate._validators[prop] = validators[prop])
        }), fieldstate._validate(vnode), el.addEventListener("blur", function() {
          fieldstate._setTouched()
        }, !1), el.addEventListener("focus", function() {
          fieldstate._setFocused()
        }, !1), vnode.componentInstance && (vnode.componentInstance.$on("blur", function() {
          fieldstate._setTouched()
        }), vnode.componentInstance.$on("focus", function() {
          fieldstate._setFocused()
        }))
      },
      update: function(el, binding, vnode, oldVNode) {
        var validators = binding.value.config.validators,
          changes = compareChanges(vnode, oldVNode, validators),
          fieldstate = binding.value.fieldstate;
        changes && (changes.vModel ? (fieldstate._hasFocused && fieldstate._setDirty(), fieldstate._validate(vnode)) : fieldstate._validate(vnode))
      }
    },
    VueForm = function(_VueFormBase) {
      function VueForm() {
        return classCallCheck(this, VueForm), possibleConstructorReturn(this, (VueForm.__proto__ || Object.getPrototypeOf(VueForm)).apply(this, arguments))
      }
      return inherits(VueForm, _VueFormBase), createClass(VueForm, null, [{
        key: "install",
        value: function(Vue, options) {
          Vue.mixin(new this(options))
        }
      }, {
        key: "installed",
        get: function() {
          return !!this.install.done
        },
        set: function(val) {
          this.install.done = val
        }
      }]), VueForm
    }(VueFormBase);
  return VueFormBase.call(VueForm), VueForm
});
