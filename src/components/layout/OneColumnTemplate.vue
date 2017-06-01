<template lang="pug">
  .page-wrapper
    slot(name="page-header")
      page-header

    page-content
      slot

      slot(name="modals-area")

    slot(name="page-footer")
      page-footer

</template>

<script>
  import PageHeader from '@/components/layout/PageHeader'
  import MainContent from '@/components/layout/MainContent'
  import PageFooter from '@/components/layout/PageFooter'

  export default {
    name: 'OneColumnTemplate',
    components: {
      'page-header': PageHeader,
      'page-content': MainContent,
      'page-footer': PageFooter
    }
  }
</script>
