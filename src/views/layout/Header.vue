<template>
    <div class="header header-fixed align-items-center px-3">
        <div class="container d-flex justify-content-between">
            <!-- Logo (kiri) -->
        <img
            src="@/assets/icons/prodia.png"
            alt="prodia-icon"
            height="30"
            class="cursor-pointer"
            @click="$router.push({ name: 'login' })"
        >

        <!-- Tombol Logout (kanan) -->
        <button class="btn btn-danger btn-sm" @click="logout">
            <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
        </button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'header-id',
    methods: {
        logout() {
            this.$router.push({ name: 'logout' })
        }
  }
  }
  </script>
  
  <style scoped lang="scss">
  .header {
    border-bottom: solid 2px rgb(88, 87, 87);
    background-color: #fef200;
    padding: 15px 0;
    width: 100%;
  }
  
  .header-fixed {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
  </style>