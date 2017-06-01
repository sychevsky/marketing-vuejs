<template>
  <div id="app">
    <Slideout menu="#menu" panel="#sliding-panel" :toggleSelectors="['.toggle-button']" @on-open="open">
      <main id="sliding-panel">
        <button class="toggle-button">☰</button>

        <router-view></router-view>
      </main>

      <header>
        <nav id="menu">
          <div class="test">
            test
          </div>
        </nav>
      </header>
    </Slideout>
  </div>
</template>

<script>
  import Slideout from '@/components/plugins/Slideout'

  export default {
    name: 'app',
    components: {
      'Slideout': Slideout
    },
    methods: {
      open: function(){
        let $slidingPanel = document.querySelectorAll('#sliding-panel');
        $slidingPanel.classList.add(className.open);
        console.log('slideoutOpen')
      }
    },
    ready: function(){
      window.addEventListener('resize', this.handleResize)
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/_helpers";
  @import "./assets/scss/_scaffolding";

  #menu {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    width: 220px;
  }

  .slideout-open #menu {
    display: block;
  }

  .toggle-button {
    position: absolute;
    z-index: 375;
    right: 0;
    top: 0;
  }

  #sliding-panel {
    position: relative;
    z-index: 100;
    will-change: transform;
    background: $bg-color;
  }

  .slideout-menu {
    position: relative;
    will-change: transform;
    z-index: 50;
  }
</style>
