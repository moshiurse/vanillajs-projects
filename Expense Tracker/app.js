const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


let transactions = [
    {id: 1, text: 'Cash', amount: 120 },
    {id: 1, text: 'Salary', amount: -120 },
    {id: 1, text: 'Deposit', amount: 23 },
    {id: 1, text: 'Gift', amount: 21 },
    {id: 1, text: 'Cash', amount: -15 },
];

// Add transactions to DOM
function addTransactionToDom(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class='delete-btn'>x</button>
    `;
    list.appendChild(item); 
}

// Update The Balance
    function updateValues() {
        const amounts = transactions.map(transaction => transaction.amount);

        const total = amounts.reduce((acc, amount) => acc += amount, 0);
        const income = amounts
        .filter(item => item > 0)
        .reduce((acc, amount) => acc += amount, 0).toFixed(2);
        const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, amount) => acc -= amount, 0).toFixed(2);

        balance.innerText = `$${total}`;
        moneyPlus.innerText = `$${income}`;
        moneyMinus.innerText = `$${expense}`;
    }
// init

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionToDom);
    updateValues();

}


init();