function convertByRate({fromRate, toRate, amount}) {
    if (!(fromRate && toRate)) {
        throw "Invalid Input: " + fromRate + " " + toRate;
    }

    // 一律先转成美元，再转成目标
    const rateFrom2USD = 1 / fromRate;
    const rateUSD2To = toRate;

    return amount * rateFrom2USD * rateUSD2To;
}

export {
    convertByRate
};