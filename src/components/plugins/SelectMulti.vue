<template lang="pug">
  .multiselect(:tabindex='searchable ? -1 : 0', :class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled, 'multiselect--above': !hasEnoughSpace }", @focus='activate()', @blur='searchable ? false : deactivate()', @keydown.self.down.prevent='pointerForward()', @keydown.self.up.prevent='pointerBackward()', @keydown.enter.tab.stop.self='addPointerElement($event)', @keyup.esc='deactivate()')
    .multiselect__tags(ref='tags')
      span.multiselect__tag(v-for='option of visibleValue')
        span(v-text='getOptionLabel(option)')

        i.multiselect__tag-icon(aria-hidden='true', tabindex='1', @keydown.enter.prevent='removeElement(option)', @mousedown.prevent='removeElement(option)')

      template(v-if='internalValue && internalValue.length > limit')
        strong(v-text='limitText(internalValue.length - limit)')

      transition(name='multiselect__loading')
        slot(name='loading')
          .multiselect__spinner(v-show='loading')

      input.multiselect__input(ref='search', type='text', autocomplete='off', :placeholder='placeholder', v-if='searchable', :value='isOpen ? search : currentOptionLabel', :disabled='disabled', @input='updateSearch($event.target.value)', @focus.prevent='activate()', @blur.prevent='deactivate()', @keyup.esc='deactivate()', @keydown.down.prevent='pointerForward()', @keydown.up.prevent='pointerBackward()', @keydown.enter.prevent='', @keydown.enter.tab.stop.self='addPointerElement($event)', @keydown.delete='removeLastElement()')

      span.multiselect__single(v-if='!searchable', v-text='currentOptionLabel.name')

    slot(name='carret')
      .multiselect__select(@mousedown.prevent='toggle()')

    transition(name='multiselect')
      ul.multiselect__content(:style="{ maxHeight: maxHeight + 'px' }", ref='list', v-show='isOpen', @mousedown.prevent='')
        slot(name='beforeList')

        li(v-if='multiple && max === internalValue.length')
          span.multiselect__option
            slot(name='maxElements')
              | Maximum of {{ max }} options selected. First remove a selected option to select another.

        template(v-if='!max || internalValue.length < max')
          li.multiselect__element(v-for='(option, index) of filteredOptions', :key='index')
            span.multiselect__option(
                 tabindex='0',
                 v-if='!(option && option.$isLabel)',
                 :class='optionHighlight(index, option)',
                 @mousedown.prevent='select(option)',
                 @mouseenter='pointerSet(index)',
                 :data-select='option && option.isTag ? tagPlaceholder : selectLabelText',
                 :data-selected='selectedLabelText',
                 :data-deselect='deselectLabelText')
              slot(name='option', :option='option', :search='search')
                span {{ getOptionLabel(option.name) }}

            span.multiselect__option.multiselect__option--disabled(v-if='option && option.$isLabel', :class='optionHighlight(index, option)')
              | {{ option.$groupLabel }}

        li(v-show='filteredOptions.length === 0 && search && !loading')
          span.multiselect__option
            slot(name='noResult') No elements found. Consider changing the search query.

        slot(name='afterList')
</template>

<script>
  import multiselectMixin from '@/assets/js/mixins/multiselectMixin'
  import pointerMixin from '@/assets/js/mixins/pointerMixin'

  export default {
    name: 'VueMultiselect',
    mixins: [multiselectMixin, pointerMixin],
    props: {
      /**
       * String to show when pointing to an option
       * @default 'Press enter to select'
       * @type {String}
       */
      isRequired: {
        type: Boolean,
        default: true
      },
      selectLabel: {
        type: String,
        default: 'Press enter to select'
      },
      /**
       * String to show next to selected option
       * @default 'Selected'
       * @type {String}
       */
      selectedLabel: {
        type: String,
        default: 'Selected'
      },
      /**
       * String to show when pointing to an alredy selected option
       * @default 'Press enter to remove'
       * @type {String}
       */
      deselectLabel: {
        type: String,
        default: 'Press enter to remove'
      },
      /**
       * Decide whether to show pointer labels
       * @default true
       * @type {Boolean}
       */
      showLabels: {
        type: Boolean,
        default: true
      },
      /**
       * Limit the display of selected options. The rest will be hidden within the limitText string.
       * @default 'label'
       * @type {String}
       */
      limit: {
        type: Number,
        default: 99999
      },
      /**
       * Sets maxHeight style value of the dropdown
       * @default 300
       * @type {Integer}
       */
      maxHeight: {
        type: Number,
        default: 300
      },
      /**
       * Function that process the message shown when selected
       * elements pass the defined limit.
       * @default 'and * more'
       * @param {Int} count Number of elements more than limit
       * @type {Function}
       */
      limitText: {
        type: Function,
        default: count => `and ${count} more`
      },
      /**
       * Set true to trigger the loading spinner.
       * @default False
       * @type {Boolean}
       */
      loading: {
        type: Boolean,
        default: false
      },
      /**
       * Disables the multiselect if true.
       * @default false
       * @type {Boolean}
       */
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      visibleValue () {
        return this.multiple
          ? this.internalValue.slice(0, this.limit)
          : []
      },
      deselectLabelText () {
        return this.showLabels
          ? this.deselectLabel
          : ''
      },
      selectLabelText () {
        return this.showLabels
          ? this.selectLabel
          : ''
      },
      selectedLabelText () {
        return this.showLabels
          ? this.selectedLabel
          : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/_helpers";

  fieldset[disabled] .multiselect {
    pointer-events: none;
  }

  .multiselect__spinner {
    position: absolute;
    right: 1px;
    top: 1px;
    width: 48px;
    height: 35px;
    display: block;
    &::before,
    &::after {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      margin: -8px 0 0 -8px;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      border-color: #41B883 transparent transparent;
      border-style: solid;
      border-width: 2px;
      box-shadow: 0 0 0 1px transparent;
    }
    &::before {
      animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
      animation-iteration-count: infinite;
    }
    &::after {
      animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
      animation-iteration-count: infinite;
    }
  }

  .multiselect__loading-enter-active,
  .multiselect__loading-leave-active {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
  }

  .multiselect__loading-enter,
  .multiselect__loading-leave-active {
    opacity: 0;
  }

  .multiselect,
  .multiselect__input,
  .multiselect__single {
    height: $form-control-height - 2;
    height: $form-control-height - 2;
    line-height: $form-control-height - 2;
    font-family: inherit;
    font-size: $base-font-size;
    touch-action: manipulation;
  }

  .multiselect {
    display: block;
    position: relative;
    width: 100%;
    min-height: $form-control-height;
    text-align: left;
    color: #35495E;
    &:focus {
      outline: none;
    }
  }

  .multiselect--disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .multiselect--active {
    z-index: 50;
    box-shadow: $form-active-el-shadow;
    .multiselect__current, .multiselect__input, .multiselect__tags {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .multiselect__select {
      &::before {
        transition: all $transition-time;
        transform: rotateZ(180deg);
      }
    }
  }

  .multiselect--above.multiselect--active {
    .multiselect__current, .multiselect__input, .multiselect__tags {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  .multiselect__input,
  .multiselect__single {
    position: relative;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: none;
    border-radius: $border-radius;
    padding: 1px 0 0 5px;
    width: calc(100%);
    transition: border 0.1s ease;
    box-sizing: border-box;

    .product-plan & {
      font-size: 12px;
      font-weight: $bold;
    }
  }

  .multiselect__tag ~ {
    .multiselect__input, .multiselect__single {
      width: auto;
    }
  }

  .multiselect__input:hover, .multiselect__single:hover {
    border-color: #cfcfcf;
  }

  .multiselect__input:focus {
    border-color: #a8a8a8;
    outline: none;
  }

  .multiselect__single {
    &:focus {
      border-color: #a8a8a8;
      outline: none;
    }
    padding-left: 10px;
  }

  .multiselect__tags {
    display: block;
    min-height: $form-control-height;
    padding: 0 32px 0 0;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: $bg-color;
    .has-error &,
    .vf-field-invalid & {
      border-color: $accent-color;
    }
  }

  .multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: $border-radius;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    margin-bottom: 8px;
    white-space: nowrap;
    background: #41B883;
  }

  .multiselect__tag-icon {
    cursor: pointer;
    margin-left: 7px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-weight: 700;
    font-style: initial;
    width: 22px;
    text-align: center;
    line-height: 22px;
    transition: all 0.2s ease;
    border-radius: 5px;
    &::after {
      content: "×";
      color: #266d4d;
      font-size: 14px;
    }
    &:focus, &:hover {
      background: #369a6e;
    }
    &:focus::after,
    &:hover::after {
      color: white;
    }
  }

  .multiselect__current {
    line-height: 16px;
    min-height: 40px;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    padding: 8px 12px 0;
    padding-right: 30px;
    white-space: nowrap;
    margin: 0;
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid #E8E8E8;
    cursor: pointer;
  }

  .multiselect__select {
    line-height: 16px;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    right: 1px;
    top: 1px;
    padding: $form-control-padding;
    margin: 0;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    &::before {
      display: block;
      position: absolute;
      right: 12px;
      top: 50%;
      width: 9px;
      height: 6px;
      margin-top: -3px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5JbXBvcnRlZCBMYXllcnM8L3RpdGxlPjxwYXRoIGQ9Ik0wIDEuNjAyTDEuNTQzIDBsMi42OTIgMi43OTVMNi45MjcgMGwxLjU0NCAxLjYwMkw0LjIzNSA2eiIgZmlsbD0iIzQ0NCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
      content: "";
      transition: transform .4s ease;
    }
  }

  .multiselect__placeholder {
    display: inline-block;
    margin-bottom: 10px;
    padding-top: 2px;
    color: #ADADAD;
  }

  .multiselect--active .multiselect__placeholder {
    display: none;
  }

  .multiselect__content {
    position: absolute;
    list-style: none;
    display: block;
    background: #fff;
    width: 100%;
    max-height: 240px;
    overflow: auto;
    padding: 0;
    margin: 2px 0;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    z-index: 50;
  }

  .multiselect--above .multiselect__content {
    bottom: 100%;
    border-bottom: none;
    border-top: 1px solid $border-color;
  }

  .multiselect__content::webkit-scrollbar {
    display: none;
  }

  .multiselect__element {
    display: block;
  }

  .multiselect__option {
    display: block;
    padding: $form-control-padding;
    min-height: $form-control-height;
    line-height: 22px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    &::after {
      top: 0;
      right: 0;
      position: absolute;
      line-height: 40px;
      padding-right: 12px;
      padding-left: 20px;
    }
  }

  .multiselect__option--highlight {
    background: #41B883;
    outline: none;
    color: white;
    &::after {
      content: attr(data-select);
      background: #41B883;
      color: white;
    }
  }

  .multiselect__option--selected {
    background: #F3F3F3;
    color: #35495E;
    font-weight: bold;
    &:after {
      content: attr(data-selected);
      color: silver;
    }
    &.multiselect__option--highlight {
      background: #FF6A6A;
      color: #fff;
      &:after {
        background: #FF6A6A;
        content: attr(data-deselect);
        color: #fff;
      }
    }
  }

  .multiselect--disabled {
    background: #ededed;
    pointer-events: none;
    .multiselect__current, .multiselect__select {
      background: #ededed;
      color: #a6a6a6;
    }
  }

  .multiselect__option--disabled {
    color: #a6a6a6;
    cursor: text;
    pointer-events: none;
    background: #ededed;
    &.multiselect__option--highlight {
      background: #dedede !important;
    }
  }

  .multiselect-enter-active,
  .multiselect-leave-active {
    transition: all 0.15s ease;
  }

  .multiselect-enter,
  .multiselect-leave-active {
    opacity: 0;
  }

  @keyframes spinning {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(2turn);
    }
  }
</style>
