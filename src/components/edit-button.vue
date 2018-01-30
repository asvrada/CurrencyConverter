<template>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large red" @click="toggleAppModeEditing()">
            <i class="large material-icons">edit</i>
        </a>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: "edit-button",
        methods: {
            ...mapMutations([
                'toggleAppModeEditing'
            ])
        }
    };
</script>

<style scoped>

</style>