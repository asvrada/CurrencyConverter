<template>
    <div class="container" id="list">
        <div id="tableView" class="">
            <div class="table-row card row"
                 v-for="each in listAbbr"
                 :key="each">
                <currency :abbr="each"></currency>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    import Currency from 'components/currency';

    export default {
        name: "list",
        components: {Currency},
        computed: mapState([
            'listAbbr'
        ]),
        methods: {},
    };
</script>

<style scoped>

</style>