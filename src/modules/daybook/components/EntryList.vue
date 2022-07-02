<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input type="text" class="form-control" placeholder="Buscar entrada">
        </div>

        <div class="entry-scrollarea">
            <solo-entry v-for="item in 100" :key="item">
                Entry
            </solo-entry>
        </div>
    </div>
</template>

<script>
    import {defineAsyncComponent} from "vue";

    export default {
        components: {
            SoloEntry: defineAsyncComponent(() => import('./SoloEntry'))
        }
    }
</script>

<style lang="scss" scoped>
    .entry-list-container {
        border-right: 1px solid #2c3e50;
        height: calc( 100vh - 56px );
    }

    .entry-scrollarea {
        padding-right: 2px;
        height: calc( 100vh - 115px );
        overflow-y: scroll;
    }
</style>