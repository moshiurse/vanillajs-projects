const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');

const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const rateElem = document.getElementById('rate');
const swap = document.getElementById('swap');

// Calculate function for Exchange Rate convert

function calculate() {
    const currOneValue = currencyOne.value;
    const currTwoValue = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currOneValue}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.rates[currTwoValue];
        rateElem.innerText = `1 ${currOneValue} = ${rate} ${currTwoValue}`;

        amountTwo.value = (amountOne.value * rate).toFixed(2);
    })
}

// Event Listeners
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click',() => {
    const tempCurr = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = tempCurr;
    calculate();
})

calculate();