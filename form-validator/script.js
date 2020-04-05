const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#e-mail');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');


// console.log(username, email, password, confirmPassword)

const showError = (input) => {
    const formControlElement = input.parentNode;
    formControlElement.classList.add('error');
};

const showSuccess = (input) => {
    const formControlElement = input.parentNode;
    formControlElement.classList.add('success');
};

const checkUsername = (input, minLength, maxLength) => {
    if (username.value.trim().length >= minLength && username.value.trim().length <= maxLength) {
        showSuccess(username);
    } else {
        showError(username);
    };
}

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(email);
    } else {
        showError(email);
    }
}

const checkPasswordsMatch = (pass, confirmPass) => {
    if (pass === confirmPass) {
        showSuccess(password);
        showSuccess(confirmPassword);
    } else {
        showError(password);
        showError(confirmPassword);
    }
}

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    checkUsername(username);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);


});

