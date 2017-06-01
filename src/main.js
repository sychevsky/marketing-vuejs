// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { helpers, className, selector } from '@/assets/js/mixins/helpers'

Vue.config.productionTip = false

import { VueForm as VueForm } from './assets/js/plugins/vue-form'
import { VueSelect } from './assets/js/plugins/vue-select'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'has-success',
    invalid: 'has-error'
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});

// let selector = {
//   formGroup: '.form-group',
//   sliderContainer: '.swiper-container',
//   plansNavigation: '.l-payment-plans__navigation',
//   interactiveList: '.js-interactive-list-container',
//   listSwitchingToggler: '.js-interactive-list-toggler'
// };
//
// let className = {
//   active: 'is-active',
//   success: 'has-success',
//   visible: 'is-visible',
//   error: 'has-error'
// };

window.onload = function(){
}
