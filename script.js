({
    plugins: ['jsdom-quokka-plugin']
})

const billAmount = document.querySelector('.card__price');
const tipButtons = document.querySelectorAll('.card__button');
const tipAmount = document.querySelector('.card__button_tip');
const numberOfPeople = document.querySelector('.card__numberOfPeople');
const tipAmountPerson = document.querySelector('.tip-amount');
const totalAmountPerson = document.querySelector('.total');
const resetButton = document.querySelector('.card__reset');
const fatherErrorMessage = document.querySelector('.card__number-people');
let tipValue = 0;

console.log(numberOfPeople.value)
const addError = () => {
    if (numberOfPeople.value < 1) {
        numberOfPeople.style.border = '2px solid red';
        const p = document.createElement('p');
        p.className = 'error-message'
        p.innerText = `Can't be zero`;
        fatherErrorMessage.appendChild(p);
    }
}

const deleteError = () => {
    const error = document.querySelector('.error-message');
    if (numberOfPeople.value < 0) {
        error.remove();
        numberOfPeople.style.border = 'none';
    }
    if (error) {
        error.remove();
        numberOfPeople.style.border = 'none';
    }
}




const addPrice = () => {
    if (numberOfPeople.value === 0 || numberOfPeople.value === undefined || numberOfPeople.value === '') {
        console.log('it is equal to 0')
        // return;
        const amount = billAmount.value
        totalAmountPerson.innerText = `$ ${amount.toFixed(2)}`;
    } else {
        console.log('it is larger than 0')
        const pricePerPerson = billAmount.value / numberOfPeople.value;
        console.log(tipValue)
        const tipPerPerson = (billAmount.value * tipValue) / numberOfPeople.value;
        const total = pricePerPerson + tipPerPerson;
        // console.log(pricePerPerson);
        tipAmountPerson.innerText = `$${tipPerPerson.toFixed(2)}`;
        totalAmountPerson.innerText = `$${total.toFixed(2)}`;
    }
}

const updateResetButton = () => {
    if (numberOfPeople.value === 0 || numberOfPeople.value === '' && billAmount.value === 0 || billAmount.value === '') {
        resetButton.classList.remove('card__reset--active');
        resetButton.classList.add('card__reset--inactive');
    } else {
        resetButton.classList.remove('card__reset--inactive');
        resetButton.classList.add('card__reset--active');
    }
}
const reset = () => {
    billAmount.value = '';
    addPrice();
    numberOfPeople.value = '';
    tipAmount.value = '';
    updateResetButton();
}

const unselectAllButtons = () => {
    tipButtons.forEach(button => {
        button.classList.remove('card__button--active')
    })
}

tipAmount.addEventListener('keyup', e => {
    const tip = tipAmount.value / 100;
    tipValue = tip;
    unselectAllButtons();
    updateResetButton();
    deleteError();
    addError();
    addPrice();
})
billAmount.addEventListener('keyup', e => {
    updateResetButton();
    deleteError();
    addError();
    addPrice();
})

tipButtons.forEach(button => {
    button.addEventListener('click', e => {
        unselectAllButtons();
        if (e.target.classList.contains('card__button_tip')) {
            tipValue=e.target.value / 100;
            updateResetButton();
            deleteError();
            addError();
            addPrice();

        } else {
            e.target.classList.add('card__button--active');
            const rawTip = e.target.innerText.split('%');
            const tip = rawTip[0];
            tipValue = tip / 100;
            updateResetButton();
            deleteError();
            addError();
            addPrice();

        }
    })
})
numberOfPeople.addEventListener ('keyup', e => {
    updateResetButton();
    deleteError();
    addError();
    addPrice();
})
resetButton.addEventListener('click', e => {
    reset();
})

// resetButton