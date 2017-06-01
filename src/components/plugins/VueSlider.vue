<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>

    <div :class="defaultSwiperClasses.wrapperClass">
      <slot></slot>
    </div>

    <slot name="pagination"></slot>
  </div>
</template>

<script>
  import { R } from '@/assets/js/libraries/ramda.min'
  import '@/assets/js/plugins/swiper.min'
  import { helpers, className, selector } from '@/assets/js/mixins/helpers'
  import multiselectMixin from '@/assets/js/mixins/multiselectMixin'

  let browser = typeof window !== 'undefined';
  let $planActiveSelector = '.product-plan.active';
  let $windowWidth = window.innerWidth;

  if (browser && $windowWidth <= 766) {
    window.Swiper = Swiper
  }

  export default {
    name: 'Slider',
    methods: {
      watchWindowWidth: function(){
        $windowWidth = window.innerWidth;

        if($windowWidth > 760) {
          console.log('destroy instance');

          this.destroySlider();
        }

        if($windowWidth <= 760) {
          this.mountSlider();

          this.updateSlider();
        }
      },
      mountSlider: function(){
        let self = this
        let mount = function () {
          if (!self.swiper && browser) {
            delete self.options.notNextTick
            let setClassName = false
            for(let className in self.defaultSwiperClasses){
              if (self.defaultSwiperClasses.hasOwnProperty(className)) {
                if (self.options[className]) {
                  setClassName = true
                  self.defaultSwiperClasses[className] = self.options[className]
                }
              }
            }
            let mountInstance = function () {
              self.swiper = new Swiper(self.$el, self.options)
            }
            setClassName ? self.$nextTick(mountInstance) : mountInstance()
          }
        }
        this.options.notNextTick ? mount() : this.$nextTick(mount)
      },
      destroySlider: function(){
        if (this.swiper) {
          this.swiper.destroy(true, true)
          delete this.swiper
        }
      },
      updateSlider: function(){
        if (this.swiper) {
          this.swiper.update()
        }
      }
    },
    props: {
      options: {
        type: Object,
        default () {
          return {
            mode: 'horizontal',
            slidesPerView: 'auto',
            centeredSlides: true,
            slideToClickedSlide: true,
            initialSlide: 1,
            shortSwipes: true,
            followFinger: false,
            onSlideChangeStart() {
              let $currentActivePlans = document.querySelectorAll($planActiveSelector);
              let $removeClassName = el => el.classList.remove(className.active);
              // Remove active plan highlight
              R.forEach($removeClassName, $currentActivePlans);
            },
            onTransitionEnd() {
              let $currentActiveSlide = document.querySelectorAll('.' + this.slideActiveClass);
              let $currentPlan = $currentActiveSlide[0].children[0];
              let $isPlanActive = $currentActiveSlide[0].children[0].classList.contains(className.active);

              if(!$isPlanActive) {
                $currentPlan.classList.add(className.active);
              }
            }
          }
        }
      }
    },
    data() {
      return {
        defaultSwiperClasses: {
          wrapperClass: 'swiper-wrapper'
        }
      }
    },
    mounted() {
      window.addEventListener('resize', this.watchWindowWidth);

      if($windowWidth <= 760) {
        this.mountSlider();
      } else if ($windowWidth > 760) {
//        let $plans = document.querySelectorAll(selector.productPlan);
//        let $accentPlan = $plans[1];
//
//        $accentPlan.classList.add(className.active);
      }
    },
    beforeDestroy() {
      this.destroySlider();
    }
  }
</script>
