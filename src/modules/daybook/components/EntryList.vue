<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input type="text" class="form-control" placeholder="Buscar entrada" v-model="term">
        </div>

        <div class="entry-scrollarea">
            <solo-entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry"></solo-entry>
        </div>
    </div>
</template>

<script>
    import {defineAsyncComponent} from 'vue'
    import {mapGetters} from 'vuex'

    export default {
        components: {
            SoloEntry: defineAsyncComponent(() => import('./SoloEntry'))
        },
        computed: {
            ...mapGetters('journal', ['getEntriesByTerm']),
            entriesByTerm() {
                return this.getEntriesByTerm( this.term )
            }
        },
        data() {
            return {
                term: ''
            }
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