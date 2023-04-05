const homeEvents = document.getElementById('cards_upcoming_events')
const search = document.getElementById('search');
const categoryEvents = document.getElementById('cat')


async function getEvents() {
    data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            return data;
        })
    return data
}

async function getArray() {
    let arrayEvents = await getEvents()
    let filter = filterUpcomingEvents(arrayEvents.events, arrayEvents.currentDate)
    getCards(filter)
    getCategories(deleteDuplicate(filterCategories(filter)))
}

getArray()

function getCards(events) {
    let cards = ''
    if (events.length == 0) {
        cards = `<h2 class="display-1 fw-bolder">Not found</h2>`
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

function filterUpcomingEvents(events, currentDate) {
    let pastEvents = events.filter((event) => event.date > currentDate)
    return pastEvents
}

function filterCategories(eventos) {
    let categories = eventos.map((event) => event.category)
    return categories
}

function deleteDuplicate(array) {
    arrayCategories = array.filter((element, index) => array.indexOf(element) == index)
    return arrayCategories
}

function searchBar(events) {
    let eventFilter = events.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()));
    return eventFilter
}

function getCategories(categorias) {
    let categories = ``
    categorias.forEach(category => {
        categories +=
            `<li class="list-group-item form-check">
                <input class="form-check-input me-1" type="checkbox" value="${category}" id="${category}">
                    <label class="form-check-label stretched-link" for="${category}">${category}
                    </label>
            </li>`
    });
    categoryEvents.innerHTML = categories
}

function filterByCategory(events) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    let eventosFiltrado = events.filter(evento => arrayChecksCheckedValues.includes(evento.category))
    if (arrayChecksChecked.length > 0) {
        return eventosFiltrado
    }
    return events
}

function superFilter() {
    let firstFilter = searchBar(data.events)
    let secondFilter = filterByCategory(firstFilter)
    getCards(secondFilter)
}

search.addEventListener('input', superFilter)
categoryEvents.addEventListener('change', superFilter)