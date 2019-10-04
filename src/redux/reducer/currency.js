let initialState={
    selectedCurrency:'',
    currencyRate:0,
    currencySign:''
}

export function currency(state=initialState , action) {
    switch (action.type) {
        case 'CURRENCY_SELECT':
            return {
                ...state,
                selectedCurrency:action.currency,
                currencyRate:action.rate,
                currencySign:action.sign
            };

        default:
            return state;
    }
}
