'use strict'
const usersList = document.querySelector('.users__list');
const addUserButton = document.querySelector('.btn-add');
const doubleMoneyButton = document.querySelector('.btn-double-money');
const showOnlyMillionairesButton = document.querySelector('.btn-show-millionaires');
const sortByRichestButton = document.querySelector('.btn-sort-by-richest');
const calculateButton = document.querySelector('.btn-calculate');


let data = [];

const addNewUser = () => {
    fetch('https://randomuser.me/api')
        .then(res => res.json())
        .then(({ results }) => {
            const newUser = {
                name: `${results[0].name.first} ${results[0].name.last}`,
                wealth: generateWealth(),
            }
            data.push(newUser);
            updateDOM(data);
        })
        .catch((err) => console.error(err));
};
const generateWealth = () => {
    return Math.floor(Math.random() * 100000);
};

const doubleMoney = () => {
    data.map((user) => {
        return user.wealth = user.wealth * 2;
    });
    updateDOM(data);
};
const showOnlyMillionaires = () => {
    data = data.filter((user) => {
        return user.wealth >= 10 ** 6
    });
    updateDOM(data);
};
const sortByRichest = () => {
    data.sort((a, b) => {
        return b.wealth - a.wealth;
    });
    updateDOM(data);
};
const calculateEntireWealth = () => {
    const total = data.reduce((acc, curr) => {
        return { wealth: acc.wealth + curr.wealth };
    });
    const totalWealthText = document.createElement('p');
    totalWealthText.innerHTML = `Total Wealth: <span>$${total.wealth}</span>`
    usersList.insertAdjacentElement('beforeend', totalWealthText)

}
const updateDOM = (data) => {
    usersList.innerHTML = '';

    for (const user of data) {
        const userElement = document.createElement('li');
        userElement.classList.add('users__item');
        userElement.classList.add('person');
        userElement.innerHTML = `<span>${user.name}</span>$${user.wealth}`;
        usersList.append(userElement);
    }

}


addUserButton.addEventListener('click', addNewUser);
doubleMoneyButton.addEventListener('click', doubleMoney);
showOnlyMillionairesButton.addEventListener('click', showOnlyMillionaires);
sortByRichestButton.addEventListener('click', sortByRichest);
calculateButton.addEventListener('click', calculateEntireWealth);