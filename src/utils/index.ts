import { orderBy } from "./constants"

/**
 * Prepare an specific img src from two strings
 * @param {string} cryptoName - The name of the currency
 * @param {string} cryptoCode - The code of the currency
 * @return {string} - The url prepared
 */
export const prepareImgSrcToUrl = (cryptoName: string, cryptoCode: string): string => {
    const name = replaceSpaceForHype(cryptoName)
    const code = replaceSpaceForHype(cryptoCode)
    return `https://cryptologos.cc/logos/${name}-${code}-logo.svg`
}

/**
 * Generic method for replace empty spaces in a string for hypes
 * @param {string} value - The string to convert
 * @return {string} - The string converted
 */
export const replaceSpaceForHype = (value: string): string => {
    return value.replace(/\s+/g, '-').toLowerCase()
}

/**
 * Generic method for sort array of objects by one attribute
 * @param {Array} array - The array to sort
 * @param {string} attr - The attribute column to sort the array by
 * @param {number} order - ASC, DESC, null
 * @return {Array} - The sorted array
 */
export const sortBy = (array: any[], attr:string, order: number): any[] => {
    if (order === orderBy.DESC) {
        return array.sort((a, b) => a[attr].localeCompare(b[attr]))
    } else if (order === orderBy.ASC) {
        return array.sort((a, b) => a[attr].localeCompare(b[attr])).reverse() 
    } else {
        return array
    }
}