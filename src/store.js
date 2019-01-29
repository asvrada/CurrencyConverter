import Vue from 'vue';
import Vuex from 'vuex';

import {convertByRate, updateRateFromAPI} from './helper';
import {abbrNations, rates} from './data.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    ///////////
    // STATE //
    ///////////
    state: {
        // key for localStorage
        STORAGE_KEY: 'jeff-currency-converter',
        willSave: true,

        // true if edit mode is on
        isAppModeEdit: false,

        // 当前正在编辑的国家的abbr
        abbrInputEditing: null,

        /**
         * a dict of abbreviation of currency to the full name of the nation
         */
        abbr2NameEnglish: abbrNations,

        /**
         * The amount of the base currency (the first one in the list with red background)
         * This will be stored in localStorage
         *
         * @type {{int}}
         */
        baseCurrency: {
            amount: 1000
        },

        /**
         * List of currencies on display
         *
         * This will be stored in localStorage
         */
        listAbbr: ['USD', 'CNY', 'EUR', 'JPY', 'HKD', 'KRW', 'AUD', 'GBP'],

        /**
         * Exchange rate of all currency to USD
         *
         * This will be stored in localStorage
         *
         * @type {{string}, {number}}
         */
        table: rates,

        /**
         * The timestamp of latest exchange rate
         * Obtained by `new Date()`
         * This will be stored in localStorage
         *
         * @type {number}
         */
        timestamp: 1517073986844,
    },
    ///////////////
    // MUTATIONS //
    ///////////////
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

            // Move to top
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
            if (!abbr) {
                state.abbrInputEditing = null;
                return;
            }

            // If we are editing the same currency
            // Toggle edit mode
            if (abbr === state.abbrInputEditing) {
                state.abbrInputEditing = state.abbrInputEditing ? null : abbr;
                return;
            }

            // Now editing other currency
            // Stay in edit mode, but change the subject
            state.abbrInputEditing = abbr;
        },
        toggleAppModeEditing(state) {
            state.isAppModeEdit = !state.isAppModeEdit;
        },
        // Delete one item from list
        deleteAbbr({listAbbr, baseCurrency, table}, {abbr}) {
            if (listAbbr.length <= 1) {
                alert("Cannot delete the last element!");
                return;
            }

            const index = listAbbr.indexOf(abbr);

            // if deleting first element, change base currency to make sure the amount stay the same
            if (index === 0) {
                baseCurrency.amount = convertByRate({
                    fromRate: table[listAbbr[0]],
                    toRate: table[listAbbr[1]],
                    amount: baseCurrency.amount
                });
            }

            // delete the item at index
            listAbbr.splice(index, 1);
        }
    },
    /////////////
    // ACTIONS //
    /////////////
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
                // update exchange rate if it expires
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
        // save to localStorage
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
    /////////////
    // GETTERS //
    /////////////
    getters: {
        convertTo: ({table}) => ({from, to, amount}) => {
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
        // get the amount to be displayed
        getAmount: ({listAbbr, baseCurrency}, getter) => ({abbr}) => {
            return Math.round(getter.convertTo({
                from: listAbbr[0],
                to: abbr,
                amount: baseCurrency.amount
            }) * 10) / 10;
        },
        /**
         * Generate the content for drop down list
         *
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
