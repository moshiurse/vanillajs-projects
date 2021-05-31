const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const storageData = JSON.parse(localStorage.getItem('transactions'));

let transactions = storageData !== null ? storageData : [];

// Add Transactions

function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() == '' || amount.value.trim() == ''){
        alert('Please input all values');
    }else {
        const transaction = {
          id: generateID(),
          text: text.value,
          amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionToDom(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
  }

// Add transactions to DOM
function addTransactionToDom(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class='delete-btn' onclick='removeTransaction(${transaction.id})'>x</button>
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

// Remove Transactions
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id != id);
    updateLocalStorage();
    init();
}

// update local storage
    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
// init

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionToDom);
    updateValues();

}


init();

form.addEventListener('submit', addTransaction);