<template>
    <div class="container" id="list">
        <draggable id="tableView"
                   v-model="array"
                   :options="{
                       'disabled': !isAppModeEdit,
                       'handle': '.handle'
                   }"
                   @start="drag=true" @end="drag=false"
        >
            <div class="table-row card row"
                 v-for="each in array"
                 :key="each">
                <currency :abbr="each"></currency>
            </div>
        </draggable>
        <add-new></add-new>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import draggable from 'vuedraggable';

    import Currency from 'components/currency';
    import AddNew from 'components/add-new';

    export default {
        name: "list",
        components: {Currency, AddNew, draggable},
        computed: {
            ...mapState([
                'listAbbr',
                'isAppModeEdit'
            ]),

            array: {
                get() {
                    return this.listAbbr;
                },
                set(value) {
                    this.load({
                        listAbbr: value
                    });
                }
            }
        },
        methods: mapMutations([
            'load'
        ]),
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