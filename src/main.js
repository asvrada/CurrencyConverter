import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    created: function () {
        // 创建时载入
        store.dispatch('load');

        // 退出时保存
        window.onbeforeunload = function () {
            store.dispatch('save');
        };
    },
});
