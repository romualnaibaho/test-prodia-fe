<template>
    <div id="app">
        <component :is="layout"/>
    </div>
</template>

<script>
import MainLayout from './views/layout/MainLayout.vue'
import LoginLayout from '@/views/layout/LoginLayout.vue'

export default {
    name: 'App',
    components: {
      'main-layout': MainLayout,
      'login-layout': LoginLayout
    },
    computed: {
      layout() {
        const metaArr = this.$route.matched

        /**
         * it will loop from the current route up above
         * to the route parents, and will use first meta found
         */
        for (let x = metaArr.length - 1; x > -1; x -= 1) {
          if (metaArr[x].meta.layout) {
            return metaArr[x].meta.layout
          }
        }

        return 'main-layout'
      }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
}
</style>