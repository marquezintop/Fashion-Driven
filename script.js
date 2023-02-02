// Global variables
let namePrompt = '';
let previousSelected;
let model = '';
let neck = '';
let material = '';
let inputValue = '';
let arrayLastOrders = [];

// Button 'confirm-order' disabled
document.querySelector('.confirm-order').disabled = true

// AXIOS GET when starting the website
getLastOrders()

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
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', object)
    promise.then(confirmOrderSucess);
    promise.catch(answer => {
        alert('Ops, não conseguimos processar sua encomenda')
        console.log(answer.message)})
}

function confirmOrderSucess(answer) {
    alert('Encomenda confirmada com sucesso')
    console.log(answer.data)
    const optionsSelected = document.querySelectorAll('.option-selected')
    const arrayOptionsSelected = Array.prototype.slice.call(optionsSelected)
    arrayOptionsSelected.map(options => options.classList.remove('option-selected'))
    model = ''
    neck = ''
    material = ''
    document.querySelector('input').value = ''
    verifyConfirmOrder()
    getLastOrders()
}

// AXIOS GET of the last orders

function getLastOrders() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts')
    promise.then(getLastOrdersSucess)
    promise.catch(answer => console.log(answer.message))
}

function getLastOrdersSucess(answer) {
    let footerContent = document.querySelector('.last-orders')
    footerContent.innerHTML = ''
    arrayLastOrders = []
    for (let i=0; i<5; i++) {
        arrayLastOrders.push(answer.data[i])
        footerContent.innerHTML += `<button class="last-order" onclick="lastOrderConfirm(${i})">
        <img src=${answer.data[i].image}>
        <p><span>Criador:</span> ${answer.data[i].owner}</p>
    </button>`
    }
}

// Request of a last order

function lastOrderConfirm(index) {
    callingTheOptions(index)
    const confirmed = confirm(`Você quer encomendar essa roupa? 
    Modelo: ${model};
    Gola: ${neck};
    Material: ${material}.`)
    if (confirmed === true) {
    const object = {'model': arrayLastOrders[index].model, 'neck': arrayLastOrders[index].neck, 
        'material': arrayLastOrders[index].material, 'image': arrayLastOrders[index].image, 
        'owner': namePrompt, 'author': arrayLastOrders[index].image
        }
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', object)
    promise.then(res => {
        console.log(res.data)
        getLastOrders()
    })
    promise.catch(res => console.log(res.message))
    } else {
        model = ''
        neck = ''
        material = ''
    }
}

//Calling the options their portuguese names

function callingTheOptions(index) {
    if (arrayLastOrders[index].model === 't-shirt') {
        model = 'T-shirt'
    } else if (arrayLastOrders[index].model === 'top-tank') {
        model = 'Camiseta'
    } else {
        model = 'Manga longa'
    }
    if (arrayLastOrders[index].neck === 'v-neck') {
        neck = 'Gola V'
    } else if (arrayLastOrders[index].neck === 'round') {
        neck = 'Gola redonda'
    } else {
        neck = 'Gola polo'
    }
    if (arrayLastOrders[index].material === 'silk') {
        material = 'Seda'
    } else if (arrayLastOrders[index].material === 'cotton') {
        material = 'Algodão'
    } else {
        material = 'Poliéster'
    }
}