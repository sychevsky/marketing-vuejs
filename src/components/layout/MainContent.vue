<template lang="pug">
  .main-content
    slot

</template>

<script>
export default {
  name: 'MainContent',
  methods: {

  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/scss/_helpers";
</style>
