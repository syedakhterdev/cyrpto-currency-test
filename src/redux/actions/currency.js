import axios from 'axios';

export function getCurrencies(selectedCurrency,sign) {
 

    return (dispatch) => {
        axios
                .get(`https://api.openrates.io/latest?base=USD&symbols=${selectedCurrency}`)
                .then(response => {
                    const rate = (response.data.rates[selectedCurrency]);
                  dispatch(currency(selectedCurrency,rate,sign))
                })
                .catch(err => {
                    console.log("Currency Rates Fetching Error", err.message);
                });
    };
}

export function currency(currency, rate,sign) {
   
    return {
        type: 'CURRENCY_SELECT',
        currency: currency,
        rate:rate,
        sign:sign
    };
}