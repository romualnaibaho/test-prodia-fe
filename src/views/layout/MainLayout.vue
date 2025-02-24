<template>
    <div class="login-app">
        <!-- header -->
        <app-header/>
    
        <!-- content -->
        <div class="position-relative">
            <router-view></router-view>
        </div>
    
        <!-- footer -->
        <app-footer/>
    </div>
</template>
  
<script>
import AppHeader from './Header.vue'
import AppFooter from './Footer.vue'

export default {
    name: 'main-layout',
    components: {
        AppHeader,
        AppFooter
    }
}
</script>