function convertByRate({fromRate, toRate, amount}) {
    // 确保 amount 合理
    amount = Math.abs(parseFloat(amount));
    if (isNaN(amount)) {
        amount = 0;
    }

    // 一律先转成美元，再转成目标
    const rateFrom2USD = 1 / fromRate;
    const rateUSD2To = toRate;

    return amount * rateFrom2USD * rateUSD2To;
}

export {
    convertByRate
};