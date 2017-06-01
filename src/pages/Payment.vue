<template lang="pug">
  page-template
    // Insert page content here
    .l-payment-page
      .l-payment-page__inner
        .l-payment-page__header
          .page-title(v-html="paymentPage.pageTitle")

          .page-subtitle(v-html="paymentPage.pageSubtitle")

        .l-payment-page__plans
          plans-slider

        .l-payment-page__plans-resume
          p(v-html="paymentPage.plansResume.cloud")

          p(v-html="paymentPage.plansResume.access")

        .l-payment-page__guarantee
          money-back-info

        #payment-form-area.l-payment-page__subscription-form
          p.l-payment-page__subscription-title
            | Enter your payment information to complete purchase

          payment-form

</template>

<script>
  import OneColumnTemplate from '@/components/layout/OneColumnTemplate'
  import GuaranteeMoneyBack from '@/components/GuaranteeMoneyBack'
  import PaymentForm from '@/components/PaymentForm'
  import PlansSlider from '@/components/PlansSlider'
  import { helpers, className, selector } from '@/assets/js/mixins/helpers'
  //import '../assets/js/mixins/smoothscroll'

  export default {
    name: 'Payment',
    components: {
      'page-template': OneColumnTemplate,
      'money-back-info': GuaranteeMoneyBack,
      'plans-slider': PlansSlider,
      'payment-form': PaymentForm
    },
    data () {
      return {
        paymentPage: {
          pageTitle: 'Please Choose one of our Affordable Subscription&nbsp;Plans',
          pageSubtitle: 'Thank you for trying out PDFfiller. To use our premium features, you&nbsp;will&nbsp;need a&nbsp;PDFfiller&nbsp;subscription.',
          plansResume: {
            cloud: 'All plans include unlimited cloud storage absolutely&nbsp;for&nbsp;free',
            access: 'Access your documents from anywhere with&nbsp;our&nbsp;free PDFfiller&nbsp;App'
          },
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/scss/_helpers";

  .l-payment-page {
    overflow: hidden;
    padding-top: 30px;
    padding-bottom: 40px;
    .page-title {
      line-height: 1.67;
      font-size: 18px;
      font-weight: $bold;
      margin-bottom: 20px;
    }

    .page-subtitle {
      max-width: 86%;
      margin: 0 auto 15px;
      line-height: 1.67;
      font-size: $base-font-size;
      font-weight: 400;
    }
  }

  .l-payment-page__inner {
    @extend %container;
  }

  .l-payment-page__header {
    margin-bottom: 36px;
    text-align: center;
    @media (min-width: $desktop-breakpoint) {
      margin-bottom: 80px;
    }
  }

  .l-payment-page__plans {
    margin-bottom: 45px;
  }

  .l-payment-page__plans-resume {
    margin-bottom: 50px;
    text-align: center;
    font-size: 18px;
    line-height: 1.4;
    color: #5d5d5d;
    font-weight: $bold;
    -webkit-font-smoothing: antialiased;
    p {
      margin: 0;
    }
  }

  .l-payment-page__guarantee {
    margin-bottom: 33px;
  }

  .l-payment-page__subscription-title {
    margin-bottom: 21px;
    font-size: 20px;
    font-weight: $bold;
    text-align: center;
  }

</style>
