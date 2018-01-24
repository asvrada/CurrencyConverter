export {Preferences};

let instance = null;

class Preferences {
    constructor() {
        // Singleton
        if (instance) {
            return instance;
        }

        instance = this;

        this.STORAGE_KEY = 'jeff-currency-converter-preferences';

        // 显示的国家
        // 每一项为国家三个英文字母的缩写
        this.rows = ['USD', 'CNY', 'EUR', 'JPY', 'HKD', 'KRW', 'AUD', 'GBP'];
        /**
         * 保存用户输入的数字
         * amount：仅当以下情况时修改
         *       1.新建时
         *       2.用户退出，保存当前topRow的amount
         * @type {number}
         */
        this.amount = 1000;
    }

    load() {
        // beforeMount 时调用
        let storage = localStorage.getItem(this.STORAGE_KEY);

        if (storage === null) {
            console.log("No local storage found, using default");
            return;
        }

        // 本地储存非空，则覆盖默认值
        try {
            storage = JSON.parse(storage);
            const rows = storage["rows"];
            const amount = storage["amount"];
            this.rows = rows;
            this.amount = amount;
        } catch (e) {
            // 本地储存格式不对，使用默认值
            console.log("Bad local storage, using default");
        }
    }

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
            rows: this.rows,
            amount: this.amount
        }));
    }
}

