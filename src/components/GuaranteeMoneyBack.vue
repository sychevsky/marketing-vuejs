<template lang="pug">
  .guarantee-money-back
    .guarantee-money-back__image
      img(src="src/assets/img/components/guarantee-money-back/bitmap/moneyback-180.png" alt="110% Money back guarantee. Cancel at any time.")

    .guarantee-money-back__title
      .guarantee-money-back__title-inner
        | {{ guaranteeMoneyBack.title }}

    ul.guarantee-money-back__list
      li(v-for='descItem in guaranteeMoneyBack.description' v-html='descItem.text')

</template>

<script>
  export default {
    name: 'GuaranteeMoneyBack',
    data () {
      return {
        guaranteeMoneyBack: {
          title: '180 day Money Back Guarantee',
          description: [
            {text: '<strong>We are committed to customer support and satisfaction.</strong> (if you\'re not happy, we\'re&nbsp;not&nbsp;happy)'},
            {text: 'Cancel anytime by visiting your account or by contacting support. (no questions asked)'},
            {text: '24 hour support (get in touch with us)'},
            {text: 'We welcome feedback (tell us how we\'re doing)'}
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/_helpers";

  .guarantee-money-back {
    display: table;
    width: 100%;
    table-layout: fixed;
    max-width: 780px;
    margin: 0 auto 33px;
  }

  .guarantee-money-back__image {
    position: absolute;
    width: 100px;
    max-height: 100px;
    img {
      width: 100px;
      max-width: 100px;
      @media (min-width: $tablet-breakpoint) {
        width: 140px;
        max-height: 140px;
      }
    }
  }

  .guarantee-money-back__title {
    height: 100px;
    width: 100%;
    padding-left: 120px;
    margin-top: 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100px;
    margin-bottom: 17px;
    color: $accent-color;
    -webkit-font-smoothing: antialiased;
    @media (min-width: $tablet-breakpoint) {
      padding-left: 170px;
      height: auto;
      line-height: 1.24;
    }
  }

  .guarantee-money-back__title-inner {
    display: inline-block;
    vertical-align: middle;
    line-height: 1.2;
  }

  .guarantee-money-back__list {
    @include list-unstyled();
    li {
      margin: 0 0 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: $tablet-breakpoint) {
      padding: 0 0 0 170px;
    }
  }
</style>
