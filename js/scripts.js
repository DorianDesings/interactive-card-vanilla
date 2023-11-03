const formElement = document.getElementById('form');

const inputNameElement = document.getElementById('input-name');
const inputNumberElement = document.getElementById('input-number');
const inputMonthElement = document.getElementById('input-month');
const inputYearElement = document.getElementById('input-year');
const inputCVCElement = document.getElementById('input-cvc');

const cardNameElement = document.getElementById('card-name');
const cardNumberElement = document.getElementById('card-number');
const cardMonthElement = document.getElementById('card-month');
const cardYearElement = document.getElementById('card-year');
const cardCVCElement = document.getElementById('card-cvc');

const cardNameErrorElement = document.getElementById('card-name-error');
const cardNumberErrorElement = document.getElementById('card-number-error');
const cardDateErrorElement = document.getElementById('card-date-error');
const cardCVCErrorElement = document.getElementById('card-cvc-error');

const alphabet = 'abcdefghijklmnñopqrstuvwxyz';

const formRules = {
  'input-name': {
    maxLength: 8
  },
  'input-number': {
    maxLength: 16
  },
  'input-month': {
    maxLength: 2
  },
  'input-year': {
    maxLength: 2
  },
  'input-cvc': {
    maxLength: 3
  }
};

const formValues = {
  'input-name': '',
  'input-number': '',
  'input-month': '',
  'input-year': '',
  'input-cvc': ''
};

const validateOnlyLetters = value => {
  let numberOfNumbers = 0;
  for (const letter of value) {
    if (!alphabet.includes(letter)) {
      numberOfNumbers++;
    }
  }
  console.log(!numberOfNumbers > 0);

  return !numberOfNumbers > 0;
};

const validateOnlyNumbers = value => {
  let numberOfNumbers = 0;
  for (const letter of value) {
    if (!alphabet.includes(letter)) {
      numberOfNumbers++;
    }
  }

  return numberOfNumbers > 0;
};

const validateForm = () => {
  // Name
  if (formValues['input-name'] === '') {
    cardNameErrorElement.textContent = "Can't be blank.";
    cardNameErrorElement.classList.add('show-error');
  } else {
    if (!/[a-zñáéíóú]/i.test(formValues['input-name'])) {
      cardNameErrorElement.textContent = 'Wrong format, only letters.';
      cardNameErrorElement.classList.add('show-error');
    } else {
      cardNameErrorElement.classList.remove('show-error');
    }
  }

  // Number
  if (formValues['input-number'] === '') {
    cardNumberErrorElement.textContent = "Can't be blank.";
    cardNumberErrorElement.classList.add('show-error');
  } else {
    if (!validateOnlyNumbers(formValues['input-number'])) {
      cardNumberErrorElement.textContent = 'Wrong format, only numbers.';
      cardNumberErrorElement.classList.add('show-error');
    } else {
      cardNumberErrorElement.classList.remove('show-error');
    }
  }

  // Date
  if (formValues['input-month'] === '' || formValues['input-year'] === '') {
    cardDateErrorElement.textContent = "Can't be blank.";
    cardDateErrorElement.classList.add('show-error');
  } else {
    if (!/^(0?[1-9]|1[0-2])$/.test(formValues['input-month'])) {
      cardDateErrorElement.textContent = 'Wrong month.';
      cardDateErrorElement.classList.add('show-error');
    } else if (!validateOnlyNumbers(formValues['input-month']) || !validateOnlyNumbers(formValues['input-year'])) {
      cardDateErrorElement.textContent = 'Wrong format, only numbers.';
      cardDateErrorElement.classList.add('show-error');
    } else {
      cardDateErrorElement.classList.remove('show-error');
    }
  }

  // CVC
  if (formValues['input-cvc'] === '') {
    cardCVCErrorElement.textContent = "Can't be blank.";
    cardCVCErrorElement.classList.add('show-error');
  } else {
    if (!validateOnlyNumbers(formValues['input-cvc'])) {
      cardCVCErrorElement.textContent = 'Wrong format, only numbers.';
      cardCVCErrorElement.classList.add('show-error');
    } else {
      cardCVCErrorElement.classList.remove('show-error');
    }
  }
};

const writeInCard = () => {
  cardNameElement.textContent = formValues['input-name'] || 'JANE APPLESEED';
  cardNumberElement.textContent = formValues['input-number'] || '0000 0000 0000 0000';
  cardMonthElement.textContent = formValues['input-month'] || '00';
  cardYearElement.textContent = formValues['input-year'] || '00';
  cardCVCElement.textContent = formValues['input-cvc'] || '000';
};

const setFormValues = event => {
  const currentInput = event.target.name;
  const currentValue = event.target.value;

  if (currentValue.length > formRules[currentInput].maxLength) {
    event.target.value = currentValue.substring(0, currentValue.length - 1);
    return;
  }

  formValues[currentInput] = currentValue;

  writeInCard();
};

formElement.addEventListener('input', setFormValues);

formElement.addEventListener('submit', event => {
  event.preventDefault();
  validateForm();
});
