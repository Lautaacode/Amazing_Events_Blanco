const cards = document.getElementById('cards_index')
const checks = document.getElementById('cat')
const input = document.querySelector('input')

input.addEventListener('input',superFiltro)

checks.addEventListener('change',superFiltro)


function superFiltro(){
    let primerFiltro = filtrarPorTexto(data.events,input.value)
    let segundoFiltro = filtrarPorPais(primerFiltro)
    printCards(segundoFiltro)
}

function printCheckbox(array){
    let arrayCountrys = array.map(data => data.category)
    let setCountry = new Set(arrayCountrys)
    let arrayChecks = Array.from(setCountry)
    let checkboxes = ''
    arrayChecks.forEach(category => {
        checkboxes += `<li class="list-group-item form-check">
        <input class="form-check-input me-1" type="checkbox" value="${category}" id="${category}">
            <label class="form-check-label stretched-link" for="${category}">${category}
            </label>
    </li>`
    })
    checks.innerHTML = checkboxes
}

function printCards(array){
    if(array.length == 0){
        cards.innerHTML = `<h2 class="display-1 fw-bolder">No hay coincidencias</h2>`
        return
    }
    let tarjetas = ''
    array.forEach(card => {
        tarjetas += `<div class="card">
        <img src="${card.image}" class="card-img-top" alt="${card.name} image">
        <div class="card-body text-center">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text">${card.description}</p>
            <p class="card-text">${card.category}</p>
        </div>
        <div class="see-more">
            <p>$${card.price}</p>
            <a href="./details.html?id=${card._id}" class="btn btn-pink">See more..</a>
        </div>
    </div>`
    })
    cards.innerHTML = tarjetas
}

function filtrarPorTexto(array,texto){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function filtrarPorPais(array){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.country))
    if(arrayChecksChecked.length > 0){
        return arrayFiltrado
    }
    return array
}