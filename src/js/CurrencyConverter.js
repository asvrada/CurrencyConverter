import axios from 'axios';

export {CurrencyConverter};

// Singleton
let instance = null;

class CurrencyConverter {
    convert(from, amount, to) {
        if (!this.table || !((from in this.table) && (to in this.table))) {
            throw "Bad input: " + from + " -> " + to;
        }

        if (from === to) {
            return amount;
        }

        // 一律先转成美元，再转成目标
        let rateFrom2USD = 1 / this.table[from]["rate"];
        let rateUSD2To = this.table[to]["rate"];

        return amount * rateFrom2USD * rateUSD2To;
    }

    loadFromAPI() {
        console.log("Updating rate...");

        const accessKey = '28c3838ae4ee996dc7df28181ff3c7d3';
        const URL_API = 'http://apilayer.net/api/live?access_key=' + accessKey;

        let that = this;
        axios.get(URL_API)
            .then(function (response) {
                let data = response["data"];

                that.timestamp = Date.now();
                data = data["quotes"];
                that.table["USD"] = {
                    imgNation: "",
                    moneyUnit: that.abbr2NameEnglish["USD"],
                    abbrNation: 'USD',
                    rate: 1.0
                };

                for (let each in data) {
                    if (!data.hasOwnProperty(each)) {
                        continue;
                    }

                    const abbr = each.substring(3);
                    that.table[abbr]["moneyUnit"] = that.abbr2NameEnglish[abbr];
                    that.table[abbr]["abbrNation"] = abbr;
                    that.table[abbr]["rate"] = data[each];
                }
            })
            .catch(function (error) {
                console.log(">>> Updating rate failed \n" + error);
            });
    }

    isLocalStorageOutdate() {
        if (this.timestamp === null) {
            return true;
        }

        const tsPrev = this.timestamp;
        const tsNow = Date.now();

        // 1000mill * 60sec * 60min * 24hr = 86400000
        return (tsNow - tsPrev) > 86400000;
    }

    load() {
        let storage = localStorage.getItem(this.STORAGE_KEY);

        if (storage === null) {
            // 本地储存没有，则从云端获取
            this.loadFromAPI();
            return;
        }

        // 本地储存非空，则读取进来
        try {
            storage = JSON.parse(storage);
            this.table = storage.data;
            this.timestamp = storage.timestamp;
        } catch (e) {
            // 本地储存格式不对，重新获取
            console.log("Bad local storage for convert rate, using default");
            this.loadFromAPI();
            return;
        }

        // 本地储存太旧，更新
        if (this.isLocalStorageOutdate()) {
            this.loadFromAPI();
        }
    }

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
            data: this.table,
            timestamp: this.timestamp
        }));
    }
}