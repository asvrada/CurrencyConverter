<template>
    <div class="table-row row" v-show="isAppModeEdit">
        <div class="col s12">
            <v-select
                    :options="getFilteredSelectList()"
                    v-on:input="onSelect">
            </v-select>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select';

    import {mapState, mapGetters, mapMutations} from "vuex";

    /**
     * The drop down list at the bottom of page when on edit mode
     */
    export default {
        name: "add-new",
        components: {vSelect},
        methods: {
            ...mapGetters([
                'getFilteredSelectList'
            ]),
            ...mapMutations([
                'toggleAppModeEditing',
                'addSelected'
            ]),
            onSelect: function ({value}) {
                this.addSelected({
                    selected: value
                });
            },
        },
        computed: {
            ...mapState([
                'isAppModeEdit'
            ]),
        }
    };
</script>

<style scoped>

</style>