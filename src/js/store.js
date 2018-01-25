import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        STORAGE_KEY: 'jeff-currency-converter',

        // 是否进入了编辑模式（可以增删货币
        isAppModeEdit: false,
        selections: [],

        // 当前正在编辑的国家的abbr
        abbrInputEditing: null,
        /**
         * todo
         * @type {{abbr, amount}}
         */
        baseCurrency: {
            abbrIndex: 0,
            amount: 1000
        },

        // 显示的国家
        // 每一项为国家三个英文字母的缩写
        listAbbr: ['USD', 'CNY', 'EUR', 'JPY', 'HKD', 'KRW', 'AUD', 'GBP'],

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
         * 从网络或者本地缓存获取汇率
         * 其中的rate为相对美元的汇率
         * 即 rate = 1美元对应该币种数量
         * @type {{string:{img, nation, abbr, rate}}}
         */
        table: JSON.parse("{\"USD\":{\"imgNation\":\"\",\"moneyUnit\":\"United States Dollar\",\"abbrNation\":\"USD\",\"rate\":1},\"AED\":{\"imgNation\":\"\",\"nameNation\":\"United Arab Emirates Dirham\",\"abbrNation\":\"AED\",\"moneyUnit\":\"United Arab Emirates Dirham\",\"rate\":3.672398},\"AFN\":{\"imgNation\":\"\",\"nameNation\":\"Afghan Afghani\",\"abbrNation\":\"AFN\",\"moneyUnit\":\"Afghan Afghani\",\"rate\":69.099998},\"ALL\":{\"imgNation\":\"\",\"nameNation\":\"Albanian Lek\",\"abbrNation\":\"ALL\",\"moneyUnit\":\"Albanian Lek\",\"rate\":111.300003},\"AMD\":{\"imgNation\":\"\",\"nameNation\":\"Armenian Dram\",\"abbrNation\":\"AMD\",\"moneyUnit\":\"Armenian Dram\",\"rate\":481.470001},\"ANG\":{\"imgNation\":\"\",\"nameNation\":\"Netherlands Antillean Guilder\",\"abbrNation\":\"ANG\",\"moneyUnit\":\"Netherlands Antillean Guilder\",\"rate\":1.779722},\"AOA\":{\"imgNation\":\"\",\"nameNation\":\"Angolan Kwanza\",\"abbrNation\":\"AOA\",\"moneyUnit\":\"Angolan Kwanza\",\"rate\":165.098007},\"ARS\":{\"imgNation\":\"\",\"nameNation\":\"Argentine Peso\",\"abbrNation\":\"ARS\",\"moneyUnit\":\"Argentine Peso\",\"rate\":18.309999},\"AUD\":{\"imgNation\":\"\",\"nameNation\":\"Australian Dollar\",\"abbrNation\":\"AUD\",\"moneyUnit\":\"Australian Dollar\",\"rate\":1.290197},\"AWG\":{\"imgNation\":\"\",\"nameNation\":\"Aruban Florin\",\"abbrNation\":\"AWG\",\"moneyUnit\":\"Aruban Florin\",\"rate\":1.78},\"AZN\":{\"imgNation\":\"\",\"nameNation\":\"Azerbaijani Manat\",\"abbrNation\":\"AZN\",\"moneyUnit\":\"Azerbaijani Manat\",\"rate\":1.699602},\"BAM\":{\"imgNation\":\"\",\"nameNation\":\"Bosnia-Herzegovina Convertible Mark\",\"abbrNation\":\"BAM\",\"moneyUnit\":\"Bosnia-Herzegovina Convertible Mark\",\"rate\":1.648699},\"BBD\":{\"imgNation\":\"\",\"nameNation\":\"Barbadian Dollar\",\"abbrNation\":\"BBD\",\"moneyUnit\":\"Barbadian Dollar\",\"rate\":2},\"BDT\":{\"imgNation\":\"\",\"nameNation\":\"Bangladeshi Taka\",\"abbrNation\":\"BDT\",\"moneyUnit\":\"Bangladeshi Taka\",\"rate\":82.919998},\"BGN\":{\"imgNation\":\"\",\"nameNation\":\"Bulgarian Lev\",\"abbrNation\":\"BGN\",\"moneyUnit\":\"Bulgarian Lev\",\"rate\":1.650097},\"BHD\":{\"imgNation\":\"\",\"nameNation\":\"Bahraini Dinar\",\"abbrNation\":\"BHD\",\"moneyUnit\":\"Bahraini Dinar\",\"rate\":0.3768},\"BIF\":{\"imgNation\":\"\",\"nameNation\":\"Burundian Franc\",\"abbrNation\":\"BIF\",\"moneyUnit\":\"Burundian Franc\",\"rate\":1750.97998},\"BMD\":{\"imgNation\":\"\",\"nameNation\":\"Bermudan Dollar\",\"abbrNation\":\"BMD\",\"moneyUnit\":\"Bermudan Dollar\",\"rate\":1},\"BND\":{\"imgNation\":\"\",\"nameNation\":\"Brunei Dollar\",\"abbrNation\":\"BND\",\"moneyUnit\":\"Brunei Dollar\",\"rate\":1.341899},\"BOB\":{\"imgNation\":\"\",\"nameNation\":\"Bolivian Boliviano\",\"abbrNation\":\"BOB\",\"moneyUnit\":\"Bolivian Boliviano\",\"rate\":6.859997},\"BRL\":{\"imgNation\":\"\",\"nameNation\":\"Brazilian Real\",\"abbrNation\":\"BRL\",\"moneyUnit\":\"Brazilian Real\",\"rate\":3.310799},\"BSD\":{\"imgNation\":\"\",\"nameNation\":\"Bahamian Dollar\",\"abbrNation\":\"BSD\",\"moneyUnit\":\"Bahamian Dollar\",\"rate\":1},\"BTC\":{\"imgNation\":\"\",\"nameNation\":\"Bitcoin\",\"abbrNation\":\"BTC\",\"moneyUnit\":\"Bitcoin\",\"rate\":0.000061},\"BTN\":{\"imgNation\":\"\",\"nameNation\":\"Bhutanese Ngultrum\",\"abbrNation\":\"BTN\",\"moneyUnit\":\"Bhutanese Ngultrum\",\"rate\":64.050003},\"BWP\":{\"imgNation\":\"\",\"nameNation\":\"Botswanan Pula\",\"abbrNation\":\"BWP\",\"moneyUnit\":\"Botswanan Pula\",\"rate\":10.014973},\"BYN\":{\"imgNation\":\"\",\"nameNation\":\"New Belarusian Ruble\",\"abbrNation\":\"BYN\",\"moneyUnit\":\"New Belarusian Ruble\",\"rate\":2.019751},\"BYR\":{\"imgNation\":\"\",\"nameNation\":\"Belarusian Ruble\",\"abbrNation\":\"BYR\",\"moneyUnit\":\"Belarusian Ruble\",\"rate\":19600},\"BZD\":{\"imgNation\":\"\",\"nameNation\":\"Belize Dollar\",\"abbrNation\":\"BZD\",\"moneyUnit\":\"Belize Dollar\",\"rate\":1.997794},\"CAD\":{\"imgNation\":\"\",\"nameNation\":\"Canadian Dollar\",\"abbrNation\":\"CAD\",\"moneyUnit\":\"Canadian Dollar\",\"rate\":1.26778},\"CDF\":{\"imgNation\":\"\",\"nameNation\":\"Congolese Franc\",\"abbrNation\":\"CDF\",\"moneyUnit\":\"Congolese Franc\",\"rate\":1565.502368},\"CHF\":{\"imgNation\":\"\",\"nameNation\":\"Swiss Franc\",\"abbrNation\":\"CHF\",\"moneyUnit\":\"Swiss Franc\",\"rate\":0.98929},\"CLF\":{\"imgNation\":\"\",\"nameNation\":\"Chilean Unit of Account (UF)\",\"abbrNation\":\"CLF\",\"moneyUnit\":\"Chilean Unit of Account (UF)\",\"rate\":0.02285},\"CLP\":{\"imgNation\":\"\",\"nameNation\":\"Chilean Peso\",\"abbrNation\":\"CLP\",\"moneyUnit\":\"Chilean Peso\",\"rate\":618.669983},\"CNY\":{\"imgNation\":\"\",\"nameNation\":\"Chinese Yuan\",\"abbrNation\":\"CNY\",\"moneyUnit\":\"Chinese Yuan\",\"rate\":6.553898},\"COP\":{\"imgNation\":\"\",\"nameNation\":\"Colombian Peso\",\"abbrNation\":\"COP\",\"moneyUnit\":\"Colombian Peso\",\"rate\":2957.800049},\"CRC\":{\"imgNation\":\"\",\"nameNation\":\"Costa Rican Colón\",\"abbrNation\":\"CRC\",\"moneyUnit\":\"Costa Rican Colón\",\"rate\":561.999894},\"CUC\":{\"imgNation\":\"\",\"nameNation\":\"Cuban Convertible Peso\",\"abbrNation\":\"CUC\",\"moneyUnit\":\"Cuban Convertible Peso\",\"rate\":1},\"CUP\":{\"imgNation\":\"\",\"nameNation\":\"Cuban Peso\",\"abbrNation\":\"CUP\",\"moneyUnit\":\"Cuban Peso\",\"rate\":26.5},\"CVE\":{\"imgNation\":\"\",\"nameNation\":\"Cape Verdean Escudo\",\"abbrNation\":\"CVE\",\"moneyUnit\":\"Cape Verdean Escudo\",\"rate\":92.820087},\"CZK\":{\"imgNation\":\"\",\"nameNation\":\"Czech Republic Koruna\",\"abbrNation\":\"CZK\",\"moneyUnit\":\"Czech Republic Koruna\",\"rate\":21.685699},\"DJF\":{\"imgNation\":\"\",\"nameNation\":\"Djiboutian Franc\",\"abbrNation\":\"DJF\",\"moneyUnit\":\"Djiboutian Franc\",\"rate\":176.830002},\"DKK\":{\"imgNation\":\"\",\"nameNation\":\"Danish Krone\",\"abbrNation\":\"DKK\",\"moneyUnit\":\"Danish Krone\",\"rate\":6.263697},\"DOP\":{\"imgNation\":\"\",\"nameNation\":\"Dominican Peso\",\"abbrNation\":\"DOP\",\"moneyUnit\":\"Dominican Peso\",\"rate\":48.389999},\"DZD\":{\"imgNation\":\"\",\"nameNation\":\"Algerian Dinar\",\"abbrNation\":\"DZD\",\"moneyUnit\":\"Algerian Dinar\",\"rate\":115.001999},\"EGP\":{\"imgNation\":\"\",\"nameNation\":\"Egyptian Pound\",\"abbrNation\":\"EGP\",\"moneyUnit\":\"Egyptian Pound\",\"rate\":17.770149},\"ERN\":{\"imgNation\":\"\",\"nameNation\":\"Eritrean Nakfa\",\"abbrNation\":\"ERN\",\"moneyUnit\":\"Eritrean Nakfa\",\"rate\":14.989973},\"ETB\":{\"imgNation\":\"\",\"nameNation\":\"Ethiopian Birr\",\"abbrNation\":\"ETB\",\"moneyUnit\":\"Ethiopian Birr\",\"rate\":27.200001},\"EUR\":{\"imgNation\":\"\",\"nameNation\":\"Euro\",\"abbrNation\":\"EUR\",\"moneyUnit\":\"Euro\",\"rate\":0.841398},\"FJD\":{\"imgNation\":\"\",\"nameNation\":\"Fijian Dollar\",\"abbrNation\":\"FJD\",\"moneyUnit\":\"Fijian Dollar\",\"rate\":2.076503},\"FKP\":{\"imgNation\":\"\",\"nameNation\":\"Falkland Islands Pound\",\"abbrNation\":\"FKP\",\"moneyUnit\":\"Falkland Islands Pound\",\"rate\":0.746898},\"GBP\":{\"imgNation\":\"\",\"nameNation\":\"British Pound Sterling\",\"abbrNation\":\"GBP\",\"moneyUnit\":\"British Pound Sterling\",\"rate\":0.74733},\"GEL\":{\"imgNation\":\"\",\"nameNation\":\"Georgian Lari\",\"abbrNation\":\"GEL\",\"moneyUnit\":\"Georgian Lari\",\"rate\":2.565101},\"GGP\":{\"imgNation\":\"\",\"nameNation\":\"Guernsey Pound\",\"abbrNation\":\"GGP\",\"moneyUnit\":\"Guernsey Pound\",\"rate\":0.747295},\"GHS\":{\"imgNation\":\"\",\"nameNation\":\"Ghanaian Cedi\",\"abbrNation\":\"GHS\",\"moneyUnit\":\"Ghanaian Cedi\",\"rate\":4.508499},\"GIP\":{\"imgNation\":\"\",\"nameNation\":\"Gibraltar Pound\",\"abbrNation\":\"GIP\",\"moneyUnit\":\"Gibraltar Pound\",\"rate\":0.7472},\"GMD\":{\"imgNation\":\"\",\"nameNation\":\"Gambian Dalasi\",\"abbrNation\":\"GMD\",\"moneyUnit\":\"Gambian Dalasi\",\"rate\":47.150002},\"GNF\":{\"imgNation\":\"\",\"nameNation\":\"Guinean Franc\",\"abbrNation\":\"GNF\",\"moneyUnit\":\"Guinean Franc\",\"rate\":9002.999983},\"GTQ\":{\"imgNation\":\"\",\"nameNation\":\"Guatemalan Quetzal\",\"abbrNation\":\"GTQ\",\"moneyUnit\":\"Guatemalan Quetzal\",\"rate\":7.336023},\"GYD\":{\"imgNation\":\"\",\"nameNation\":\"Guyanaese Dollar\",\"abbrNation\":\"GYD\",\"moneyUnit\":\"Guyanaese Dollar\",\"rate\":202.649994},\"HKD\":{\"imgNation\":\"\",\"nameNation\":\"Hong Kong Dollar\",\"abbrNation\":\"HKD\",\"moneyUnit\":\"Hong Kong Dollar\",\"rate\":7.813102},\"HNL\":{\"imgNation\":\"\",\"nameNation\":\"Honduran Lempira\",\"abbrNation\":\"HNL\",\"moneyUnit\":\"Honduran Lempira\",\"rate\":23.461017},\"HRK\":{\"imgNation\":\"\",\"nameNation\":\"Croatian Kuna\",\"abbrNation\":\"HRK\",\"moneyUnit\":\"Croatian Kuna\",\"rate\":6.3659},\"HTG\":{\"imgNation\":\"\",\"nameNation\":\"Haitian Gourde\",\"abbrNation\":\"HTG\",\"moneyUnit\":\"Haitian Gourde\",\"rate\":62.630001},\"HUF\":{\"imgNation\":\"\",\"nameNation\":\"Hungarian Forint\",\"abbrNation\":\"HUF\",\"moneyUnit\":\"Hungarian Forint\",\"rate\":262.230011},\"IDR\":{\"imgNation\":\"\",\"nameNation\":\"Indonesian Rupiah\",\"abbrNation\":\"IDR\",\"moneyUnit\":\"Indonesian Rupiah\",\"rate\":13560},\"ILS\":{\"imgNation\":\"\",\"nameNation\":\"Israeli New Sheqel\",\"abbrNation\":\"ILS\",\"moneyUnit\":\"Israeli New Sheqel\",\"rate\":3.495969},\"IMP\":{\"imgNation\":\"\",\"nameNation\":\"Manx pound\",\"abbrNation\":\"IMP\",\"moneyUnit\":\"Manx pound\",\"rate\":0.747295},\"INR\":{\"imgNation\":\"\",\"nameNation\":\"Indian Rupee\",\"abbrNation\":\"INR\",\"moneyUnit\":\"Indian Rupee\",\"rate\":64.134003},\"IQD\":{\"imgNation\":\"\",\"nameNation\":\"Iraqi Dinar\",\"abbrNation\":\"IQD\",\"moneyUnit\":\"Iraqi Dinar\",\"rate\":1184},\"IRR\":{\"imgNation\":\"\",\"nameNation\":\"Iranian Rial\",\"abbrNation\":\"IRR\",\"moneyUnit\":\"Iranian Rial\",\"rate\":36039.000101},\"ISK\":{\"imgNation\":\"\",\"nameNation\":\"Icelandic Króna\",\"abbrNation\":\"ISK\",\"moneyUnit\":\"Icelandic Króna\",\"rate\":105.749977},\"JEP\":{\"imgNation\":\"\",\"nameNation\":\"Jersey Pound\",\"abbrNation\":\"JEP\",\"moneyUnit\":\"Jersey Pound\",\"rate\":0.747295},\"JMD\":{\"imgNation\":\"\",\"nameNation\":\"Jamaican Dollar\",\"abbrNation\":\"JMD\",\"moneyUnit\":\"Jamaican Dollar\",\"rate\":123.860001},\"JOD\":{\"imgNation\":\"\",\"nameNation\":\"Jordanian Dinar\",\"abbrNation\":\"JOD\",\"moneyUnit\":\"Jordanian Dinar\",\"rate\":0.708026},\"JPY\":{\"imgNation\":\"\",\"nameNation\":\"Japanese Yen\",\"abbrNation\":\"JPY\",\"moneyUnit\":\"Japanese Yen\",\"rate\":113.175003},\"KES\":{\"imgNation\":\"\",\"nameNation\":\"Kenyan Shilling\",\"abbrNation\":\"KES\",\"moneyUnit\":\"Kenyan Shilling\",\"rate\":102.900002},\"KGS\":{\"imgNation\":\"\",\"nameNation\":\"Kyrgystani Som\",\"abbrNation\":\"KGS\",\"moneyUnit\":\"Kyrgystani Som\",\"rate\":69.363998},\"KHR\":{\"imgNation\":\"\",\"nameNation\":\"Cambodian Riel\",\"abbrNation\":\"KHR\",\"moneyUnit\":\"Cambodian Riel\",\"rate\":4033.999826},\"KMF\":{\"imgNation\":\"\",\"nameNation\":\"Comorian Franc\",\"abbrNation\":\"KMF\",\"moneyUnit\":\"Comorian Franc\",\"rate\":411.019989},\"KPW\":{\"imgNation\":\"\",\"nameNation\":\"North Korean Won\",\"abbrNation\":\"KPW\",\"moneyUnit\":\"North Korean Won\",\"rate\":899.999952},\"KRW\":{\"imgNation\":\"\",\"nameNation\":\"South Korean Won\",\"abbrNation\":\"KRW\",\"moneyUnit\":\"South Korean Won\",\"rate\":1073.050049},\"KWD\":{\"imgNation\":\"\",\"nameNation\":\"Kuwaiti Dinar\",\"abbrNation\":\"KWD\",\"moneyUnit\":\"Kuwaiti Dinar\",\"rate\":0.301798},\"KYD\":{\"imgNation\":\"\",\"nameNation\":\"Cayman Islands Dollar\",\"abbrNation\":\"KYD\",\"moneyUnit\":\"Cayman Islands Dollar\",\"rate\":0.820324},\"KZT\":{\"imgNation\":\"\",\"nameNation\":\"Kazakhstani Tenge\",\"abbrNation\":\"KZT\",\"moneyUnit\":\"Kazakhstani Tenge\",\"rate\":331.269989},\"LAK\":{\"imgNation\":\"\",\"nameNation\":\"Laotian Kip\",\"abbrNation\":\"LAK\",\"moneyUnit\":\"Laotian Kip\",\"rate\":8295.000456},\"LBP\":{\"imgNation\":\"\",\"nameNation\":\"Lebanese Pound\",\"abbrNation\":\"LBP\",\"moneyUnit\":\"Lebanese Pound\",\"rate\":1511.0002},\"LKR\":{\"imgNation\":\"\",\"nameNation\":\"Sri Lankan Rupee\",\"abbrNation\":\"LKR\",\"moneyUnit\":\"Sri Lankan Rupee\",\"rate\":152.600006},\"LRD\":{\"imgNation\":\"\",\"nameNation\":\"Liberian Dollar\",\"abbrNation\":\"LRD\",\"moneyUnit\":\"Liberian Dollar\",\"rate\":125.160004},\"LSL\":{\"imgNation\":\"\",\"nameNation\":\"Lesotho Loti\",\"abbrNation\":\"LSL\",\"moneyUnit\":\"Lesotho Loti\",\"rate\":12.51026},\"LTL\":{\"imgNation\":\"\",\"nameNation\":\"Lithuanian Litas\",\"abbrNation\":\"LTL\",\"moneyUnit\":\"Lithuanian Litas\",\"rate\":3.048696},\"LVL\":{\"imgNation\":\"\",\"nameNation\":\"Latvian Lats\",\"abbrNation\":\"LVL\",\"moneyUnit\":\"Latvian Lats\",\"rate\":0.62055},\"LYD\":{\"imgNation\":\"\",\"nameNation\":\"Libyan Dinar\",\"abbrNation\":\"LYD\",\"moneyUnit\":\"Libyan Dinar\",\"rate\":1.359801},\"MAD\":{\"imgNation\":\"\",\"nameNation\":\"Moroccan Dirham\",\"abbrNation\":\"MAD\",\"moneyUnit\":\"Moroccan Dirham\",\"rate\":9.402802},\"MDL\":{\"imgNation\":\"\",\"nameNation\":\"Moldovan Leu\",\"abbrNation\":\"MDL\",\"moneyUnit\":\"Moldovan Leu\",\"rate\":17.014999},\"MGA\":{\"imgNation\":\"\",\"nameNation\":\"Malagasy Ariary\",\"abbrNation\":\"MGA\",\"moneyUnit\":\"Malagasy Ariary\",\"rate\":3215.000318},\"MKD\":{\"imgNation\":\"\",\"nameNation\":\"Macedonian Denar\",\"abbrNation\":\"MKD\",\"moneyUnit\":\"Macedonian Denar\",\"rate\":51.669998},\"MMK\":{\"imgNation\":\"\",\"nameNation\":\"Myanma Kyat\",\"abbrNation\":\"MMK\",\"moneyUnit\":\"Myanma Kyat\",\"rate\":1359.999774},\"MNT\":{\"imgNation\":\"\",\"nameNation\":\"Mongolian Tugrik\",\"abbrNation\":\"MNT\",\"moneyUnit\":\"Mongolian Tugrik\",\"rate\":2420.99974},\"MOP\":{\"imgNation\":\"\",\"nameNation\":\"Macanese Pataca\",\"abbrNation\":\"MOP\",\"moneyUnit\":\"Macanese Pataca\",\"rate\":8.047204},\"MRO\":{\"imgNation\":\"\",\"nameNation\":\"Mauritanian Ouguiya\",\"abbrNation\":\"MRO\",\"moneyUnit\":\"Mauritanian Ouguiya\",\"rate\":351.600006},\"MUR\":{\"imgNation\":\"\",\"nameNation\":\"Mauritian Rupee\",\"abbrNation\":\"MUR\",\"moneyUnit\":\"Mauritian Rupee\",\"rate\":32.900002},\"MVR\":{\"imgNation\":\"\",\"nameNation\":\"Maldivian Rufiyaa\",\"abbrNation\":\"MVR\",\"moneyUnit\":\"Maldivian Rufiyaa\",\"rate\":15.569845},\"MWK\":{\"imgNation\":\"\",\"nameNation\":\"Malawian Kwacha\",\"abbrNation\":\"MWK\",\"moneyUnit\":\"Malawian Kwacha\",\"rate\":717.820007},\"MXN\":{\"imgNation\":\"\",\"nameNation\":\"Mexican Peso\",\"abbrNation\":\"MXN\",\"moneyUnit\":\"Mexican Peso\",\"rate\":19.871},\"MYR\":{\"imgNation\":\"\",\"nameNation\":\"Malaysian Ringgit\",\"abbrNation\":\"MYR\",\"moneyUnit\":\"Malaysian Ringgit\",\"rate\":4.083019},\"MZN\":{\"imgNation\":\"\",\"nameNation\":\"Mozambican Metical\",\"abbrNation\":\"MZN\",\"moneyUnit\":\"Mozambican Metical\",\"rate\":58.099998},\"NAD\":{\"imgNation\":\"\",\"nameNation\":\"Namibian Dollar\",\"abbrNation\":\"NAD\",\"moneyUnit\":\"Namibian Dollar\",\"rate\":12.437984},\"NGN\":{\"imgNation\":\"\",\"nameNation\":\"Nigerian Naira\",\"abbrNation\":\"NGN\",\"moneyUnit\":\"Nigerian Naira\",\"rate\":354.999838},\"NIO\":{\"imgNation\":\"\",\"nameNation\":\"Nicaraguan Córdoba\",\"abbrNation\":\"NIO\",\"moneyUnit\":\"Nicaraguan Córdoba\",\"rate\":30.773972},\"NOK\":{\"imgNation\":\"\",\"nameNation\":\"Norwegian Krone\",\"abbrNation\":\"NOK\",\"moneyUnit\":\"Norwegian Krone\",\"rate\":8.30471},\"NPR\":{\"imgNation\":\"\",\"nameNation\":\"Nepalese Rupee\",\"abbrNation\":\"NPR\",\"moneyUnit\":\"Nepalese Rupee\",\"rate\":102.615997},\"NZD\":{\"imgNation\":\"\",\"nameNation\":\"New Zealand Dollar\",\"abbrNation\":\"NZD\",\"moneyUnit\":\"New Zealand Dollar\",\"rate\":1.417201},\"OMR\":{\"imgNation\":\"\",\"nameNation\":\"Omani Rial\",\"abbrNation\":\"OMR\",\"moneyUnit\":\"Omani Rial\",\"rate\":0.384495},\"PAB\":{\"imgNation\":\"\",\"nameNation\":\"Panamanian Balboa\",\"abbrNation\":\"PAB\",\"moneyUnit\":\"Panamanian Balboa\",\"rate\":1},\"PEN\":{\"imgNation\":\"\",\"nameNation\":\"Peruvian Nuevo Sol\",\"abbrNation\":\"PEN\",\"moneyUnit\":\"Peruvian Nuevo Sol\",\"rate\":3.235962},\"PGK\":{\"imgNation\":\"\",\"nameNation\":\"Papua New Guinean Kina\",\"abbrNation\":\"PGK\",\"moneyUnit\":\"Papua New Guinean Kina\",\"rate\":3.205197},\"PHP\":{\"imgNation\":\"\",\"nameNation\":\"Philippine Peso\",\"abbrNation\":\"PHP\",\"moneyUnit\":\"Philippine Peso\",\"rate\":49.950001},\"PKR\":{\"imgNation\":\"\",\"nameNation\":\"Pakistani Rupee\",\"abbrNation\":\"PKR\",\"moneyUnit\":\"Pakistani Rupee\",\"rate\":110.349998},\"PLN\":{\"imgNation\":\"\",\"nameNation\":\"Polish Zloty\",\"abbrNation\":\"PLN\",\"moneyUnit\":\"Polish Zloty\",\"rate\":3.534499},\"PYG\":{\"imgNation\":\"\",\"nameNation\":\"Paraguayan Guarani\",\"abbrNation\":\"PYG\",\"moneyUnit\":\"Paraguayan Guarani\",\"rate\":5614.000091},\"QAR\":{\"imgNation\":\"\",\"nameNation\":\"Qatari Rial\",\"abbrNation\":\"QAR\",\"moneyUnit\":\"Qatari Rial\",\"rate\":3.640301},\"RON\":{\"imgNation\":\"\",\"nameNation\":\"Romanian Leu\",\"abbrNation\":\"RON\",\"moneyUnit\":\"Romanian Leu\",\"rate\":3.9021},\"RSD\":{\"imgNation\":\"\",\"nameNation\":\"Serbian Dinar\",\"abbrNation\":\"RSD\",\"moneyUnit\":\"Serbian Dinar\",\"rate\":99.505096},\"RUB\":{\"imgNation\":\"\",\"nameNation\":\"Russian Ruble\",\"abbrNation\":\"RUB\",\"moneyUnit\":\"Russian Ruble\",\"rate\":57.418999},\"RWF\":{\"imgNation\":\"\",\"nameNation\":\"Rwandan Franc\",\"abbrNation\":\"RWF\",\"moneyUnit\":\"Rwandan Franc\",\"rate\":835.75},\"SAR\":{\"imgNation\":\"\",\"nameNation\":\"Saudi Riyal\",\"abbrNation\":\"SAR\",\"moneyUnit\":\"Saudi Riyal\",\"rate\":3.749898},\"SBD\":{\"imgNation\":\"\",\"nameNation\":\"Solomon Islands Dollar\",\"abbrNation\":\"SBD\",\"moneyUnit\":\"Solomon Islands Dollar\",\"rate\":7.7344},\"SCR\":{\"imgNation\":\"\",\"nameNation\":\"Seychellois Rupee\",\"abbrNation\":\"SCR\",\"moneyUnit\":\"Seychellois Rupee\",\"rate\":13.34956},\"SDG\":{\"imgNation\":\"\",\"nameNation\":\"Sudanese Pound\",\"abbrNation\":\"SDG\",\"moneyUnit\":\"Sudanese Pound\",\"rate\":6.997199},\"SEK\":{\"imgNation\":\"\",\"nameNation\":\"Swedish Krona\",\"abbrNation\":\"SEK\",\"moneyUnit\":\"Swedish Krona\",\"rate\":8.34575},\"SGD\":{\"imgNation\":\"\",\"nameNation\":\"Singapore Dollar\",\"abbrNation\":\"SGD\",\"moneyUnit\":\"Singapore Dollar\",\"rate\":1.34128},\"SHP\":{\"imgNation\":\"\",\"nameNation\":\"Saint Helena Pound\",\"abbrNation\":\"SHP\",\"moneyUnit\":\"Saint Helena Pound\",\"rate\":0.747198},\"SLL\":{\"imgNation\":\"\",\"nameNation\":\"Sierra Leonean Leone\",\"abbrNation\":\"SLL\",\"moneyUnit\":\"Sierra Leonean Leone\",\"rate\":7630.000281},\"SOS\":{\"imgNation\":\"\",\"nameNation\":\"Somali Shilling\",\"abbrNation\":\"SOS\",\"moneyUnit\":\"Somali Shilling\",\"rate\":559.000189},\"SRD\":{\"imgNation\":\"\",\"nameNation\":\"Surinamese Dollar\",\"abbrNation\":\"SRD\",\"moneyUnit\":\"Surinamese Dollar\",\"rate\":7.409953},\"STD\":{\"imgNation\":\"\",\"nameNation\":\"São Tomé and Príncipe Dobra\",\"abbrNation\":\"STD\",\"moneyUnit\":\"São Tomé and Príncipe Dobra\",\"rate\":20624.599609},\"SVC\":{\"imgNation\":\"\",\"nameNation\":\"Salvadoran Colón\",\"abbrNation\":\"SVC\",\"moneyUnit\":\"Salvadoran Colón\",\"rate\":8.749856},\"SYP\":{\"imgNation\":\"\",\"nameNation\":\"Syrian Pound\",\"abbrNation\":\"SYP\",\"moneyUnit\":\"Syrian Pound\",\"rate\":514.97998},\"SZL\":{\"imgNation\":\"\",\"nameNation\":\"Swazi Lilangeni\",\"abbrNation\":\"SZL\",\"moneyUnit\":\"Swazi Lilangeni\",\"rate\":12.437996},\"THB\":{\"imgNation\":\"\",\"nameNation\":\"Thai Baht\",\"abbrNation\":\"THB\",\"moneyUnit\":\"Thai Baht\",\"rate\":32.830002},\"TJS\":{\"imgNation\":\"\",\"nameNation\":\"Tajikistani Somoni\",\"abbrNation\":\"TJS\",\"moneyUnit\":\"Tajikistani Somoni\",\"rate\":8.823803},\"TMT\":{\"imgNation\":\"\",\"nameNation\":\"Turkmenistani Manat\",\"abbrNation\":\"TMT\",\"moneyUnit\":\"Turkmenistani Manat\",\"rate\":3.41},\"TND\":{\"imgNation\":\"\",\"nameNation\":\"Tunisian Dinar\",\"abbrNation\":\"TND\",\"moneyUnit\":\"Tunisian Dinar\",\"rate\":2.459199},\"TOP\":{\"imgNation\":\"\",\"nameNation\":\"Tongan Paʻanga\",\"abbrNation\":\"TOP\",\"moneyUnit\":\"Tongan Paʻanga\",\"rate\":2.267101},\"TRY\":{\"imgNation\":\"\",\"nameNation\":\"Turkish Lira\",\"abbrNation\":\"TRY\",\"moneyUnit\":\"Turkish Lira\",\"rate\":3.819694},\"TTD\":{\"imgNation\":\"\",\"nameNation\":\"Trinidad and Tobago Dollar\",\"abbrNation\":\"TTD\",\"moneyUnit\":\"Trinidad and Tobago Dollar\",\"rate\":6.760066},\"TWD\":{\"imgNation\":\"\",\"nameNation\":\"New Taiwan Dollar\",\"abbrNation\":\"TWD\",\"moneyUnit\":\"New Taiwan Dollar\",\"rate\":29.931999},\"TZS\":{\"imgNation\":\"\",\"nameNation\":\"Tanzanian Shilling\",\"abbrNation\":\"TZS\",\"moneyUnit\":\"Tanzanian Shilling\",\"rate\":2232.999898},\"UAH\":{\"imgNation\":\"\",\"nameNation\":\"Ukrainian Hryvnia\",\"abbrNation\":\"UAH\",\"moneyUnit\":\"Ukrainian Hryvnia\",\"rate\":27.809999},\"UGX\":{\"imgNation\":\"\",\"nameNation\":\"Ugandan Shilling\",\"abbrNation\":\"UGX\",\"moneyUnit\":\"Ugandan Shilling\",\"rate\":3615.000394},\"UYU\":{\"imgNation\":\"\",\"nameNation\":\"Uruguayan Peso\",\"abbrNation\":\"UYU\",\"moneyUnit\":\"Uruguayan Peso\",\"rate\":28.749962},\"UZS\":{\"imgNation\":\"\",\"nameNation\":\"Uzbekistan Som\",\"abbrNation\":\"UZS\",\"moneyUnit\":\"Uzbekistan Som\",\"rate\":8089.999994},\"VEF\":{\"imgNation\":\"\",\"nameNation\":\"Venezuelan Bolívar Fuerte\",\"abbrNation\":\"VEF\",\"moneyUnit\":\"Venezuelan Bolívar Fuerte\",\"rate\":9.975023},\"VND\":{\"imgNation\":\"\",\"nameNation\":\"Vietnamese Dong\",\"abbrNation\":\"VND\",\"moneyUnit\":\"Vietnamese Dong\",\"rate\":22709},\"VUV\":{\"imgNation\":\"\",\"nameNation\":\"Vanuatu Vatu\",\"abbrNation\":\"VUV\",\"moneyUnit\":\"Vanuatu Vatu\",\"rate\":105.179799},\"WST\":{\"imgNation\":\"\",\"nameNation\":\"Samoan Tala\",\"abbrNation\":\"WST\",\"moneyUnit\":\"Samoan Tala\",\"rate\":2.555702},\"XAF\":{\"imgNation\":\"\",\"nameNation\":\"CFA Franc BEAC\",\"abbrNation\":\"XAF\",\"moneyUnit\":\"CFA Franc BEAC\",\"rate\":551.700012},\"XAG\":{\"imgNation\":\"\",\"nameNation\":\"Silver (troy ounce)\",\"abbrNation\":\"XAG\",\"moneyUnit\":\"Silver (troy ounce)\",\"rate\":0.060383},\"XAU\":{\"imgNation\":\"\",\"nameNation\":\"Gold (troy ounce)\",\"abbrNation\":\"XAU\",\"moneyUnit\":\"Gold (troy ounce)\",\"rate\":0.000779},\"XCD\":{\"imgNation\":\"\",\"nameNation\":\"East Caribbean Dollar\",\"abbrNation\":\"XCD\",\"moneyUnit\":\"East Caribbean Dollar\",\"rate\":2.698846},\"XDR\":{\"imgNation\":\"\",\"nameNation\":\"Special Drawing Rights\",\"abbrNation\":\"XDR\",\"moneyUnit\":\"Special Drawing Rights\",\"rate\":0.705664},\"XOF\":{\"imgNation\":\"\",\"nameNation\":\"CFA Franc BCEAO\",\"abbrNation\":\"XOF\",\"moneyUnit\":\"CFA Franc BCEAO\",\"rate\":563.200012},\"XPF\":{\"imgNation\":\"\",\"nameNation\":\"CFP Franc\",\"abbrNation\":\"XPF\",\"moneyUnit\":\"CFP Franc\",\"rate\":100.520099},\"YER\":{\"imgNation\":\"\",\"nameNation\":\"Yemeni Rial\",\"abbrNation\":\"YER\",\"moneyUnit\":\"Yemeni Rial\",\"rate\":249.850006},\"ZAR\":{\"imgNation\":\"\",\"nameNation\":\"South African Rand\",\"abbrNation\":\"ZAR\",\"moneyUnit\":\"South African Rand\",\"rate\":12.447703},\"ZMK\":{\"imgNation\":\"\",\"nameNation\":\"Zambian Kwacha (pre-2013)\",\"abbrNation\":\"ZMK\",\"moneyUnit\":\"Zambian Kwacha (pre-2013)\",\"rate\":9001.202233},\"ZMW\":{\"imgNation\":\"\",\"nameNation\":\"Zambian Kwacha\",\"abbrNation\":\"ZMW\",\"moneyUnit\":\"Zambian Kwacha\",\"rate\":9.839943},\"ZWL\":{\"imgNation\":\"\",\"nameNation\":\"Zimbabwean Dollar\",\"abbrNation\":\"ZWL\",\"moneyUnit\":\"Zimbabwean Dollar\",\"rate\":322.355011}}"),
        timestamp: null,
    },
    mutations: {
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
        updateAmount({baseCurrency, listAbbr}, {amount, abbr}) {
            baseCurrency.amount = amount;
            baseCurrency.abbrIndex = listAbbr.indexOf(abbr);
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
        }
    },
    actions: {},
    getters: {
        getBaseCurrencyAbbr: ({listAbbr, baseCurrency}) => {
            return listAbbr[baseCurrency.abbrIndex];
        },
        convertTo: ({table}) => ({from, to, amount}) => {
            if (!(from && to)) {
                throw 'Invalid input: ' + from + ' ' + to + ' ' + amount + "\nType: " + typeof amount;
            }

            // 确保 amount 合理
            amount = Math.abs(parseFloat(amount));
            if (isNaN(amount)) {
                amount = 0;
            }

            if (from === to) {
                return amount;
            }

            // 一律先转成美元，再转成目标
            const rateFrom2USD = 1 / table[from]["rate"];
            const rateUSD2To = table[to]["rate"];

            return amount * rateFrom2USD * rateUSD2To;
        },
        getCurrency: ({table}, getter) => ({abbr}) => {
            return {
                img: table[abbr]['imgNation'],
                unit: table[abbr]['moneyUnit'],
                amount: getter.getAmount({
                    abbr
                })
            };
        },
        // 仅用于显示
        getAmount: ({listAbbr, baseCurrency}, getter) => ({abbr}) => {
            return Math.round(getter.convertTo({
                from: getter.getBaseCurrencyAbbr,
                to: abbr,
                amount: baseCurrency.amount
            }) * 10) / 10;
        },
    }
});

export default store;
