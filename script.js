// Global variables
let author = '';
let previousSelected;
let model = '';
let neck = '';
let material = '';
let inputValue = '';

// while (true) {
//     author = prompt("Qual o seu nome?")
//     console.log(author)
//     if (author !== '') {
//         break
//     } else {
//         alert("Nome inválido")
//     }
// }
function selectModelOption(option) {
    previousSelected = document.querySelector('.models-options .option-selected')
    if (previousSelected !== null) {
        previousSelected.classList.remove('option-selected')
    }
    model = option.querySelector('p').innerHTML
    console.log(model)
    option.classList.add('option-selected')
    verifyConfirmOrder()
}
function selectNeckOption(option) {
    previousSelected = document.querySelector('.necks-options .option-selected')
    if (previousSelected !== null) {
        previousSelected.classList.remove('option-selected')
    }
    neck = option.querySelector('p').innerHTML
    console.log(neck)
    option.classList.add('option-selected')
    verifyConfirmOrder()
}
function selectMaterialOption(option) {
    previousSelected = document.querySelector('.materials-options .option-selected')
    if (previousSelected !== null) {
        previousSelected.classList.remove('option-selected')
    }
    material = option.querySelector('p').innerHTML
    console.log(material)
    option.classList.add('option-selected')
    verifyConfirmOrder()
}
function verifyConfirmOrder() {
    if (model !== '' && neck !== '' && material !== '' && inputValue !== '') {
        document.querySelector('.confirm-order').classList.add('confirm-order-ready')
    } else {
        document.querySelector('.confirm-order').classList.remove('confirm-order-ready')
    }
}
function verifyInput(input) {
    inputValue = input.value
    console.log(inputValue)
    verifyConfirmOrder()
}