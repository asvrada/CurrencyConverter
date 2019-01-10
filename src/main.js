import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    created: function () {
        // load exchange rate from localStorage
        store.dispatch('load');

        // save the exchange rate to localStorage when exit
        window.onbeforeunload = function () {
            store.dispatch('save');
        };
    },
});
