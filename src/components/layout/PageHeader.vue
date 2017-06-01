<template lang="pug">
  .page-header(slot="page-header")
    .page-header__container
      .page-header__logo
        a(href="https://pdffiller.com").brand-logo

      .page-header__nav
        .header-nav
          template(v-if='pageHeader.authorizationStatus == false')
            .header-nav__item(v-for='navItem in pageHeader.isNotAuthorized.navItems', :class="{'has-dropdown-element': navItem.hasSubmenu}")
              template(v-if='!navItem.hasSubmenu')
                a.header-nav__link(href='#', rel='nofollow') {{ navItem.string }}

              template(v-else)
                a.header-nav__link(href='#', rel='nofollow') {{ navItem.string }}

                template(v-if="navItem.string == 'For Business'")
                  .header-nav__submenu
                    .header-nav__submenu-item(v-for='submenuItem in pageHeader.submenu.itemsForBusiness')
                      a.header-nav__submenu-link(href='#') {{ submenuItem.string }}

          template(v-else)
            .header-nav__item(v-for='navItem in pageHeader.isAuthorized.navItems', :class="{'has-dropdown-element': navItem.hasSubmenu}")
              template(v-if='!navItem.hasSubmenu')
                a.header-nav__link(href='#', rel='nofollow') {{ navItem.string }}

              template(v-else)
                a.header-nav__link(href='#', rel='nofollow') {{ navItem.string }}

                template(v-if="navItem.string == 'For Business'")
                  .header-nav__submenu
                    .header-nav__submenu-item(v-for='submenuItem in pageHeader.submenu.itemsForBusiness' v-bind:class='{ accent: submenuItem.hasAccent }')
                      a.header-nav__submenu-link(href='#') {{ submenuItem.string }}

      template(v-if='pageHeader.authorizationStatus == true')
        .page-header__account-menu
          .account-info(v-click-outside="hideActiveElements")
            .account-info__userpick(v-on:click="toggleAccountInfo")

            .account-info__dropdown(v-on:click.stop.prevent='')
              .account-info__details-header
                .account-info__userpick
                  img(alt="")

                .account-info-summary
                  .account-info-summary__name Boris Shakhnovich

                  .account-info-summary__input
                    input(v-on:change='updateAccountName', :placeholder='pageHeader.userData.name')

                  p.account-info-summary__email {{ pageHeader.userData.email }}

              .account-info__overview
                dl.account-info__list
                  dt Account ID:
                  dd {{ pageHeader.userData.idAccount }}

                  dt Internal email:
                  dd
                    a(href='mailto:d+10992543@pdffiller.com') {{ pageHeader.userData.emailInternal }}

                  dt Inbound fax:
                  dd
                    a(href='/en/fax.htm') Get my Fax Number

                  dt Subscription:
                  dd {{ pageHeader.userData.subscriptionType }}

              .account-info__footer
                .account-info__menu-item
                  a.account-menu__userlink(href='#') Settings

                .account-info__menu-item
                  a.account-menu__userlink(href='#') Log Out
</template>

<script>
import { helpers, className, selector } from '@/assets/js/mixins/helpers'

export default {
  name: 'PageHeader',
  methods: {
    toggleAccountInfo: function(e) {
      let $el = helpers.getAncestor(e.target, '.account-info');

      $el.classList.toggle(className.active)
    },
    hideActiveElements: function(e) {
      let $activeElements = document.querySelectorAll('.' + className.active);

      Array.prototype.forEach.call($activeElements, function(el){
        //el.classList.remove(className.active);
      });
    },
    updateAccountName: function(e) {
        this.pageHeader.userData.name = e.target.value;
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`

          if (compName) { warn += `Found in component '${compName}'` }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }

        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  },
  data () {
    return {
      pageHeader: {
        authorizationStatus: true,
        hasLocalization: {

        },
        isNotAuthorized: {
          navItems: [
            {string: 'Home'},
            {
              hasSubmenu: true,
              string: 'For Business'

            },
            {string: 'Features'},
            {string: 'Pricing'},
            {string: 'Log In'}
          ]
        },
        isAuthorized: {
          navItems: [
            {string: 'My Docs'},
            {
              hasSubmenu: true,
              string: 'For Business'

            },
            {string: 'Features'},
            {string: 'Pricing'},
            {string: 'My Account'}
          ]
        },
        submenu: { // Common submenu for both states
          itemsForBusiness: [
            {string: 'Medical'},
            {string: 'Insurance'},
            {string: 'Real Estate'},
            {string: 'Tax and Finance'},
            {string: 'Legal'},
            {string: 'Human Resources'},
            {string: 'See All'},
            {string: 'For Developers', hasAccent: true}
          ]
        },
        userData: {
          name: 'Boris Shakhnovich',
          email: 'boris.shakhnovich@pdffiller.com',
          idAccount: '10992543',
          emailInternal: 'd+10992543@pdffiller.com',
          faxInbound: 'Get my Fax Number',
          subscriptionType: '1 YEAR subscription'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/scss/_helpers";

  //$img-path: '../../assets/img/page-header';

  .page-header {
    position: relative;
    width: 100%;
    height: 54px;
    z-index: $z-index-header;
    border-bottom: 1px solid $border-color;
    background: $secondary-bg-color;
  }

  .page-header__container {
    @extend %container;
    display: table;
    width: 100%;
  }

  $logo-fullwidth-breakpoint: 920px;
  .page-header__logo {
    display: table-cell;
    vertical-align: middle;
    padding-bottom: 1px;
    height: 53px;
    @media (min-width: $logo-fullwidth-breakpoint) {
      width: 154px;
    }
  }

  .brand-logo {
    display: block;
    width: 42px;
    height: 31px;
    background: url(../../assets/img/svg/brand-logo.svg);
    @media (min-width: $logo-fullwidth-breakpoint) {
      width: 142px;
    }
  }

  .page-header__nav {
    display: none;
    vertical-align: middle;
    text-align: right;
    @media (min-width: $compact-mode-breakpoint) {
      display: table-cell;
    }
  }

  .header-nav {
    font-size: 0;
  }

  .header-nav__item {
    position: relative;
    display: inline-block;
    vertical-align: top;
    font-size: $base-font-size;
  }

  .header-nav__link {
    display: block;
    padding: 19px 9px;
    color: #888;
    font: $bold 13px $base-font-family;
    text-transform: uppercase;
    text-decoration: none;
    &:hover,
    &:active {
      color: $accent-color;
    }

    .has-dropdown-element & {
      position: relative;
      padding-right: 25px;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 11px;
        margin-top: -3px;
        width: 9px;
        height: 6px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5JbXBvcnRlZCBMYXllcnM8L3RpdGxlPjxwYXRoIGQ9Ik0wIDEuNjAyTDEuNTQzIDBsMi42OTIgMi43OTVMNi45MjcgMGwxLjU0NCAxLjYwMkw0LjIzNSA2eiIgZmlsbD0iI0U3NEMzQyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
        transition: all 0.2s;
      }

      &:hover {
        &::after {
          transform: rotate(-180deg);
        }
      }

      @media (min-width: $desktop-breakpoint) {
        padding: 19px 29px 19px 18px;
      }
    }

    @media (min-width: 820px) {
      padding: 19px 28px;
    }

    @media (min-width: $desktop-breakpoint) {
      padding: 19px 18px;
      font-size: $base-font-size;
    }
  }

  $submenu-border-radius: 4px;
  .header-nav__submenu {
    will-change: opacity;
    width: auto;
    min-width: 160px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    z-index: 220;
    top: 54px;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -6px;
    background: $bg-color;
    border: 1px solid $color-gray80;
    border-radius: $submenu-border-radius;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: opacity .1s .2s, visibility 0s 0s;
    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      bottom: 100%;
      left: 50%;
      display: block;
      width: 20px;
      height: 20px;
      margin-bottom: -17px;
      background: $bg-color;
      border: 1px solid #ccc;
      transform: rotate(45deg) translateX(-50%) translateZ(0);
      box-shadow: 0 2px 10px rgba(0,0,0,.2);
    }
  }

  .header-nav__item.has-dropdown-element:hover .header-nav__submenu {
    opacity: 1;
    visibility: visible;
  }

  .header-nav__submenu-item {
    position: relative;
    font-weight: $bold;
    background: inherit;
    text-align: left;
    cursor: pointer;
    transition: background .1s;
    -webkit-font-smoothing: antialiased;
    outline: none;
    &:first-child {
      padding-top: 8px;
      border-radius: $submenu-border-radius $submenu-border-radius 0 0;
    }

    &:last-child {
      border-radius: 0 0 $submenu-border-radius $submenu-border-radius;
    }
  }

  .header-nav__submenu-item.accent {
    border-top: 1px solid #d6d6d6;
    .header-nav__submenu-link {
      height: 43px;
      line-height: 43px;
    }
  }

  .header-nav__submenu-link {
    display: block;
    padding: 0 14px;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    color: $text-color;
    text-decoration: none;
    &:hover,
    &:active {
      color: $accent-color;
    }
  }

  .page-header__account-menu {
    display: none;
    vertical-align: middle;
    padding-right: 16px;
    text-align: right;
    @media (min-width: $compact-mode-breakpoint) {
      display: table-cell;
    }
  }

  .account-info {
    display: block;
    position: relative;
    font-size: 0;
  }

  .account-info.is-active {
    .account-info__userpick::after {
      opacity: 1;
      transform: rotate(180deg);
    }
  }

  .account-info__userpick {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: $base-font-size;
    border: 2px solid $color-gray80;
    background: url(../../assets/img/page-header/svg/icon-user.svg) no-repeat top center $bg-color;
    border-radius: 50%;
    background-size: cover;
    transition: all $transition-time;
    &::after {
      content: '';
      position: absolute;
      top: 18px;
      right: -18px;
      width: 9px;
      height: 6px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5JbXBvcnRlZCBMYXllcnM8L3RpdGxlPjxwYXRoIGQ9Ik0wIDEuNjAyTDEuNTQzIDBsMi42OTIgMi43OTVMNi45MjcgMGwxLjU0NCAxLjYwMkw0LjIzNSA2eiIgZmlsbD0iIzQ0NCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
      opacity: .7;
      transition: all $transition-time;
    }

    &:hover {
      border: 2px solid #bbb;
    }

    .account-info__dropdown & {
      width: 54px;
      height: 54px;
      float: left;
      margin-right: 15px;
      &::after {
        display: none;
      }
    }
  }

  .account-info__dropdown {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 46px;
    right: -22px;
    font-size: $base-font-size;
    border: 1px solid $border-color;
    z-index: 100;
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
    background: $bg-color;
    transition: 0.2s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    &::before {
      content: "";
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #f7f7f7;
      position: absolute;
      left: -8px;
      top: 1px;
      z-index: 1;
    }
  }

  .account-info.active .account-info__dropdown {
    opacity:1;
    visibility: visible;
  }

  .account-info__details-header {
    width: 274px;
    padding: 15px 19px 20px 19px;
    overflow: hidden;
    border-bottom: 1px solid #e7e7e7;
    background: #f7f7f7;
    white-space: nowrap;
    text-align: left;
    position: relative;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .account-info-summary {
    overflow: hidden;
  }

  .account-info-summary__name {
    display: block;
    width: 184px;
    position: relative;
    height: 26px;
    line-height: 20px;
    padding: 5px 30px 0 0;
    border: 1px solid #f7f7f7;
    font: bold 12px Arial,sans-serif;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

  }

  .account-info-summary__email {
    font-size: 12px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .account-info__menu-item {
    text-transform: uppercase;
    text-align: center;
    font-weight: $bold;
    line-height: 20px;
    text-decoration: none;
    border-top: 1px solid #e7e7e7;
    transition: background .2s;
    a {
      display: block;
      padding: 9px 20px;
      color: $text-pale-color;
      text-decoration: none;
    }

    &:hover {
      background: #f7f7f7;
    }
  }

  .account-info__overview {
    padding-top: 9px;
  }

  .account-info__list {
    margin: 0;
    font-size: 12px;
    dt {
      width: 100px;
      margin: 0;
      color: $text-light-color;
      padding: 0;
      float: left;
      text-align: right;
      font-weight: $bold;
    }

    dd {
      max-width: 174px;
      padding: 0 20px 9px 0;
      margin-left: 110px;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
