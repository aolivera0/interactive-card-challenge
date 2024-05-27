import './style.css'
const $name = document.querySelector("#name")
const $cardNumber = document.querySelector("#card-number")
const $month = document.querySelector("#month")
const $year = document.querySelector("#year")
const $cvc = document.querySelector("#cvc")
const $allInputs = document.querySelectorAll("input[verifiable]");

const $cardFrontNumber = document.querySelector("#card-front-number");
const $cardName = document.querySelector("#card-front-name");
const $cardMonth = document.querySelector("#card-front-month");
const $cardYear = document.querySelector("#card-front-year");
const $cardCvc = document.querySelector("#card-back-cvc");


$allInputs.forEach((input) => {
  const blankErrorMessage = document.createElement('p');
  blankErrorMessage.textContent = "Can't be blank"
  blankErrorMessage.classList.add("red-alert", "blank")

  input.addEventListener('focusin', (e) => {
    if (input.parentElement.contains(blankErrorMessage)) input.parentElement.removeChild(blankErrorMessage);
    input.classList.remove('red-border')
  })

  input.addEventListener('focusout', (e) => {
    if (e.target.value.length > 0) return

    input.parentElement.appendChild(blankErrorMessage)
    input.classList.add("red-border")
  })
})

$name.addEventListener('keyup', (e) => {
  $cardName.innerText = e.target.value.length === 0 ? "Jane Applebeed" : e.target.value
})


$cardNumber.addEventListener('keyup', (e) => {
  if (e.target.value.length >= 16 ) $cardNumber.value = e.target.value.slice(0, 16)
  //$cardNumber.value = e.target.value.split(" ", 4).join(" ")
  $cardFrontNumber.innerText = validarVacio(e, "0000 0000 0000 0000")
})
const lengthError = document.createElement('p')
lengthError.textContent = "Wrong number length, it must have 16 digits"
lengthError.classList.add("red-alert")

$cardNumber.addEventListener('focusin', (e) => {
  if ($cardNumber.parentElement.contains(lengthError)) $cardNumber.parentElement.removeChild(lengthError);
  $cardNumber.classList.remove('red-border')
})

$cardNumber.addEventListener('focusout', (e) => {
  if (e.target.value.length != 16) {
    $cardNumber.parentElement.appendChild(lengthError)
    $cardNumber.classList.add('red-border')
  }
})



$month.addEventListener('keyup', (e) => {
  if ((e.target.value > 12) || (e.target.value <= 0)) {
    $month.parentElement.parentElement.appendChild(invalidDateErrorMessage)
    $month.classList.add("red-border")
  } else if ($month.parentElement.parentElement.contains(invalidDateErrorMessage)) {
    $month.parentElement.parentElement.removeChild(invalidDateErrorMessage)
    $month.classList.remove("red-border")
  }


  if (e.target.value.length > 2) $month.value = e.target.value.slice(0, 2)
  $cardMonth.innerText = validarVacio(e, "00")
})

const blankErrorMessageDate = document.createElement('p');
blankErrorMessageDate.textContent = "Can't be blank"
blankErrorMessageDate.classList.add("red-alert", "blank")

$month.addEventListener('focusout', (e) => {
  if (e.target.value.length === 0) {
    if (e.target.value.length == 0 && !$month.parentElement.parentElement.contains(blankErrorMessageDate)) {
      $month.parentElement.parentElement.appendChild(blankErrorMessageDate)
    }
    $month.classList.add("red-border")
  }
})
$month.addEventListener("focusin", () => {
  if ($month.parentElement.parentElement.contains(blankErrorMessageDate) && !$year.classList.contains('red-border')) $month.parentElement.parentElement.removeChild(blankErrorMessageDate);
  $month.classList.remove("red-border")
})

$year.addEventListener('focusout', (e) => {
  if (e.target.value.length === 0) {
    if (e.target.value.length == 0 && !$year.parentElement.parentElement.contains(blankErrorMessageDate)) {
      $year.parentElement.parentElement.appendChild(blankErrorMessageDate)
    }
    $year.classList.add("red-border")
  }
})
$year.addEventListener('focusin', () => {
  if ($year.parentElement.parentElement.contains(blankErrorMessageDate) && !$month.classList.contains('red-border')) $year.parentElement.parentElement.removeChild(blankErrorMessageDate);
  $year.classList.remove("red-border")
})

const invalidDateErrorMessage = document.createElement('p');
invalidDateErrorMessage.textContent = "Invalid card date"
invalidDateErrorMessage.classList.add("red-alert")

$year.addEventListener('keyup', (e) => {

  if (e.target.value < 24) {
    $year.parentElement.parentElement.appendChild(invalidDateErrorMessage)
    $year.classList.add("red-border")
  } else if ($year.parentElement.parentElement.contains(invalidDateErrorMessage)) {
    $year.parentElement.parentElement.removeChild(invalidDateErrorMessage)
    $year.classList.remove("red-border")
  }
 
  if (e.target.value.length > 2) $year.value = e.target.value.slice(0, 2)
  $cardYear.innerText = validarVacio(e, "00")
})



const lengthErrorCvc = document.createElement('p')
lengthErrorCvc.textContent = "It must have 3 digits"
lengthErrorCvc.classList.add('red-alert')

$cvc.addEventListener('keyup', (e) => {
  if (e.target.value.length > 3) $cvc.value = e.target.value.slice(0, 3)
  $cardCvc.innerText = validarVacio(e, "000")
})
$cvc.addEventListener('focusout', (e) => {
  if (e.target.value.length !== 3) {
    $cvc.parentElement.appendChild(lengthErrorCvc)
    $cvc.classList.add("red-border")
  }
})
$cvc.addEventListener('focusin', () => {
  if ($cvc.parentElement.contains(lengthErrorCvc)) $cvc.parentElement.removeChild(lengthErrorCvc)
})

function validarVacio(e, defecto) {
  return e.target.value.length === 0 ? defecto : e.target.value
}
// TO DO: format card number, validate inputs (valid caracters,length yy, mm), style form inputs, make it responsive, make lines of background card, twekt it, remove salto de layout
