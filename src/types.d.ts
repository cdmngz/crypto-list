export interface Currency {
    id: string
    name: string
    code: string
    type: string
    isSupportedInUS: boolean
    supportsTestMode: boolean
}

export type responseFromApi = Array<{
    id: string
    createdAt: string
    updatedAt: string
    type: string
    name: string
    code: string
    precision: number
    maxAmount: number
    minAmount: number
    minBuyAmount: number
    maxBuyAmount: string
    addressRegex: string
    testnetAddressRegex: string
    supportsAddressTag: string
    addressTagRegex: string
    supportsTestMode: boolean
    supportsLiveMode: boolean
    isSuspended: boolean
    isSupportedInUS: boolean
    notAllowedUSStates: string   
    notAllowedCountries: string   
    isSellSupported: string
    confirmationsRequired: string
    minSellAmount: string
    maxSellAmount: string
}>