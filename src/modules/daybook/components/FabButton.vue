<template>
    <button class="btn" :class="buttonColor">
        <i class="fa fa" :class="icon"></i>
    </button>
</template>

<script>
    // fa-plus

    export default {
        props: {
            icon: {
                default: 'fa-plus'
            },
            buttonColor: {
                default: 'btn-primary'
            }
        },
    }
</script>

<style lang="scss" scoped>
    button {
        border-radius: 100%;
        bottom: 20px;
        height: 50px;
        position: fixed;
        right: 20px;
        width: 50px;
    }
</style>