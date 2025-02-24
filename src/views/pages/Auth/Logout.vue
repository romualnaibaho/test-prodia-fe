<template>
    <div></div>
</template>

<script>

export default {
    name: 'logout',
    beforeCreate() {
        // TODO: will investigate later
        this.$general.deleteCookies()
        this.$store.commit('auth/logout')
        this.$router.push({ name: 'login' })
    }
}
</script>