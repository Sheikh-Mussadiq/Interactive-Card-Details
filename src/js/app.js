
const cardNumberInput = document.getElementById('card-number-input');
const cardNameInput = document.getElementById('cardholder-name-input');
const expMonthInput = document.getElementById('exp-month-input');
const expYearInput = document.getElementById('exp-year-input');
const cvcInput = document.getElementById('cvc-input');
const formInputs = document.querySelectorAll('.form-input');
const btn = document.getElementById('btn');
const completedContainer = document.querySelector('.container-completed');
const form  = document.getElementById('form');
const continueBtn = document.getElementById('continue-btn');

const maxNameLength = 20;

let isValid = false;
const validate = () => {
    if (isValid === true) {
        completedContainer.classList.remove('hidden');
        form.classList.add('hidden');
    }
}
btn.addEventListener('click', (event) => {
    event.preventDefault();
    validateForm();
    validate();
})
const validateForm = () => {
   
    formInputs.forEach(input => {

        let errorText;
        if (input.id === 'exp-month-input' || input.id === 'exp-year-input') {
            // For expiry inputs, use the parent's parent's error text
            errorText = input.closest('.exp').querySelector('.error__text');
        } else if (input.id === 'cvc-input') {
            // For CVC input, use the parent's error text
            errorText = input.parentElement.querySelector('.error__text');
        } else {
            // For other inputs, use the default parent
            errorText = input.parentElement.querySelector('.error__text');
        }

        if (input.value.trim() === '') {
            errorText.textContent = "Can't be blank";
            input.style.border = '1px solid red';
            isValid = false;
        } else {
            errorText.textContent = '';
            input.classList.remove('error');
            input.style.border = ' hsl(278, 94%, 30%) 1px solid';
            isValid = true;
        }
    })
}

continueBtn.addEventListener('click', (event) => {
    location.reload();
});

cardNumberInput.addEventListener('input', function() {
    let cardNumber = this.value;

    cardNumber = cardNumber.replace(/\D/g, '');

    if (cardNumber.length > 16) {
        cardNumber = cardNumber.slice(0, 16);
    }

    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();
    document.getElementById('display-cardnumber').textContent = cardNumber || '0000 0000 0000 0000';

});

cardNumberInput.addEventListener('keypress', function(event) {
    if (event.key === 'e' || event.key === 'E' || event.key === '-' || event.key === '+') {
        event.preventDefault();
    }
});

cardNameInput.addEventListener('input', function() {
    let cardName = this.value;
    if (cardName.length > maxNameLength) {
        cardName = cardName.slice(0, maxNameLength);
    }
    
    document.getElementById('display-cardholder').textContent = cardName || 'Jane Appleseed';
});

expMonthInput.addEventListener('input', function() {
    let expMonth = this.value;

    expMonth = expMonth.replace(/\D/g, '');
    if (expMonth.length > 2) {
        expMonth = expMonth.slice(0, 2);
    }
    if (expMonth.length === 1) {
        expMonth = '0' + expMonth;
    }
    document.getElementById('display-month').textContent = expMonth || '00';
});

expYearInput.addEventListener('input', function() {
    let expYear = this.value;
    expYear = expYear.replace(/\D/g, '');
    if (expYear.length > 2) {
        expYear = expYear.slice(0, 2);
    }
    document.getElementById('display-year').textContent = expYear || '00';
});

cvcInput.addEventListener('input', function() {
    let cvc = this.value;

    cvc = cvc.replace(/\D/g, '');

    if (cvc.length > 3) {
        cvc = cvc.slice(0, 3);
    }
    document.getElementById('display-cvc').textContent = cvc || '000';
});
