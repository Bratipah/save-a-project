import { BigNumber } from "bignumber.js"

export const getTheme = (theme) => {
    return theme.colorScheme === "dark"
}

export const getTimezone = (date) => {
    if (date) {
        let d = new Date(date);
        let timeZone = d?.toString().match(/\(([A-Za-z\s].*)\)/)[1];
        return timeZone
    }
    return ""
}

export const limitText = (text, limit) => {
    let txt = ""
    if (text.length >= limit) {
        txt = text.substring(0, limit)
    }
    txt = text
    return txt
}

export const limitChars = (word, limit) => {
    if (word?.length <= limit) {
        return word;
    }
    return word?.substring(0, limit) + "...";
}

export function createObject(keys, values) {
    if (keys.length !== values.length) {
        throw new Error('Keys and values arrays must have the same length');
    }

    const result = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        result[key] = value;
    }

    return result;
}


export const getReadableTokenBalance = (tokenBalance, decimals) => {
    return new BigNumber(tokenBalance).dividedBy(10 ** decimals).toFixed(2)
}