<template>
    <div class="container" id="list">
        <draggable id="tableView"
                   v-model="array"
                   :options="{
                       'disabled': !isAppModeEdit,
                       'handle': '.handle',
                       'animation': 250
                   }"
                   @start="drag=true" @end="drag=false"
        >
            <transition-group name="currency">
                <div class="table-row card row"
                     v-for="each in array"
                     :key="each">

                    <currency :abbr="each"></currency>
                </div>
            </transition-group>
        </draggable>
        <add-new></add-new>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import draggable from 'vuedraggable';

    import Currency from './currency';
    import AddNew from './add-new';

    /**
     * Main body of the page, list of different currencies
     */
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

        .currency-enter-active, .currency-leave-active {
            transition: opacity .5s;
        }

        .currency-enter, .currency-leave-to {
            opacity: 0;
        }

        .table-row:first-child {
            background: #ffcdd2;
        }

        .sortable-ghost {
            opacity: 0;
        }
    }
</style>