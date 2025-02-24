<template>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center p-3">
          <img alt="Error" class="img-error" src="@/assets/images/error/404.png"/>
          <p class="fw-bold f-20 ls-4 text-deep-grey mt-4 mb-0">
            Maaf, halaman yang anda cari tidak ditemukan.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'error-not-found',
    mounted() {
      setTimeout(() => {
        this.$router.push({ name: 'home' })
      }, 5000)
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .img-error {
    width: 450px;
  }
  </style>