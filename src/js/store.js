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
        table: {
            "USD": 1,
            "AED": 3.672804,
            "AFN": 69.110001,
            "ALL": 107.250403,
            "AMD": 480.100006,
            "ANG": 1.780403,
            "AOA": 202.781998,
            "ARS": 19.549999,
            "AUD": 1.231404,
            "AWG": 1.7825,
            "AZN": 1.699604,
            "BAM": 1.576204,
            "BBD": 2,
            "BDT": 82.860001,
            "BGN": 1.572704,
            "BHD": 0.376904,
            "BIF": 1750.97998,
            "BMD": 1,
            "BND": 1.310604,
            "BOB": 6.860399,
            "BRL": 3.152904,
            "BSD": 1,
            "BTC": 0.000088,
            "BTN": 63.599998,
            "BWP": 9.564404,
            "BYN": 2.020398,
            "BYR": 19600,
            "BZD": 1.997804,
            "CAD": 1.230704,
            "CDF": 1565.50392,
            "CHF": 0.933104,
            "CLF": 0.02222,
            "CLP": 602.299988,
            "CNY": 6.319804,
            "COP": 2805,
            "CRC": 565.630005,
            "CUC": 1,
            "CUP": 26.5,
            "CVE": 88.779999,
            "CZK": 20.368999,
            "DJF": 178.000359,
            "DKK": 5.989504,
            "DOP": 47.779999,
            "DZD": 113.196999,
            "EGP": 17.639999,
            "ERN": 15.290392,
            "ETB": 27.209999,
            "EUR": 0.804504,
            "FJD": 1.98704,
            "FKP": 0.706404,
            "GBP": 0.70643,
            "GEL": 2.489904,
            "GGP": 0.706439,
            "GHS": 4.498504,
            "GIP": 0.706604,
            "GMD": 48.419998,
            "GNF": 9000.000355,
            "GTQ": 7.33604,
            "GYD": 204.860001,
            "HKD": 7.815904,
            "HNL": 23.55604,
            "HRK": 5.964804,
            "HTG": 63.410388,
            "HUF": 248.789993,
            "IDR": 13304,
            "ILS": 3.386604,
            "IMP": 0.706439,
            "INR": 63.56904,
            "IQD": 1184,
            "IRR": 36775.000352,
            "ISK": 100.199997,
            "JEP": 0.706439,
            "JMD": 123.669998,
            "JOD": 0.70704,
            "JPY": 108.515999,
            "KES": 102.050003,
            "KGS": 68.364998,
            "KHR": 4000.000351,
            "KMF": 396.149994,
            "KPW": 900.00035,
            "KRW": 1063.170044,
            "KWD": 0.299704,
            "KYD": 0.820383,
            "KZT": 321.209991,
            "LAK": 8287.000349,
            "LBP": 1505.400024,
            "LKR": 153.699997,
            "LRD": 127.503775,
            "LSL": 11.850382,
            "LTL": 3.048704,
            "LVL": 0.62055,
            "LYD": 1.322104,
            "MAD": 9.141504,
            "MDL": 16.657039,
            "MGA": 3180.000347,
            "MKD": 49.290001,
            "MMK": 1330.000346,
            "MNT": 2413.000346,
            "MOP": 8.047204,
            "MRO": 352.000346,
            "MUR": 32.150002,
            "MVR": 15.350378,
            "MWK": 713.450012,
            "MXN": 18.475039,
            "MYR": 3.869039,
            "MZN": 59.130001,
            "NAD": 11.850377,
            "NGN": 358.000344,
            "NIO": 30.709999,
            "NOK": 7.691804,
            "NPR": 101.720001,
            "NZD": 1.359104,
            "OMR": 0.384504,
            "PAB": 1,
            "PEN": 3.211504,
            "PGK": 3.160375,
            "PHP": 50.939999,
            "PKR": 110.349998,
            "PLN": 3.330204,
            "PYG": 5607.000341,
            "QAR": 3.639804,
            "RON": 3.752904,
            "RSD": 95.181503,
            "RUB": 56.216038,
            "RWF": 835.75,
            "SAR": 3.749804,
            "SBD": 7.743404,
            "SCR": 13.376038,
            "SDG": 6.998204,
            "SEK": 7.868404,
            "SGD": 1.30663,
            "SHP": 0.706604,
            "SLL": 7630.000339,
            "SOS": 562.000338,
            "SRD": 7.403664,
            "STD": 19727.800781,
            "SVC": 8.75037,
            "SYP": 514.97998,
            "SZL": 11.85037,
            "THB": 31.33037,
            "TJS": 8.808804,
            "TMT": 3.41,
            "TND": 2.399504,
            "TOP": 2.223204,
            "TRY": 3.753804,
            "TTD": 6.744504,
            "TWD": 29.068001,
            "TZS": 2243.000336,
            "UAH": 28.490367,
            "UGX": 3622.000335,
            "UYU": 28.260367,
            "UZS": 8140.000335,
            "VEF": 9.975038,
            "VND": 22709,
            "VUV": 102.750366,
            "WST": 2.503104,
            "XAF": 527.419983,
            "XAG": 0.057453,
            "XAU": 0.000741,
            "XCD": 2.703606,
            "XDR": 0.686995,
            "XOF": 520.000332,
            "XPF": 96.470364,
            "YER": 249.949997,
            "ZAR": 11.852304,
            "ZMK": 9001.203593,
            "ZMW": 9.703591,
            "ZWL": 322.355011
        },

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

            state.dataReady = !!tableRate;
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
                console.log("Loaded from local");
            }

            // 1000mill * 60sec * 60min * 24hr = 86400000
            if (!context.state.dataReady || (Date.now() - context.state.timestamp) > 86400000) {
                // 没有ready 或者 过期
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
