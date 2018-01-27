import axios from "axios/index";

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
 */
function updateRateFromAPI(callback) {
    const accessKey = '28c3838ae4ee996dc7df28181ff3c7d3';
    const URL_API = 'http://apilayer.net/api/live?access_key=' + accessKey;

    axios.get(URL_API)
        .then((response) => {
            let data = response["data"];

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
        })
        .catch((error) => {
            console.log(">>> Updating rate failed \n" + error);
            alert("请信任加载不安全脚本\n本应用需要发送HTTP（而不是HTTPS）请求来获取汇率");
        });
}

export {
    convertByRate,
    updateRateFromAPI
};