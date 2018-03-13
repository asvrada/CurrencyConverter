import Vue from 'vue';
import Vuex from 'vuex';

import {convertByRate, updateRateFromAPI} from './helper';
import {abbrNations, rates} from './data.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // localStorage
        STORAGE_KEY: 'jeff-currency-converter',
        willSave: true,

        // 是否进入了编辑模式（可以增删货币
        isAppModeEdit: false,

        // 当前正在编辑的国家的abbr
        abbrInputEditing: null,

        /**
         * 国家缩写对应全称
         */
        abbr2NameEnglish: abbrNations,

        /**
         * 需要保存
         *
         * 以 listAbbr[0] 作为标准单位，记录其数据
         * @type {{amount}}
         */
        baseCurrency: {
            amount: 1000
        },

        /**
         * 需要保存
         *
         * 显示的国家
         * 每一项为国家三个英文字母的缩写
         */
        listAbbr: ['USD', 'CNY', 'EUR', 'JPY', 'HKD', 'KRW', 'AUD', 'GBP'],

        /**
         * 需要保存
         *
         * 从网络或者本地缓存获取汇率
         * 其中的rate为相对美元的汇率
         * 即 rate = 1美元对应该币种数量
         * @type {{string:rate}}
         */
        table: rates,

        /**
         * 需要保存
         *
         * 格式与 new Date() 返回值相同
         * @type {number}
         */
        timestamp: 1517073986844,
    },
    mutations: {
        load(state, {amount, listAbbr, tableRate, timestamp}) {
            !amount || (state.baseCurrency.amount = amount);
            !listAbbr || (state.listAbbr = listAbbr);
            !tableRate || (state.table = tableRate);
            !timestamp || (state.timestamp = timestamp);
        },
        addSelected({listAbbr}, {selected}) {
            if (-1 === listAbbr.indexOf(selected)) {
                listAbbr.push(selected);
            }
        },
        changeTopRow({listAbbr}, {abbr}) {
            if (abbr === listAbbr[0]) {
                return;
            }

            // number, index
            const indexClicked = listAbbr.indexOf(abbr);
            const tmp = listAbbr[indexClicked];

            // 交换头部
            Vue.set(listAbbr, indexClicked, listAbbr[0]);
            Vue.set(listAbbr, 0, tmp);
        },
        updateAmount({baseCurrency, listAbbr, table}, {amount, abbr}) {
            baseCurrency.amount = convertByRate({
                fromRate: table[abbr],
                toRate: table[listAbbr[0]],
                amount
            });
        },
        toggleEditing(state, {abbr}) {
            // 如果传值为空，退出编辑
            if (!abbr) {
                state.abbrInputEditing = null;
                return;
            }

            // 如果与当前编辑相同
            // 切换编辑状态 (abbr|null)
            if (abbr === state.abbrInputEditing) {
                state.abbrInputEditing = state.abbrInputEditing ? null : abbr;
                return;
            }

            // 如果不同
            state.abbrInputEditing = abbr;
        },
        toggleAppModeEditing(state) {
            state.isAppModeEdit = !state.isAppModeEdit;
        },
        deleteAbbr({listAbbr, baseCurrency, table}, {abbr}) {
            // 删除某一行，但保持所有数值不变

            if (listAbbr.length <= 1) {
                alert("Cannot delete the last element!");
                return;
            }

            const index = listAbbr.indexOf(abbr);

            // 如果删除的是当前第一行
            // 等价转换到当前第二行的货币
            // 确保显示的数字不变
            if (index === 0) {
                // 转换一下
                baseCurrency.amount = convertByRate({
                    fromRate: table[listAbbr[0]],
                    toRate: table[listAbbr[1]],
                    amount: baseCurrency.amount
                });
            }

            // 删除元素
            listAbbr.splice(index, 1);
        }
    },
    actions: {
        load(context) {
            const storage = JSON.parse(localStorage.getItem(context.state.STORAGE_KEY));

            if (storage) {
                context.commit('load', storage);
                console.log("Loaded from localStorage");
            } else {
                console.log("Loaded from default");
            }

            // 1000mill * 60sec * 60min * 24hr = 86400000
            if ((Date.now() - context.state.timestamp) > 86400000) {
                // 数据过期
                console.log("Updating rate...");

                updateRateFromAPI((data) => {
                    context.commit('load', {
                        tableRate: data,
                        timestamp: Date.now()
                    });

                    console.log("Update complete");
                });
            }
        },
        save({state}) {
            if (!state.willSave) {
                return;
            }

            localStorage.setItem(state.STORAGE_KEY, JSON.stringify({
                amount: state.baseCurrency.amount,
                listAbbr: state.listAbbr,
                tableRate: state.table,
                timestamp: state.timestamp
            }));

            console.log("Saved to local");
        },
    },
    getters: {
        convertTo: ({table}) => ({from, to, amount}) => {
            // 确保 amount 合理
            amount = Math.abs(parseFloat(amount));
            if (isNaN(amount)) {
                amount = 0;
            }

            if (from === to) {
                return amount;
            }

            return convertByRate({
                fromRate: table[from],
                toRate: table[to],
                amount
            });
        },
        getCurrency: ({abbr2NameEnglish}, getter) => ({abbr}) => {
            return {
                // todo: img
                img: '',
                unit: abbr2NameEnglish[abbr],
                amount: getter.getAmount({
                    abbr
                })
            };
        },
        // 仅用于显示
        getAmount: ({listAbbr, baseCurrency}, getter) => ({abbr}) => {
            return Math.round(getter.convertTo({
                from: listAbbr[0],
                to: abbr,
                amount: baseCurrency.amount
            }) * 10) / 10;
        },
        /**
         * 返回过滤过的列表
         * @returns {[{abbr, name}]}
         */
        getFilteredSelectList: ({listAbbr, abbr2NameEnglish}) => {
            let ret = [];

            for (let each in abbr2NameEnglish) {
                if (listAbbr.indexOf(each) !== -1) {
                    continue;
                }

                ret.push({
                    value: each,
                    label: abbr2NameEnglish[each]
                });
            }

            return ret.sort(function (a, b) {
                return a["label"] < b["label"] ? -1 : 1;
            });
        }
    }
});

export default store;
