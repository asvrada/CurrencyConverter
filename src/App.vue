<template>
    <div id="app">
        <banner></banner>

        <list></list>
        <edit-button></edit-button>
        <div id="padding" class="row" style="height: 70px"></div>
    

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-114654492-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-114654492-4');
</script>

</div>
</template>

<script>
    import Banner from './components/banner';
    import List from './components/list';
    import EditButton from './components/edit-button';

    export default {
        components: {Banner, List, EditButton},
        name: "app",
    };
</script>

<style>
    body {
        background: #eeeeee;
    }
</style>
