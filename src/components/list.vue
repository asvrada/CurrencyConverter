<template>
    <div class="container" id="list">
        <div id="tableView" class="">
            <div class="table-row card row"
                 v-for="each in listAbbr"
                 :key="each">
                <currency :abbr="each"></currency>
            </div>

            <add-new></add-new>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    import Currency from 'components/currency';
    import AddNew from 'components/add-new';

    export default {
        name: "list",
        components: {Currency, AddNew},
        computed: mapState([
            'listAbbr'
        ]),
        methods: {},
    };
</script>

<style scoped lang="scss">
    #tableView {
        line-height: 2;
        font-size: 1.3em;

        .table-row:first-child {
            background: #ffcdd2;
        }
    }
</style>