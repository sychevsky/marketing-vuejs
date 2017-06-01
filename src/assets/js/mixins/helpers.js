export let helpers = {
  getAncestor(el, selector){
    let matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
      if (typeof document.body[fn] == 'function') {
        matchesFn = fn;
        return true;
      }
      return false;
    });

    let parent;

    // traverse parents
    while (el) {
      parent = el.parentElement;
      if (parent && parent[matchesFn](selector)) {
        return parent;
      }
      el = parent;
    }

    return null;
  }
};

export let selector = {
  formGroup: '.form-group',
  formControl: '.form-control',
  formControlError: '.has-error',
  sliderContainer: '.swiper-container',
  plansNavigation: '.l-payment-plans__navigation',
  interactiveList: '.js-interactive-list-container',
  listSwitchingToggler: '.js-interactive-list-toggler',
  productPlan: '.product-plan'
};

export let className = {
  active: 'active',
  open: 'open',
  disabled: 'disabled',
  success: 'has-success',
  error: 'has-error',
  listSwitchingToggler: 'js-interactive-list-toggler'
};
