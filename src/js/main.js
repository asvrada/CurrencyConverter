import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    created: function () {
        store.dispatch('load');

        window.onbeforeunload = function () {
            store.dispatch('save');
        };
    },
});
