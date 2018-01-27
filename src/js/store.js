import Vue from 'vue';
import Vuex from 'vuex';

import {convertByRate, updateRateFromAPI} from './helper';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // localStorage
        STORAGE_KEY: 'jeff-currency-converter',
        dataReady: false,
        willSave: true,

        // 是否进入了编辑模式（可以增删货币
        isAppModeEdit: false,

        // 当前正在编辑的国家的abbr
        abbrInputEditing: null,

        /**
         * 国家缩写对应全称
         */
        abbr2NameEnglish: {
            "AED": "United Arab Emirates Dirham",
            "AFN": "Afghan Afghani",
            "ALL": "Albanian Lek",
            "AMD": "Armenian Dram",
            "ANG": "Netherlands Antillean Guilder",
            "AOA": "Angolan Kwanza",
            "ARS": "Argentine Peso",
            "AUD": "Australian Dollar",
            "AWG": "Aruban Florin",
            "AZN": "Azerbaijani Manat",
            "BAM": "Bosnia-Herzegovina Convertible Mark",
            "BBD": "Barbadian Dollar",
            "BDT": "Bangladeshi Taka",
            "BGN": "Bulgarian Lev",
            "BHD": "Bahraini Dinar",
            "BIF": "Burundian Franc",
            "BMD": "Bermudan Dollar",
            "BND": "Brunei Dollar",
            "BOB": "Bolivian Boliviano",
            "BRL": "Brazilian Real",
            "BSD": "Bahamian Dollar",
            "BTC": "Bitcoin",
            "BTN": "Bhutanese Ngultrum",
            "BWP": "Botswanan Pula",
            "BYN": "New Belarusian Ruble",
            "BYR": "Belarusian Ruble",
            "BZD": "Belize Dollar",
            "CAD": "Canadian Dollar",
            "CDF": "Congolese Franc",
            "CHF": "Swiss Franc",
            "CLF": "Chilean Unit of Account (UF)",
            "CLP": "Chilean Peso",
            "CNY": "Chinese Yuan",
            "COP": "Colombian Peso",
            "CRC": "Costa Rican Colón",
            "CUC": "Cuban Convertible Peso",
            "CUP": "Cuban Peso",
            "CVE": "Cape Verdean Escudo",
            "CZK": "Czech Republic Koruna",
            "DJF": "Djiboutian Franc",
            "DKK": "Danish Krone",
            "DOP": "Dominican Peso",
            "DZD": "Algerian Dinar",
            "EGP": "Egyptian Pound",
            "ERN": "Eritrean Nakfa",
            "ETB": "Ethiopian Birr",
            "EUR": "Euro",
            "FJD": "Fijian Dollar",
            "FKP": "Falkland Islands Pound",
            "GBP": "British Pound Sterling",
            "GEL": "Georgian Lari",
            "GGP": "Guernsey Pound",
            "GHS": "Ghanaian Cedi",
            "GIP": "Gibraltar Pound",
            "GMD": "Gambian Dalasi",
            "GNF": "Guinean Franc",
            "GTQ": "Guatemalan Quetzal",
            "GYD": "Guyanaese Dollar",
            "HKD": "Hong Kong Dollar",
            "HNL": "Honduran Lempira",
            "HRK": "Croatian Kuna",
            "HTG": "Haitian Gourde",
            "HUF": "Hungarian Forint",
            "IDR": "Indonesian Rupiah",
            "ILS": "Israeli New Sheqel",
            "IMP": "Manx pound",
            "INR": "Indian Rupee",
            "IQD": "Iraqi Dinar",
            "IRR": "Iranian Rial",
            "ISK": "Icelandic Króna",
            "JEP": "Jersey Pound",
            "JMD": "Jamaican Dollar",
            "JOD": "Jordanian Dinar",
            "JPY": "Japanese Yen",
            "KES": "Kenyan Shilling",
            "KGS": "Kyrgystani Som",
            "KHR": "Cambodian Riel",
            "KMF": "Comorian Franc",
            "KPW": "North Korean Won",
            "KRW": "South Korean Won",
            "KWD": "Kuwaiti Dinar",
            "KYD": "Cayman Islands Dollar",
            "KZT": "Kazakhstani Tenge",
            "LAK": "Laotian Kip",
            "LBP": "Lebanese Pound",
            "LKR": "Sri Lankan Rupee",
            "LRD": "Liberian Dollar",
            "LSL": "Lesotho Loti",
            "LTL": "Lithuanian Litas",
            "LVL": "Latvian Lats",
            "LYD": "Libyan Dinar",
            "MAD": "Moroccan Dirham",
            "MDL": "Moldovan Leu",
            "MGA": "Malagasy Ariary",
            "MKD": "Macedonian Denar",
            "MMK": "Myanma Kyat",
            "MNT": "Mongolian Tugrik",
            "MOP": "Macanese Pataca",
            "MRO": "Mauritanian Ouguiya",
            "MUR": "Mauritian Rupee",
            "MVR": "Maldivian Rufiyaa",
            "MWK": "Malawian Kwacha",
            "MXN": "Mexican Peso",
            "MYR": "Malaysian Ringgit",
            "MZN": "Mozambican Metical",
            "NAD": "Namibian Dollar",
            "NGN": "Nigerian Naira",
            "NIO": "Nicaraguan Córdoba",
            "NOK": "Norwegian Krone",
            "NPR": "Nepalese Rupee",
            "NZD": "New Zealand Dollar",
            "OMR": "Omani Rial",
            "PAB": "Panamanian Balboa",
            "PEN": "Peruvian Nuevo Sol",
            "PGK": "Papua New Guinean Kina",
            "PHP": "Philippine Peso",
            "PKR": "Pakistani Rupee",
            "PLN": "Polish Zloty",
            "PYG": "Paraguayan Guarani",
            "QAR": "Qatari Rial",
            "RON": "Romanian Leu",
            "RSD": "Serbian Dinar",
            "RUB": "Russian Ruble",
            "RWF": "Rwandan Franc",
            "SAR": "Saudi Riyal",
            "SBD": "Solomon Islands Dollar",
            "SCR": "Seychellois Rupee",
            "SDG": "Sudanese Pound",
            "SEK": "Swedish Krona",
            "SGD": "Singapore Dollar",
            "SHP": "Saint Helena Pound",
            "SLL": "Sierra Leonean Leone",
            "SOS": "Somali Shilling",
            "SRD": "Surinamese Dollar",
            "STD": "São Tomé and Príncipe Dobra",
            "SVC": "Salvadoran Colón",
            "SYP": "Syrian Pound",
            "SZL": "Swazi Lilangeni",
            "THB": "Thai Baht",
            "TJS": "Tajikistani Somoni",
            "TMT": "Turkmenistani Manat",
            "TND": "Tunisian Dinar",
            "TOP": "Tongan Paʻanga",
            "TRY": "Turkish Lira",
            "TTD": "Trinidad and Tobago Dollar",
            "TWD": "New Taiwan Dollar",
            "TZS": "Tanzanian Shilling",
            "UAH": "Ukrainian Hryvnia",
            "UGX": "Ugandan Shilling",
            "USD": "United States Dollar",
            "UYU": "Uruguayan Peso",
            "UZS": "Uzbekistan Som",
            "VEF": "Venezuelan Bolívar Fuerte",
            "VND": "Vietnamese Dong",
            "VUV": "Vanuatu Vatu",
            "WST": "Samoan Tala",
            "XAF": "CFA Franc BEAC",
            "XAG": "Silver (troy ounce)",
            "XAU": "Gold (troy ounce)",
            "XCD": "East Caribbean Dollar",
            "XDR": "Special Drawing Rights",
            "XOF": "CFA Franc BCEAO",
            "XPF": "CFP Franc",
            "YER": "Yemeni Rial",
            "ZAR": "South African Rand",
            "ZMK": "Zambian Kwacha (pre-2013)",
            "ZMW": "Zambian Kwacha",
            "ZWL": "Zimbabwean Dollar"
        },

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
        table: null,

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

            state.dataReady = true;
        },
        addSelected({listAbbr}, {selected}) {
            selected.forEach((each) => {
                if (-1 === listAbbr.indexOf(each['value'])) {
                    listAbbr.push(each['value']);
                }
            });
        },
        changeTopRow({listAbbr}, {abbr}) {
            if (abbr === listAbbr[0]) {
                return;
            }

            // number, index
            const indexClicked = listAbbr.indexOf(abbr);
            const tmp = listAbbr[indexClicked];

            // 取出点击的项目，插入头部
            // listAbbr.splice(indexClicked, 1);
            // listAbbr.unshift(tmp);

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
                console.log("Loaded from local");
            }

            // 1000mill * 60sec * 60min * 24hr = 86400000
            if (!context.state.table || (Date.now() - context.state.timestamp) > 86400000) {
                // 没有table 或者 过期
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
                return a["name"] < b["name"] ? -1 : 1;
            });
        }
    }
});

export default store;
