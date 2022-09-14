import { Currency, responseFromApi } from "../../types"

/**
 * Get array of Currency from API
 * @return {Promise} - Return Promise with array of Currency
 */
export const getAllCurrencies = async (): Promise<Currency[]> => {
    return await fecthCurrencies().then(mapFromApiToCurrencies)
}

/**
 * Fetch the API with all the currencies info
 * @return {Promise} - Return Promise with only the body part
 */
export const fecthCurrencies = async (): Promise<responseFromApi> => {
    const response = await fetch("https://api.moonpay.com/v3/currencies")
    return response.json()
}

/**
 * Map from responseFromApi type to Currency type
 * @param {responseFromApi} apiResponse - The array from the fetch API call
 * @return {Array} - Return an array of Currency type
 */
const mapFromApiToCurrencies = (apiResponse: responseFromApi): Currency[] => {
    return apiResponse.map(element => {
        const {id, name, code, type, isSupportedInUS, supportsTestMode } = element
        return { id, name, code, type, isSupportedInUS, supportsTestMode }
    })    
}