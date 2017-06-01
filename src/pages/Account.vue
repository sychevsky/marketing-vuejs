<template lang="pug">
  page-template
    // Insert page content here
    .l-account-page
      .l-account-page__primary-content
        .content-title
          | Manage your Account

        .content-title
          | Personal Information

      .l-account-page__sidebar-content
        .sidebar-title
          | Account Information

</template>

<script>
  import OneColumnTemplate from '@/components/layout/OneColumnTemplate'

  export default {
    name: 'Payment',
    components: {
      'page-template': OneColumnTemplate
    },
    data () {
      return {
        paymentPage: {
          pageTitle: 'Please Choose one of our Affordable Subscription Plans',
          pageSubtitle: 'Thank you for trying out PDFfiller. To use our premium features, you will need a PDFfiller subscription.',
          plansResume: {
            cloud: 'All plans include unlimited cloud storage absolutely for free',
            access: 'Access your documents from anywhere with our free PDFfiller App'
          },
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/scss/_helpers";

  .l-account-page {
    @extend %container;
  }

  .l-account-page__primary-content {
    float: left;
    padding-top: 35px;
    padding-bottom: 35px;
    padding-right: 17px;
  }

  .l-account-page__sidebar-content {
    float: right;
    width: 304px;
    padding: 22px 18px;
    background: whitesmoke;
  }

</style>
