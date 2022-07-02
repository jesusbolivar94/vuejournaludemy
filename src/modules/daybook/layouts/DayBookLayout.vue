<template>
    <Navbar></Navbar>

    <div class="d-flex">
        <div class="col-4">
            <entry-list></entry-list>
        </div>
        <div class="col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { defineAsyncComponent } from 'vue'

    export default {
        components: {
            Navbar: defineAsyncComponent(() => import('../components/NavbarDayBook')),
            EntryList: defineAsyncComponent(() => import('../components/EntryList'))
        }
    }
</script>