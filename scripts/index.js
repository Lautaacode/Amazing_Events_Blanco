const homeEvents = document.getElementById('cards_index')
const search = document.getElementById('search');
const categoryEvents = document.getElementById('cat')

//tarjertas
function printCards(events) {
    let cards = ''
    if(events.length == 0){
        cards = `<h2 class="display-1 fw-bolder">No hay coincidencias</h2>`
    }
    events.forEach(card => {
        cards += `<div class="card">
        <img src="${card.image}" class="card-img-top" alt="${card.name} image">
        <div class="card-body text-center">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text">${card.description}</p>
        </div>
        <div class="see-more">
            <p>$${card.price}</p>
            <a href="./details.html?id=${card._id}" class="btn btn-pink">See more..</a>
        </div>
    </div> `
    });
    homeEvents.innerHTML = cards
}
//categorias 
function filterCategories(eventos){
    let categorias = eventos.map((event) => event.category)
    return categorias
}

function deleteDuplicate(array){
    arrayCategories=array.filter((element,index) => array.indexOf(element) == index)
    return arrayCategories
};
//filtros categorias y busqueda
function searchBar(eventos){
    let eventFilter = eventos.filter((event) => event.name.toLowerCase().includes(search.value));
        return eventFilter
}

function showCategories(categorias) {
    let categories = ``
    categorias.forEach(category=> {
        categories  +=
                `<li class="list-group-item form-check">
                <input class="form-check-input me-1" type="checkbox" value="${category}" id="${category}">
                    <label class="form-check-label stretched-link" for="${category}">${category}
                    </label>
            </li>`
    });
    categoryEvents.innerHTML = categories
}

function filterByCategory(events){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    let eventosFiltrado = events.filter(evento => arrayChecksCheckedValues.includes(evento.category))
    if(arrayChecksChecked.length > 0){
        return eventosFiltrado
    }
    return events
}

function superFilter(){
    let firstFilter = searchBar(data.events)
    let secondFilter = filterByCategory(firstFilter)
    printCards(secondFilter)
}

//llamados a funciones
printCards(data.events)
showCategories(deleteDuplicate(filterCategories(data.events)))
search.addEventListener('input',superFilter)
categoryEvents.addEventListener('change',superFilter)
