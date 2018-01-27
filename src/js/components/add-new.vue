<template>
    <div class="table-row row" v-show="isAppModeEdit">
        <div class="col s8">
            <v-select multiple :value.sync="selected" :options="getFilteredSelectList()">
            </v-select>
        </div>
        <div class="col s2">
            <button class="waves-effect waves-light btn" @click="quitEdit()">Done</button>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select';

    import {mapState, mapGetters, mapMutations} from "vuex";

    export default {
        name: "add-new",
        components: {vSelect},
        data: function () {
            return {
                selected: []
            };
        },
        methods: {
            ...mapGetters([
                'getFilteredSelectList'
            ]),
            ...mapMutations([
                'toggleAppModeEditing',
                'addSelected'
            ]),
            quitEdit: function () {
                this.toggleAppModeEditing();
                this.addSelected({
                    selected: this.selected
                });
                this.selected = [];
            }
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