const currencyItems = document.querySelectorAll('.currency__item');
const currencySelectors = document.querySelectorAll('.currency-option');
const inputs = document.querySelectorAll('input');
const swapButton = document.querySelector('.btn-swap');
const exchangeInfo = document.querySelector('.exchange-info');
const currencyFrom = currencySelectors[0].children;
const currencyTo = currencySelectors[1].children;

const API_KEY = 'df1959e59fb4ed61123ffc7d';

fetch(`https://prime.exchangerate-api.com/v5/${API_KEY}/latest/USD`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        let rates = data.conversion_rates;
        for (let currencySelector of currencySelectors) {
            for (let [key] of Object.entries(rates)) {
                const option = document.createElement('option');
                option.textContent = key;
                option.classList.add('currency-option__item');
                currencySelector.append(option);
            }
        }

    });



for (let currencyItem of currencyItems) {
    currencyItem.addEventListener('change', function () {
        const currencyFromValue = currencyFrom[currencySelectors[0].selectedIndex].textContent;
        const currencyToValue = currencyTo[currencySelectors[1].selectedIndex].textContent;

        let inputFromValue = inputs[0].value;
        let inputToValue = inputs[1].value;


        fetch(`https://prime.exchangerate-api.com/v5/${API_KEY}/latest/${currencyFromValue}`)
            .then(res => res.json())
            .then(data => {
                const rates = data.conversion_rates;
                const rateToValue = rates[currencyToValue];
                inputs[1].value = (inputFromValue * rateToValue).toFixed(2);

            })
    });
};

swapButton.addEventListener('click', function () {
    let swapIndex = currencySelectors[0].selectedIndex;

    currencySelectors[0].selectedIndex = currencySelectors[1].selectedIndex;
    currencySelectors[1].selectedIndex = swapIndex;
});
