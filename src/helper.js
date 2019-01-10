/**
 * Convert some amount of money from one currency to another, given their exchange rate w.r.t USD
 
 * @param fromRate: The exchange rate of the original currency
 * @param toRate: the exchange rate of the currency we are converting to
 * @param amount: the amount of the original currency
 */
function convertByRate({fromRate, toRate, amount}) {
    // 一律先转成美元，再转成目标
    const rateFrom2USD = 1 / fromRate;
    const rateUSD2To = toRate;

    return amount * rateFrom2USD * rateUSD2To;
}

/**
 * 通过API更新汇率
 * 由于这是一个异步调用
 * 所以不能用返回值的形式
 * 
 * Update all the exchange rates by API call
 * 
 * @param callback: a callback function that will be executed when API request succeed
 */
function updateRateFromAPI(callback) {
    const URL_API = "https://my-backend-application.herokuapp.com/currency";

    fetch(URL_API).then((response) => {
        return response.text();
    }).then((data) => {
        data = JSON.parse(data);
        data = data["quotes"];

        const table = {};
        table["USD"] = 1;

        for (let each in data) {
            if (!data.hasOwnProperty(each)) {
                continue;
            }

            const abbr = each.substring(3);
            table[abbr] = data[each];
        }

        callback(table);
    }).catch((error) => {
        console.log(">>> Updating rate failed \n" + error);
        alert("Please enable sending HTTP request in the browser's page specific setting\nThis app will make a HTTP request to update exchange rate.");
    });
}

export {
    convertByRate,
    updateRateFromAPI
};