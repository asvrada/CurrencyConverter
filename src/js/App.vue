<template>
    <div id="app">
        <banner></banner>
        <list></list>
        <edit-button></edit-button>
        <add-new></add-new>
        <div id="padding" class="row" style="height: 70px"></div>
    </div>
</template>

<script>
    import Banner from 'components/banner';
    import List from 'components/list';
    import EditButton from 'components/edit-button';
    import AddNew from 'components/add-new';

    export default {
        components: {Banner, List, EditButton, AddNew},
        name: "app"
    };
</script>

<style>
    body {
        background: #eeeeee;
    }
</style>