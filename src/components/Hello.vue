<template lang="pug">

  .page-section
    .page-section__inner
      h1 {{ msg }}

      p TODO: make styled Select with default functionality

      form.form
        .form-row
          h3 Form elements

        .form-row
          label.form-row__title

          v-select(v-model='formData.select.value',
                  :searchable='false',
                  :allow-empty='true',
                  :show-labels='false',
                  :placeholder='formData.select.value.name',
                  :options='formData.select.options',
                  :close-on-select='true')

        .form-row
          input(type="text" placeholder="Form input with placeholder").form-control

      h3 Modal

      div
        p TODO: make buttons with Icons: github, etc

        .grid
          .grid__column
            .items-list
              .items-list__item
                a(href="#" v-on:click='showExampleModal').btn-primary
                  | Event: Show example Modal

              .items-list__item
                a(href="#typography" v-on:click.prevent='scrollToAnchor').btn-primary
                  | Event: Smooth scroll to element

              .items-list__item
                a(href="#").btn-primary.is-disabled
                  | Button Primary disabled

              .items-list__item
                a(href="#").btn-primary.is-rounded
                  | Button Primary rounded

              .items-list__item
                a(href="#").btn-primary.is-rounded.is-disabled
                  | Button Primary rounded disabled

          .grid__column
            .items-list
              .items-list__item
                a(href="#").btn-secondary
                  | Button Secondary

              .items-list__item
                a(href="#").btn-secondary.is-disabled
                  | Button Secondary disabled

              .items-list__item
                a(href="#").btn-secondary.is-disabled.is-rounded
                  | Button Secondary rounded disabled

              .items-list__item
                a(href="#").btn-primary.is-rounded
                  | Rounded Button

      modal(ref='exampleModal', icon="success" class="modal")
        | Example data

      div#typography
        h1 Typography

        .section-title Section title

        .section-subtitle Section subtitle

      div#cards-list
        h1 Cards list

      div#badges-list
        h1 Badges list

      div#plans
        p test

</template>

<script>
  //import Router from '../router/index'
  import { R } from '@/assets/js/libraries/ramda.min'
  import VueMultiselect from '@/components/plugins/SelectMulti'
  import Slider from '@/components/plugins/VueSlider'
  import SweetModal from '@/components/plugins/SweetModal'
  import { helpers, className, selector } from '@/assets/js/mixins/helpers'

  export default {
    name: 'hello',
    components: {
      'v-select': VueMultiselect,
      'plans-slider': Slider,
      'modal': SweetModal
    },
    methods: {
      showExampleModal: function(){
        this.$refs.exampleModal.open();
      },
      scrollToAnchor: function(e){
        let $el = e.target;
        let $elAnchor = $el.getAttribute('href');

        document.querySelector($elAnchor).scrollIntoView({ behavior: 'smooth' });
      }
    },
    beforeCreate () {
    },
    data () {
      return {
        msg: 'Vue.js UI kit',
        formData: {
          select: {
            value: {name: 'Example Option'},
            options: [
              {
                name: 'Example Option',
                value: 'test-value-1'
              },
              {
                name: 'Example Option 2',
                value: 'test-value-2'
              },
              {
                name: 'Example Option 3',
                value: 'test-value-3'
              }
            ]
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../assets/scss/_helpers";
  @import "../assets/scss/_scaffolding";

  h1 {
    text-align: center;
  }

  .page-section__inner {
    @extend %container;
  }

  .form-row {
    margin-bottom: 18px;
  }

  .items-list {
    @include list-unstyled();
  }

  .items-list__item {
    margin-bottom: 14px;
  }

  $grid-gutter: 5%;
  .grid {
    @include clearfix();
  }

  .grid__column {
    padding: 0 $grid-gutter;
    float: left;
    width: 50%;
    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

</style>
