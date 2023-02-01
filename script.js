// Global variables
let namePrompt = '';
let previousSelected;
let model = '';
let neck = '';
let material = '';
let inputValue = '';

// Button 'confirm-order' disabled
document.querySelector('.confirm-order').disabled = true

// Name of the user
while (true) {
    namePrompt = prompt("Qual o seu nome?")
    console.log(namePrompt)
    if (namePrompt !== '') {
        break
    } else {
        alert("Nome inválido")
    }
}

// Select Options
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

//Verify input and button 'confirm-order'
function verifyConfirmOrder() {
    if (model !== '' && neck !== '' && material !== '' && inputValue !== '') {
        document.querySelector('.confirm-order').classList.add('confirm-order-ready')
        document.querySelector('.confirm-order').disabled = false
    } else {
        document.querySelector('.confirm-order').classList.remove('confirm-order-ready');
        document.querySelector('.confirm-order').disabled = true;
    }
}
function verifyInput(input) {
    inputValue = input.value
    verifyConfirmOrder()
}

// AXIOS post of the order
function confirmOrder() {
    const object = {'model': model, 'neck': neck, 'material': material, 
        'image': inputValue, 'owner': namePrompt, 'author': namePrompt
        }
    let promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', object)
    promise.then(aaa);
    promise.catch(res => {
        alert('Ops, não conseguimos processar sua encomenda')
        console.log(res.message)})
}

function aaa(res) {
    alert('Encomenda confirmada com sucesso')
    console.log(res.data)
    const optionsSelected = document.querySelectorAll('.option-selected')
    const arrayOptionsSelected = Array.prototype.slice.call(optionsSelected)
    arrayOptionsSelected.map(options => options.classList.remove('option-selected'))
    model = ''
    neck = ''
    material = ''
    document.querySelector('input').value = ''
    verifyConfirmOrder()
}