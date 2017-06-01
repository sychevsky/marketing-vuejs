<template>
  <span class="q-tooltip animate-scale" :style="transformCSS">
    <slot></slot>
  </span>
</template>

<script>
  import Utils from '@/assets/js/mixins/tooltip/utils'
  import Platform from '@/assets/js/mixins/tooltip/platform'
  export default {
    props: {
      anchor: {
        type: String,
        default: 'top middle',
        validator: Utils.popup.positionValidator
      },
      self: {
        type: String,
        default: 'bottom middle',
        validator: Utils.popup.positionValidator
      },
      offset: {
        type: Array,
        validator: Utils.popup.offsetValidator
      },
      delay: {
        type: Number,
        default: 0
      },
      maxHeight: String,
      disable: Boolean
    },
    data () {
      return {
        opened: false
      }
    },
    computed: {
      anchorOrigin () {
        return Utils.popup.parsePosition(this.anchor)
      },
      selfOrigin () {
        return Utils.popup.parsePosition(this.self)
      },
      transformCSS () {
        return Utils.popup.getTransformProperties({
          selfOrigin: this.selfOrigin
        })
      }
    },
    methods: {
      toggle () {
        if (this.opened) {
          this.close()
        }
        else {
          this.open()
        }
      },
      open () {
        clearTimeout(this.timer)
        if (this.disable) {
          return
        }
        this.opened = true
        document.body.appendChild(this.$el)
        this.scrollTarget = Utils.dom.getScrollTarget(this.anchorEl)
        this.scrollTarget.addEventListener('scroll', this.close)
        window.addEventListener('resize', this.__debouncedUpdatePosition)
        if (Platform.is.mobile) {
          document.body.addEventListener('click', this.close, true)
        }
        this.__updatePosition()
      },
      close () {
        clearTimeout(this.timer)
        if (this.opened) {
          this.opened = false
          this.scrollTarget.removeEventListener('scroll', this.close)
          window.removeEventListener('resize', this.__debouncedUpdatePosition)
          document.body.removeChild(this.$el)
          if (Platform.is.mobile) {
            document.body.removeEventListener('click', this.close, true)
          }
        }
      },
      __updatePosition () {
        Utils.popup.setPosition({
          el: this.$el,
          offset: this.offset,
          anchorEl: this.anchorEl,
          anchorOrigin: this.anchorOrigin,
          selfOrigin: this.selfOrigin,
          maxHeight: this.maxHeight
        })
      },
      __delayOpen () {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.open, this.delay)
      }
    },
    created () {
      this.__debouncedUpdatePosition = Utils.debounce(() => {
        this.__updatePosition()
      }, 70)
    },
    mounted () {
      this.$nextTick(() => {
        /*
         The following is intentional.
         Fixes a bug in Chrome regarding offsetHeight by requiring browser
         to calculate this before removing from DOM and using it for first time.
         */
        this.$el.offsetHeight // eslint-disable-line
        this.anchorEl = this.$el.parentNode
        this.anchorEl.removeChild(this.$el)
        if (Platform.is.mobile) {
          this.anchorEl.addEventListener('click', this.open)
        }
        else {
          //this.anchorEl.addEventListener('mouseenter', this.__delayOpen)
          this.anchorEl.addEventListener('focus', this.__delayOpen)
          this.anchorEl.addEventListener('mouseleave', this.close)
          this.anchorEl.addEventListener('blur', this.close)
        }
      })
    },
    beforeDestroy () {
      if (Platform.is.mobile) {
        this.anchorEl.removeEventListener('click', this.open)
      }
      else {
        //this.anchorEl.removeEventListener('mouseenter', this.__delayOpen)
        this.anchorEl.removeEventListener('focus', this.__delayOpen)
        this.anchorEl.removeEventListener('mouseleave', this.close)
        this.anchorEl.removeEventListener('blur', this.close)
      }
      this.close()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/_helpers";

  .q-tooltip {
    position: fixed;
    color: #fafafa;
    background: #747474;
    box-shadow: none;
    z-index: 22;
    padding: 10px 20px;
    border-radius: $border-radius;
    //overflow-y: auto;
    //overflow-x: hidden;
    pointer-events: none;
    margin-top: -30px;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.15);
    transform: scale(1, 1);
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -8px;
      left: 50%;
      margin-left: -4px;
      width: 8px;
      height: 8px;
      border-right: 8px solid transparent !important;
      border-top: 8px solid #747474;
      border-left: 8px solid transparent !important;
    }
  }

  .animate-scale {
    -webkit-animation: q-scale .3s;
    animation: q-scale .3s
  }

  @-webkit-keyframes q-scale {
    0% {
      opacity: 0;
      -webkit-transform: scale(.7);
      transform: scale(.7)
    }
    to {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
  }

  @keyframes q-scale {
    0% {
      opacity: 0;
      -webkit-transform: scale(.7);
      transform: scale(.7)
    }
    to {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
  }
</style>
