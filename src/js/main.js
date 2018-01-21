import Vue from 'vue';
import vSelect from 'vue-select'

import {Preferences} from './Preferences.js';
import {CurrencyConverter} from './CurrencyConverter';

import '../sass/index.scss';

// Assign true to FLAG if it's undefined
FLAG_SAVE = FLAG_SAVE || true;

Vue.component('v-select', vSelect);

const app = new Vue({
    el: "#app",
    data: {
        preferences: new Preferences(),
        converter: new CurrencyConverter(),

        modeEdit: false,
        // Is <input> activated?
        isEditing: false,

        // 以下3项需要onload初始化
        // 当前正在编辑的国家的abbr
        editing: null,
        editingAmount: null,
        selections: [],
    },
    computed: {
        topRowAbbr: function () {
            return this.preferences.rows[0];
        },
        dataAmount: function () {
            // 返回dict
            // abbr -> money
            const rows = this.preferences.rows;

            let ret = {};
            for (let each in rows) {
                each = rows[each];

                ret[each] = (each === this.editing)
                    ? this.editingAmount
                    : this.converter.convert(this.editing, this.editingAmount, each)
            }

            return ret;
        },
        dataRows: function () {
            const table = this.converter.table;
            const rows = this.preferences.rows;

            let ret = [];
            for (let each in rows) {
                // Dont forget that for-in for arrays returns index
                each = rows[each];

                let tmp = {
                    cache: table[each],
                    amount: this.round(this.dataAmount[each])
                };

                ret.push(tmp);
            }

            return ret;
        },
        dataSelection: function () {
            const that = this;

            let ret = [];

            Object.keys(this.converter.abbr2NameEnglish).map(function (each) {
                // key: "USD"
                // name: "USA Dollar"
                const name = that.converter.abbr2NameEnglish[each];

                ret.push({
                    value: each,
                    label: name
                });
            });

            return ret.filter(function (each) {
                return -1 === that.preferences.rows.indexOf(each["value"]);
            }).sort(function (a, b) {
                return a["label"] < b["label"] ? -1 : 1;
            });
        },
    },
    methods: {
        round: function (num) {
            return Math.round(num * 10) / 10;
        },
        toggleEditMode: function () {
            const that = this;

            this.modeEdit = !this.modeEdit;

            // 如果用户退出编辑模式
            // 更新列表，清空输入数据
            if (!this.modeEdit && this.selections.length !== 0) {
                this.selections.forEach(function (each) {
                    that.preferences.rows.push(each["value"]);
                });

                this.selections = [];
            }
        },
        btnRemove: function (abbr) {
            const rows = this.preferences.rows;

            if (rows.length <= 1) {
                alert("Can't remove the last element!");
                return;
            }

            rows.splice(rows.indexOf(abbr), 1);
        },
        changeTopRow: function (abbr) {
            const rows = this.preferences.rows;

            // 取消editing状态
            this.isEditing = false;

            // 改变top的row，但是保留当前金额
            const prevAmount = this.dataAmount[this.topRowAbbr];
            // number, index
            const indexClicked = rows.indexOf(abbr);

            // swap
            // bug: computed value topRowAbbr没有被更新
            const tmp = rows[indexClicked];
            Vue.set(rows, indexClicked, rows[0]);
            Vue.set(rows, 0, tmp);


            // 以下代码仅仅为了触发dataAmount重算
            this.editing = abbr;
            this.editingAmount = this.round(prevAmount);
        },
        editRow: function (abbr, event) {
            // 再次点击退出编辑
            if (this.isEditing) {
                this.doneEdit(abbr);
                return;
            }

            this.editingAmount = this.round(this.dataAmount[abbr]);
            this.editing = abbr;

            this.isEditing = true;

            // 全选输入数据以便快速修改，该死的DOM操作
            // 延迟执行以确保input能够响应
            setTimeout(function () {
                document.getElementById("input-" + abbr).select();
            });
        },
        doneEdit: function (abbr) {
            this.isEditing = false;
        },
        beforeDestroy: function () {
            // update topRow.amount
            this.preferences.amount = this.dataAmount[this.topRowAbbr];

            // Save
            this.preferences.save();
            this.converter.save();
        },
        onBlur: function (abbr) {
            this.doneEdit(abbr);
        }
    },
    beforeMount: function () {
        // 读取
        this.preferences.load();
        this.converter.load();

        this.editing = this.topRowAbbr;
        this.editingAmount = this.preferences.amount;
    },
    mounted: function () {
    },
    directives: {
        'input-focus': function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
});

window.onbeforeunload = function () {
    if (FLAG_SAVE) {
        app.beforeDestroy();
    }
};
