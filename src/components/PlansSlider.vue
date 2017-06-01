<template lang="pug">
  div
    plans-slider.l-payment-plans
      .l-payment-plans__item.swiper-slide
        .product-plan(v-on:click="setActiveState('personal')"
                      data-plan-name="personal",
                      :class="[plan.personal.schedule.value.planClassesToAdd, {active: plan.activePlan === 'personal'}]")
          .product-plan__head
            .product-plan__title {{ plan.personal.title }}

            .product-plan__description {{ plan.personal.description }}

          .product-plan__offer
            .product-plan__offer-label {{ plan.personal.offerLabel }}

          .product-plan__features
            ul.product-plan__features-list(v-bind:class="{ expanded: plan.personal.isFeaturesListActive }")
              li.product-plan__feature(v-for='feature in plan.personal.featuresList')
                .product-plan__feature-aligner(v-html='feature.text')

          .product-plan__features-toggle
            .features-toggle-mobile(v-on:click='toggleListState' v-bind:class="{ active: plan.personal.isFeaturesListActive }")
              .features-toggle__inner

            .features-toggle(v-on:click="showPlanModal")
              .features-toggle__inner

          .product-plan__support
            .support-label
              .support-label__text {{ plansCommonData.customerSupport }}
                .support-label__text-accent {{ plan.personal.feedback }}

          .product-plan__cost
            .product-plan__cost-value
              .product-cost
                template(v-if="plan.personal.schedule.value.value === 'monthly'")
                  .product-cost__currency {{ plansCommonData.currency }}

                  .product-cost__number.product-cost__number--monthly
                    | {{ plan.personal.cost.monthly.total }}

                template(v-else)
                  .product-cost__currency {{ plansCommonData.currency }}

                  .product-cost__number
                    | {{ plan.personal.cost.annual.perMonth }}

            .product-plan__cost-detailed

          .product-plan__cost-note(v-if="plan.personal.schedule.value.value === 'monthly'")
            | {{ plansCommonData.periodCaptionMonthly }}

          .product-plan__cost-note(v-else)
            | {{ plansCommonData.periodCaptionAnnual }}

          .product-plan__schedule
            .product-plan__schedule-title Choose Payment Schedule

            v-select(v-model="plan.personal.schedule.value",
                     :searchable="false",
                     :allow-empty="true",
                     :show-labels="false",
                     :placeholder="plan.personal.schedule.value.name",
                     :options="plan.personal.schedule.options",
                     :close-on-select="true")

          .product-plan__submit
            a.product-plan-submit(v-on:click.prevent="submitChosenPlan" href="#")
              .product-plan-submit__label
                .product-plan-submit__label-annual Choose Annual Personal Plan
                .product-plan-submit__label-annual-selected Annual Personal Plan Selected
                .product-plan-submit__label-month Choose Month-to-Month Personal Plan
                .product-plan-submit__label-month-selected Month-to-Month Personal Plan Selected

      .l-payment-plans__item.swiper-slide
        .product-plan(v-on:click="setActiveState('professional')"
                      data-plan-name="professional",
                      :class="[plan.professional.schedule.value.planClassesToAdd, {active: plan.activePlan === 'professional'}]")
          .product-plan__head
            .product-plan__title {{ plan.professional.title }}

            .product-plan__description {{ plan.professional.description }}

          .product-plan__offer
            .product-plan__offer-label {{ plan.professional.offerLabel }}

          .product-plan__features
            ul.product-plan__features-list(v-bind:class="{ expanded: plan.professional.isFeaturesListActive }")
              li.product-plan__feature(v-for='feature in plan.professional.featuresList')
                .product-plan__feature-aligner(v-html='feature.text')

          .product-plan__features-toggle
            .features-toggle-mobile(v-on:click='toggleListState' v-bind:class="{ active: plan.professional.isFeaturesListActive }")
              .features-toggle__inner

            .features-toggle(v-on:click='showPlanModal')
              .features-toggle__inner

          .product-plan__support
            .support-label
              .support-label__text {{ plansCommonData.customerSupport }}
                .support-label__text-accent {{ plan.professional.feedback }}

          .product-plan__cost
            .product-plan__cost-value
              .product-cost
                template(v-if='plan.professional.schedule.value.value === "monthly"')
                  .product-cost__currency {{ plansCommonData.currency }}

                  .product-cost__number.product-cost__number--monthly
                    | {{ plan.professional.cost.monthly.total }}

                template(v-else)
                  .product-cost__currency {{ plansCommonData.currency }}

                  .product-cost__number
                    | {{ plan.professional.cost.annual.perMonth }}

            .product-plan__cost-detailed

          .product-plan__cost-note(v-if='plan.professional.schedule.value.value === "monthly"')
            | {{ plansCommonData.periodCaptionMonthly }}

          .product-plan__cost-note(v-else)
            | {{ plansCommonData.periodCaptionAnnual }}

          .product-plan__schedule
            .product-plan__schedule-title Choose Payment Schedule

            v-select(v-model='plan.professional.schedule.value',
                    :searchable='false',
                    :allow-empty='true',
                    :show-labels='false',
                    :placeholder='plan.professional.schedule.value.name',
                    :options='plan.professional.schedule.options',
                    :close-on-select='true')

          .product-plan__submit
            a.product-plan-submit.js-scroll-by(v-on:click.prevent='submitChosenPlan' href="#")
              .product-plan-submit__label
                .product-plan-submit__label-annual Choose Annual Professional Plan
                .product-plan-submit__label-annual-selected Annual Professional Plan Selected
                .product-plan-submit__label-month Choose Month-to-Month Professional&nbsp;Plan
                .product-plan-submit__label-month-selected Month-to-Month Professional Plan Selected

      .l-payment-plans__item.swiper-slide
        .product-plan(v-on:click="setActiveState('business')"
                      data-plan-name="business",
                      :class="[plan.business.schedule.value.planClassesToAdd, {active: plan.activePlan === 'business'}]")
          .product-plan__head
            .product-plan__title {{ plan.business.title }}

            .product-plan__description {{ plan.business.description }}

          .product-plan__offer
            .product-plan__offer-label {{ plan.business.offerLabel }}

          .product-plan__features
            ul.product-plan__features-list(v-bind:class="{ expanded: plan.business.isFeaturesListActive }")
              li.product-plan__feature(v-for='feature in plan.business.featuresList')
                .product-plan__feature-aligner(v-html='feature.text')

          .product-plan__features-toggle
            .features-toggle-mobile(v-on:click='toggleListState' v-bind:class="{ active: plan.business.isFeaturesListActive }")
              .features-toggle__inner

            .features-toggle(v-on:click='showPlanModal')
              .features-toggle__inner

          .product-plan__support
            .support-label
              .support-label__text {{ plansCommonData.customerSupport }}
                .support-label__text-accent {{ plan.business.feedback }}

          .product-plan__cost
            .product-plan__cost-value
              .product-cost
                template(v-if='plan.business.schedule.value.value === "monthly"')
                  .product-cost__currency {{ plansCommonData.currency }}

                  .product-cost__number.product-cost__number--monthly
                    | {{ plan.business.cost.monthly.total }}

                template(v-else)
                  .product-cost__currency {{ plansCommonData.currency }}

                  .product-cost__number
                    | {{ plan.business.cost.annual.perMonth }}

            .product-plan__cost-detailed

          .product-plan__cost-note(v-if='plan.business.schedule.value.value === "monthly"')
            | {{ plansCommonData.periodCaptionMonthly }}

          .product-plan__cost-note(v-else)
            | {{ plansCommonData.periodCaptionAnnual }}

          .product-plan__schedule
            .product-plan__schedule-title Choose Payment Schedule

            v-select(v-model='plan.business.schedule.value',
                    :searchable='false',
                    :allow-empty='true',
                    :show-labels='false',
                    :placeholder='plan.business.schedule.value.name',
                    :options='plan.business.schedule.options',
                    :close-on-select='true')

          .product-plan__submit
            a.product-plan-submit.js-scroll-by(v-on:click.prevent='submitChosenPlan' href="#")
              .product-plan-submit__label
                .product-plan-submit__label-annual Choose Annual Business Plan
                .product-plan-submit__label-annual-selected Annual Business Plan Selected
                .product-plan-submit__label-month Choose Month-to-Month Business Plan
                .product-plan-submit__label-month-selected Month-to-Month Business Plan Selected

    .l-payment-plans__navigation(slot="pagination")

    modal(slot='modals-area',
          ref='personalPlanFeatures',
          icon='success',
          overlay-theme='dark',
          class='modal')
      | Modal success
      .test-modal(slot="box-action")

    modal(ref='professionalPlanFeatures', icon="success" class="modal")
      | Professional Plan data

    modal(ref='businessPlanFeatures', icon="success" class="modal")
      | Business Plan data

</template>

<script>
  import { R } from '@/assets/js/libraries/ramda.min'
  import VueMultiselect from '@/components/plugins/SelectMulti'
  import Slider from '@/components/plugins/VueSlider'
  import SweetModal from '@/components/plugins/SweetModal'
  import { helpers, className, selector } from '@/assets/js/mixins/helpers'

  export default {
    name: 'PlansSlider',
    components: {
      'v-select': VueMultiselect,
      'plans-slider': Slider,
      'modal': SweetModal
    },
    methods: {
      setActiveState: function(planName){
        this.plan.activePlan = planName;
      },
      toggleListState: function(e){
        let $currentEl = e.target;
        let $plan = helpers.getAncestor($currentEl, selector.productPlan);
        let $isPlanActive = $plan.classList.contains(className.active);
        let $planName = $plan.getAttribute('data-plan-name');
        let $isListActive = this.plan[$planName].isFeaturesListActive;

        if(!$isPlanActive) {
          return;
        }

        if($isListActive) {
          this.plan[$planName].isFeaturesListActive = false;
        } else {
          this.plan[$planName].isFeaturesListActive = true;
        }
      },
      showPlanModal: function(e){
        let $currentEl = e.target;
        let $plan = helpers.getAncestor($currentEl, selector.productPlan);
        let $isPlanActive = $plan.classList.contains(className.active);
        let $planName = $plan.getAttribute('data-plan-name');

        if(!$isPlanActive) {
          return;
        }

        switch($planName) {
          case 'personal':
            this.$refs.personalPlanFeatures.open();
            break;
          case 'professional':
            this.$refs.professionalPlanFeatures.open();
            break;
          case 'business':
            this.$refs.businessPlanFeatures.open();
            break;
          default:
            break;
        }
      },
      submitChosenPlan: function(e){
        let $currentEl = e.target;
        let $plan = helpers.getAncestor($currentEl, selector.productPlan);
        let $isPlanActive = $plan.classList.contains(className.active);
        let $controlToFocus = document.querySelectorAll('.form-payment .form-control');

        if(!$isPlanActive) {
          return;
        }

        document.querySelector('#payment-form-area').scrollIntoView({ behavior: 'smooth' });

        $controlToFocus[0].focus();
      },
    },
    data () {
      return {
          plansCommonData: {
            currency: '$',
            periodCaptionAnnual: 'when paid annually',
            periodCaptionMonthly: 'per month',
            customerSupport: 'Customer Support',
            TitleChooseSchedule: 'Choose Payment Schedule'
          },
          plan: {
            personal: {
              title: 'Personal',
              description: 'Fill and eSign any PDF or other document online',
              offerLabel: 'Basic Plan',
              featuresList: [
                {text: '<strong>Access</strong> Documents from Anywhere'},
                {text: 'Edit, Fill, Draw, Print, Save, or Fax'},
                {text: 'eSign from Any Device Anywhere'},
                {text: 'Highlight & annotate your documents'},
                {text: 'Create your own eSignature'},
                {text: 'Request signatures & get notifications'},
                {text: 'Get bank-level data security'},
                {text: 'Use free iOS & Android applications'},
                {text: 'Receive eFaxes for 19.99/month'}
              ],
              isFeaturesListActive: false,
              feedback: 'Within a Day',
              cost: {
                annual: {
                  total: 72,
                  perMonth: 6,
                  offRate: 70,
                  perUserPerMonth: 4
                },
                monthly: {
                  total: 20,
                  perUser: 10
                }
              },
              schedule: {
                value: {name: 'Once a Year Annually (65% OFF)'},
                options: [
                  {
                    name: 'Once a Year Annually (65% OFF)',
                    value: 'annual',
                    planClassesToAdd: 'is-annual active'
                  },
                  {
                    name: 'Month-To-Month',
                    value: 'monthly',
                    planClassesToAdd: 'is-monthly active'
                  }
                ],
              },
              submitButtonMonthly: 'Choose Month-to-Month Personal Plan',
              submitButtonMonthlyActive: 'Month-to-Month Personal Plan Selected',
              submitButtonAnnual: 'Choose Annual Personal Plan',
              submitButtonAnnualActive: 'Annual Personal Plan Selected'
            },
            professional: {
              title: 'Professional',
              description: 'All the tools you need to create professional-looking documents',
              offerLabel: 'All Features of the Personal Plan',
              featuresList: [
                {text: 'Erase, Redact, Blackout'},
                {text: 'Merge, Rearrange or Add pages'},
                {text: 'Add Photos or Watermarks'},
                {text: 'Create reusable templates'},
                {text: 'Easily manage your Google Docs'},
                {text: 'Get multiple signatures on one form'},
                {text: 'Make any PDF fillable'},
                {text: 'Find any fillable form'},
                {text: 'Receive eFaxes for 14.99/month'}
              ],
              isFeaturesListActive: false,
              feedback: 'Within 30 minutes',
              cost: {
                annual: {
                  total: 120,
                  perMonth: 10,
                  offRate: 70,
                  perUserPerMonth: 4
                },
                monthly: {
                  total: 30,
                  perUser: 10
                }
              },
              schedule: {
                value: {name: 'Once a Year Annually (70% OFF)'},
                options: [
                  {
                    name: 'Once a Year Annually (70% OFF)',
                    value: 'annual',
                    planClassesToAdd: 'is-annual active'
                  },
                    {
                    name: 'Month-To-Month',
                    value: 'monthly',
                    planClassesToAdd: 'is-monthly active'
                  }],
              },
            },
            business: {
              title: 'Business',
              description: 'Increased security and advanced workflows for businesses',
              offerLabel: 'All Inclusive Plan for Businesses',
              featuresList: [
                {text: 'Fillable Forms on Your Site or App'},
                {text: 'Restore Previous Versions'},
                {text: 'Advanced Workflows'},
                {text: 'Create custom signature workflows'},
                {text: 'Host fillable forms online'},
                {text: 'Password protect sensitive documents'},
                {text: 'Authenticate recipient signatures'},
                {text: 'Receive eFaxes for 9.99/month'}
              ],
              isFeaturesListActive: false,
              feedback: 'Instant Chat',
              cost: {
                annual: {
                  total: 180,
                  perMonth: 15,
                  offRate: 70,
                  perUserPerMonth: 4
                },
                monthly: {
                  total: 40,
                  perUser: 10
                }
              },
              schedule: {
                value: {name: 'Once a Year Annually (67% OFF)'},
                options: [
                  {
                    name: 'Once a Year Annually (67% OFF)',
                    value: 'annual',
                    planClassesToAdd: 'is-annual active'
                  },
                  {
                    name: 'Month-To-Month',
                    value: 'monthly',
                    planClassesToAdd: 'is-monthly active'
                  }],
              },
            },
            activePlan: 'professional'
          }
        }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/_helpers";

  $plan-bg-color: #fffff9;

  .l-payment-page__plans {
    @include clearfix();
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    margin-left: -25px;
    margin-right: -25px;
  }

  .l-payment-plans {
    font-size: 0;
    .swiper-wrapper {
      will-change: transform;
      //float: left;
    }
  }

  .l-payment-plans {
    margin: 0 auto;
  }

  .l-payment-plans__item {
    display: inline-block;
    margin-left: 7px;
    margin-right: 7px;
    vertical-align: top;
    width: 230px;
    white-space: normal;
    font-size: $base-font-size;
    @media (min-width: $desktop-breakpoint) {
      width: 304px;
    }
  }

  .product-plan {
    position: relative;
    padding: 30px 15px 15px;
    border: 1px solid $border-color;
    background: $plan-bg-color;
    @media (min-width: $desktop-breakpoint) {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
    }
  }

  .product-plan.active {
    border-color: $brand-color;
  }

  .product-plan-submit__label-annual-selected,
  .product-plan-submit__label-month,
  .product-plan-submit__label-month-selected {
    display: none;
  }

  .product-plan-submit__label-annual {
    display: block;
  }

  .product-plan.is-annual {
    .product-plan-submit__label-annual {
      display: none;
    }

    .product-plan-submit__label-annual-selected {
      display: block;
    }
  }

  .product-plan.is-monthly {
    .product-plan-submit__label-annual {
      display: none;
    }

    .product-plan-submit__label-month {
      display: none;
    }

    .product-plan-submit__label-month-selected {
      display: block;
    }
  }

  .product-plan__head {
    margin-bottom: 17px;
    line-height: 1;
    font-weight: $bold;
    text-align: center;
    -webkit-font-smoothing: antialiased;
  }

  .product-plan__title {
    font-size: 20px;
    margin-bottom: 17px;
    text-transform: uppercase;
    color: #727272;
    @media (min-width: $desktop-breakpoint) {
      font-size: 25px;
    }
  }

  .product-plan__description {
    color: $text-pale-color;
    font-size: 12px;
    @media (min-width: $desktop-breakpoint) {
      margin-bottom: 18px;
      font-size: 15px;
      line-height: 1.15;
    }

    .product-plan.active & {
      color: $brand-color;
    }
  }

  .product-plan__offer {
    display: table;
    width: 100%;
    position: relative;
    height: 30px;
    padding: 8px 8px 6px 8px;
    margin-bottom: 17px;
    color: #727272;
    background: #eee;
    font-weight: $bold;
    .product-plan.active & {
      background-color: #ffe9d7;
      background-color: rgba(255,228,205,.8);
    }
  }

  .product-plan__offer-label {
    position: relative;
    font-size: 11px;
    @media (min-width: $desktop-breakpoint) {
      font-size: 12px;
    }

    .product-plan[data-plan-name="professional"] & {
      &::after {
        content: "+";
        display: inline-block;
        margin-left: 3px;
      }
    }
  }

  .product-plan__features {
    overflow: hidden;
    padding-bottom: 6px;
  }

  .product-plan__features-list {
    @include list-unstyled();
    max-height: 0;
    text-align: left;
    @media (min-width: $desktop-breakpoint) {
      max-height: 100%;
    }
  }

  .product-plan__features-list.expanded {
    max-height: 100%;
    .product-plan__feature {
      display: table;
      &:last-child {
        border-bottom: 0;
      }
    }
  }

  .product-plan__feature {
    display: none;
    width: 100%;
    height: auto;
    padding-top: 11px;
    padding-bottom: 11px;
    border-bottom: 1px dotted #9b9b9b;
    &:nth-child(-n+3) {
      display: table;
    }

    &:nth-child(0n+3) {
      @media (min-width: $desktop-breakpoint) {
        border-color: transparent;
      }
    }
  }

  .product-plan__feature-aligner {
    position: relative;
    display: table-cell;
    height: 100%;
    padding-left: 28px;
    padding-right: 3px;
    vertical-align: middle;
    line-height: 1.16;
    color: #5f5f5f;
    font-size: 13px;
    font-weight: $bold;
    -webkit-font-smoothing: antialiased;
    &::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 0;
      display: block;
      width: 15px;
      height: 12px;
      background: url(../assets/img/svg/icons/check-gray.svg) no-repeat;
      .product-plan.active & {
        background: url(../assets/img/svg/icons/check.svg) no-repeat;
      }
    }
  }

  .product-plan__features.expanded {
    max-height: 100%;
  }

  .product-plan__features-toggle {
    margin-bottom: 20px;
    @media (min-width: $desktop-breakpoint) {
      margin-bottom: 30px;
    }
  }

  .features-toggle-mobile {
    display: block;
    position: relative;
    text-align: center;
    cursor: pointer;
    @media (min-width: $desktop-breakpoint) {
      display: none;
    }
  }

  .features-toggle__inner {
    position: relative;
    display: inline-block;
    padding: 5px 13px 4px;
    vertical-align: top;
    z-index: 1;
    font-size: 12px;
    font-weight: 700;
    border: 1px solid $border-color;
    background: $bg-color;
    border-radius: 4px;
    -webkit-font-smoothing: antialiased;
    .product-plan.active & {
      border-color: $brand-color;
    }
  }

  .features-toggle-mobile {
    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      margin-top: -1px;
      background: $border-color;
      .product-plan.active & {
        background: $brand-color;
      }
    }

    .features-toggle__inner::before {
      content: "View Features";
    }

    &.active .features-toggle__inner::before {
      content: "Hide Features";
    }
  }

  .features-toggle {
    display: none;
    position: relative;
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      margin-top: -1px;
      background: $border-color;
      .product-plan.active & {
        background: $brand-color;
      }
    }

    .features-toggle__inner::before {
      content: "View More";
    }


    @media (min-width: $desktop-breakpoint) {
      display: block;
    }
  }

  .product-plan__support {
    margin-bottom: 25px;
    @media (min-width: $desktop-breakpoint) {
      margin-bottom: 28px;
    }
  }

  .support-label {
    position: relative;
    display: inline-block;
    padding-left: 48px;
    text-align: left;
    background-size: cover;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      width: 33px;
      height: 32px;
      background: url(../../src/assets/img/payment-page/svg/call-center-gray.svg) no-repeat right top;
    }
  }

  .support-label__text {
    font-family: $open-sans;
    font-weight: 300;
  }

  .support-label__text-accent {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
  }

  .product-plan__cost {
    display: table;
    width: 100%;
    min-height: 58px;
    margin-bottom: 12px;
    @media (min-width: $desktop-breakpoint) {
      min-height: 70px;
    }
  }

  .product-plan__cost-note {
    margin-bottom: 25px;
    font-size: 12px;
    @media (min-width: $desktop-breakpoint) {
      margin-bottom: 36px;
      font-size: $base-font-size;
    }
  }

  .product-plan__cost-value {
    display: table-cell;
    vertical-align: middle;
    width: 50%;
  }

  .product-plan__cost-detailed {
    display: table-cell;
    vertical-align: middle;
    width: 50%;
  }

  .product-cost {
    font-family: $open-sans;
    color: $text-pale-color;
    font-weight: $semi-bold;
    -webkit-font-smoothing: antialiased;

    .product-plan.active & {
      color: $brand-color;
    }
  }

  .product-plan__cost-value {
    border-right: 1px solid $border-color;

    .product-plan.active & {
      border-color: $brand-color;
    }
  }

  .product-cost__number {
    display: inline;
    font-size: 45px;
    line-height: .9;
  }

  .product-cost__currency {
    display: inline;
    font-size: 30px;
    line-height: 1.37;
  }

  .product-plan__schedule {
    margin-bottom: 23px;
  }

  .product-plan__schedule-title {
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 1.125;
    text-align: center;
    font-weight: $bold;
    @media (min-width: $desktop-breakpoint) {
      font-size: 16px;
      margin-bottom: 15px;
    }
  }

  $plan-submit-border-radius: 5px;

  .product-plan-submit {
    display: table;
    width: 100%;
    table-layout: fixed;
    background-color: #b0b0b0;
    border-color: #959393;
    border-radius: $plan-submit-border-radius;
    &:hover {
      text-decoration: none;
    }
  }

  .product-plan-submit__label {
    display: table-cell;
    vertical-align: middle;
    padding: 12px 5px;
    font-size: $base-font-size;
    line-height: 1.1;
    font-weight: $bold;
    color: #fff;
    text-shadow: 0 2px 0 rgba(0, 0, 0, .15);
    border-radius: $plan-submit-border-radius;
    -webkit-font-smoothing: antialiased;

    .product-plan.active & {
      border-color: #dc5600;
      background: #ff8015;
    }

    @media (min-width: $desktop-breakpoint) {
      padding: 12px 10px;
      font-size: 18px;
    }
  }

</style>
