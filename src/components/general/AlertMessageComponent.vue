<template>
    <div v-show="errorMsg" class="col-12 mb-3">
        <div
            class="alert text-center"
            :class="type === 'error' ? 'alert-danger' : 'alert-success'"
            role="alert"
        >
            {{ errorMsg }}
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ErrorMessageComponent.vue',
    props: {
        errorMsg: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'error'
        }
    }
}
</script>