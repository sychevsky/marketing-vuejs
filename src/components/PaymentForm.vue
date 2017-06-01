<template lang="pug">
  vue-form(:state='formstate',
           v-model='formstate',
           @submit='onSubmit')#form-payment.form-payment
    .form-fieldset.form-fieldset--inputs
      .form-group.required-field
        .form-item.form-item--group-label
          label(for="payment-form-first-name").form-label
            | Cardholder Name

        .form-item.form-item--column(ref="")
          .form-control-wrapper
            validate(:class='fieldClassName(formstate.name)' data-tooltip-ref='tooltipInvalidFirstName')
              input(type='text',
                    name='first-name',
                    required,
                    @keydown.enter.prevent='showTooltipMessage',
                    v-model.lazy='model.name')#payment-form-first-name.form-control

              tooltip(ref='tooltipInvalidFirstName' anchor='center middle')
                | This is required field

        .form-item.form-item--column
          validate(:class='fieldClassName(formstate.name)')
            input(type='text',
                  name='last-name',
                  required,
                  @keydown.enter.prevent='showTooltipMessage',
                  v-model.lazy='model.name').form-control

      .form-group.required-field
        .form-item.form-item--group-label
          label.form-label
            | Card Number

        .form-item.form-item--column
          validate(auto-label, :class='fieldClassName(formstate.cardNumber)')
            input(type='phone',
                  name='card_number',
                  required,
                  v-model.lazy='model.cardNumber').form-control

        .form-item.form-item--column
          ul.payment-cards-list
            li.payment-cards-list__item.payment-cards-list__item--visa

            li.payment-cards-list__item.payment-cards-list__item--master

            li.payment-cards-list__item.payment-cards-list__item--express

            li.payment-cards-list__item.payment-cards-list__item--discovery

      .form-group.required-field
        .form-item.form-item--group-label
          label.form-label
            | Exp. Date

        .form-item.form-item--column.form-item--exp-date
          validate(:custom="{validatorSelect: validatorSelect}")
            v-select(v-model='paymentForm.expDateMM.value',
                    name='payment-form-expdate-mm',
                    ref='select-date-mm',
                    :searchable='false',
                    :allow-empty='true',
                    :show-labels='false',
                    :max-height='160',
                    required,
                    :placeholder='paymentForm.expDateMM.value.name',
                    :options='paymentForm.expDateMM.options',
                    :close-on-select='true')

          .form-item__separator

          validate(:custom="{validatorSelect: validatorSelect}")
            v-select(v-model='paymentForm.expDateYY.value',
                    name='payment-form-expdate-yy',
                    ref='select-date-yy',
                    :searchable='false',
                    :allow-empty='true',
                    :show-labels='false',
                    :max-height='160',
                    required,
                    :placeholder='paymentForm.expDateYY.value.name',
                    :options='paymentForm.expDateYY.options',
                    :close-on-select='true')

        validate(auto-label).form-item.form-item--column.form-item--cvv
          label.form-label
            | CVV/CVC

          input(type='text',
                name='email',
                required,
                v-model.lazy='model.cvv').form-control

      validate.form-group.required-field(auto-label='', :class='fieldClassName(formstate.phone)')
        .form-item.form-item--group-label
          label.form-label
            | Zip/Postal Code

        input(type='text',
              name='phone',
              required='',
              v-model.lazy='model.phone').form-control

        field-messages.form-control-feedback(name='phone', show='$touched || $submitted')
          div Success!
          div(slot='required') Phone number is a required field
          div(slot='pattern') Phone number is invalid

      .form-group.required-field
        .form-item.form-item--group-label
          .form-label
            | Subscription

        .form-item
          .subscription-type
            | Professional Annual

      validate(auto-label :custom="{validatorCheckbox: validatorCheckbox}").form-group
        span(v-bind:class="{ active: paymentForm.agreementStatus }").checkbox
          input(type="checkbox"
                name='pf-agreement-status'
                v-model='paymentForm.agreementStatus')

        label(v-html='paymentForm.agreementLabel')

      .form-group
        .form-submit

      .text-center
        button.btn-classic(type='submit') Start my PDFfiller Subscription!

    .form-fieldset.form-fieldset--paypal
      .form-payment-paypal
        .form-payment-paypal__title Or pay with PayPal

        .form-payment-paypal__button


</template>

<script>
  import VueMultiselect from '@/components/plugins/SelectMulti'
  import Tooltip from '@/components/plugins/Tooltip'
  import { helpers, className, selector } from '@/assets/js/mixins/helpers'

  export default {
    name: 'PaymentForm',
    components: {
      'tooltip': Tooltip,
      'v-select': VueMultiselect
    },
    methods: {
      validatorSelect: function(value){
        return value.value;
      },
      validatorCheckbox: function(value){
        return value;
      },
      focusOnFirstFieldError: function(e){
        let $form = this.$el;
        let $formControls = $form.querySelectorAll(selector.formControlError);
        let $errorField = $formControls[0];
        let $errorValidator = $form.querySelectorAll('.vf-field-invalid');
        //let $tooltipRef = $errorValidator[0].getAttribute('data-tooltip-ref');

        //console.log($tooltipRef);

        //this.$refs.$tooltipRef.open();

        if($errorField !== undefined){
          $errorField.focus();
        }
      },
      fieldClassName: function(field){
        let className = {
          active: 'is-active',
          success: 'has-success',
          visible: 'is-visible',
          error: 'has-error'
        };

        if(!field) {
          return '';
        }
        if(field.$valid) {
          return className.success;
        }
        if(field.$invalid) {
          return className.error;
        }
      },
      showTooltipMessage: function(e){
        let $currentElement = e.target;
        let $formGroup = _getAncestor($currentElement, selector.formGroup);
        let $isError = $formGroup.classList.contains(className.error);

        if ($isError && e.keyCode === 13) {
          this.fieldClassName($currentElement);

          e.preventDefault();
        }
      },
      hideElement: function(e) {
      },
      onSubmit: function(e) {
        console.log(this.$el.classList.contains('vf-form-valid'));
        if(this.$el.classList.contains('vf-form-valid')) {
          return;
        } else {
          this.focusOnFirstFieldError();

          e.preventDefault();
        }
      }
    },
    data () {
      return {
        formstate: {},
        model: {
          name: '',
          cardNumber: '',
          phone: '',
          department: null,
          comments: '',
          notValidated: '',
          expDateMM: '',
          cvv: ''
        },
        paymentForm: {
          expDateMM: {
            value: {name: '1', value: false},
            options: [
              {name: '1', value: '1'},
              {name: '2', value: '2'},
              {name: '3', value: '3'},
              {name: '4', value: '4'},
              {name: '5', value: '5'},
              {name: '6', value: '6'},
              {name: '7', value: '7'},
              {name: '8', value: '8'},
              {name: '9', value: '9'},
              {name: '10', value: '10'},
              {name: '11', value: '11'},
              {name: '12', value: '12'}
            ]
          },
          expDateYY: {
            value: {name: '2017', value: ''},
            options: [
              {name: '2017', value: '2017'},
              {name: '2018', value: '2018'},
              {name: '2019', value: '2019'},
              {name: '2020', value: '2020'},
              {name: '2021', value: '2021'},
              {name: '2022', value: '2022'},
              {name: '2023', value: '2023'},
              {name: '2024', value: '2024'},
              {name: '2025', value: '2025'},
              {name: '2026', value: '2026'},
              {name: '2027', value: '2027'},
              {name: '2028', value: '2028'}
            ]
          },
          agreementLabel: '<span>I have read and agree to the <a class="link" href="/en/terms_of_services.htm" target="_blank">Terms and Conditions</a></span>',
          agreementStatus: true
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/scss/_helpers";

  // TODO use variable to create padding === label column width

  $column-width: 161px;

  .form-payment {
    width: 406px;
    margin: 0 auto;
    @media (min-width: $tablet-breakpoint) {
      width: 708px;
    }

    @media (min-width: $desktop-breakpoint) {
      width: 838px;
    }
  }

  .form-item--column {
    width: 48%;
    margin-right: 4%;
    .vf-field-pristine {
      display: block;
      @media (min-width: $tablet-breakpoint) {
        display: inline-block;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    @media (min-width: $tablet-breakpoint) {
      width: 166px;
    }

    @media (min-width: $desktop-breakpoint) {
      width: $column-width;
    }
  }

  .form-item--exp-date {
    .vf-field-pristine {
      display: inline-block;
    }

    .multiselect {
      display: inline-block;
      vertical-align: top;
      width: auto;
    }
  }

  .form-item__separator {
    display: inline-block;
    width: 24px;
  }

  .form-group {
    margin-bottom: 20px;
    .form-item {
      &:last-child {
        padding-right: 0;
      }

      @media (min-width: $tablet-breakpoint) {
        display: table-cell;
        vertical-align: middle;
        padding-right: 20px;
      }
    }

    @media (min-width: $tablet-breakpoint) {
      display: table;
      table-layout: fixed;
      width: 100%;
      margin-bottom: 22px;
    }
  }

  .form-fieldset {
    @media (min-width: $tablet-breakpoint) {
      display: table-cell;
      vertical-align: top;
    }
  }

  .form-fieldset--inputs {
    @media (min-width: $tablet-breakpoint) {
      width: 522px;
      padding-right: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
      padding-right: 30px;
    }
  }

  .form-fieldset--paypal {
    vertical-align: middle;
    border: 1px solid #ddd;
    background: #f7f7f7;
    border-radius: 3px;
    @media (min-width: $tablet-breakpoint) {
      width: 302px;
    }

    @media (min-width: $desktop-breakpoint) {
      width: 341px;
    }
  }

  .form-item--group-label {
    text-align: left;
    display: block;
    padding-bottom: 2px;
    @media (min-width: $tablet-breakpoint) {
      width: 137px;
      display: inline-block;
      text-align: right;
    }
  }

  .form-item--cvv {
    text-align: right;
    .form-label {
      display: inline-block;
      margin-right: 10px;
    }

    .form-control {
      display: inline-block;
      max-width: 80px;
    }
  }

  .payment-cards-list {
    display: inline-table;
    vertical-align: middle;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  .payment-cards-list__item {
    display: table-cell;
    text-align: center;
    font-size: 0;
    &::before {
      content: "";
      display: inline-block;
      margin: 0 2px;
      width: 37px;
      height: 28px;
    }
  }

  .payment-cards-list__item--visa {
    background: url(/src/assets/img/components/payment-form/svg/card-visa.svg) no-repeat top center;
  }

  .payment-cards-list__item--master {
    background: url(/src/assets/img/components/payment-form/svg/card-master.svg) no-repeat top center;
  }

  .payment-cards-list__item--express {
    background: url(/src/assets/img/components/payment-form/svg/card-american-express.svg) no-repeat top center;
  }

  .payment-cards-list__item--discovery {
    background: url(/src/assets/img/components/payment-form/svg/card-discovery.svg) no-repeat top center;
  }

  .form-payment-paypal {
    display: table;
    position: relative;
    width: 100%;
    text-align: center;
    @media (min-width: $tablet-breakpoint) {
      margin: 0;
      max-width: 362px;
    }
  }
</style>
