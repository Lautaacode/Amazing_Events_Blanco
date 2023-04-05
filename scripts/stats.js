const min_max_table = document.getElementById('min_max_table')
const past_table = document.getElementById('past_table')
const upcoming_table = document.getElementById('upcoming_table')

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


    attendancepercent(arrayEvents.events)

    let pastEvents = filterpastEvents(arrayEvents.events, arrayEvents.currentDate)
    let upcomingEvents = filterupcomingEvents(arrayEvents.events, arrayEvents.currentDate)
    
    minMaxTable(pastEvents)


    let pastCategories = deleteDuplicate(filterCategories(pastEvents))
    let upcomingCategories = deleteDuplicate(filterCategories(upcomingEvents))

    let pastTable = tableCategories(pastCategories, pastEvents)
    let upcomingTable = tableCategories(upcomingCategories, upcomingEvents)



    getTables(pastTable, past_table)

    getTables(upcomingTable, upcoming_table)

}

getArray()


function attendancepercent(eventos) {

    eventos.forEach(event => {
        if (isNaN(event.assistance)) {

            event["porcentaje"] = parseFloat(((event.estimate / event.capacity) * 100).toFixed(2))
        } else {
            event["porcentaje"] = parseFloat(((event.assistance / event.capacity) * 100).toFixed(2))

        }
    });

}

function filterpastEvents(eventos, fechaActual) {
    let pastEvents = eventos.filter((event) => event.date < fechaActual)
    return pastEvents
}

function filterupcomingEvents(eventos, fechaActual) {
    let upcomingEvents = eventos.filter((event) => event.date > fechaActual)
    return upcomingEvents
}

function filterCategories(eventos) {
    let categories = eventos.map((event) => event.category)
    return categories
}

function deleteDuplicate(array) {
    arrayCategories = array.filter((element, index) => array.indexOf(element) == index)
    return arrayCategories
}

function tableCategories(arrayCategorias, eventos) {
    let tabla = []
    for (let i = 0; i < arrayCategorias.length; i++) {
        tabla.push([])
        for (const evento of eventos) {
            if (arrayCategorias[i] == evento.category) {
                tabla[i].push(evento)
            }
        }
    }
    return tabla
}

function minMaxTable(eventos){
    let tabla1 = {
        'mayorCapacidad': eventos.sort(function (a, b) { return b.capacity - a.capacity })[0],
        'mayorPorcentaje': eventos.sort(function (a, b) { return b.porcentaje - a.porcentaje })[0],
        'menorPorcentaje': eventos.sort(function (a, b) { return a.porcentaje - b.porcentaje })[0]
    }

    min_max_table.innerHTML = ` 

    <tr>
        <td>${tabla1.mayorPorcentaje.name}: ${tabla1.mayorPorcentaje.porcentaje}%</td>
        <td>${tabla1.menorPorcentaje.name}: ${tabla1.menorPorcentaje.porcentaje}%</td>
        <td>${tabla1.mayorCapacidad.name}: (${tabla1.mayorCapacidad.capacity})</td>
    </tr>
    `
}
function getTables(array, tabla) {
    let tablaHTML = ``
    for (let i = 0; i < array.length; i++) {

        let revenue = 0
        let porcentajeTabla = 0
        let categoria
        for (const evento of array[i]) {
            categoria = evento.category
            revenue += evento.price * (isNaN(evento.assistance) ? evento.estimate : evento.assistance)
            porcentajeTabla += evento.porcentaje
        }
        porcentajeTablaPromedio = porcentajeTabla / (array[i].length)
        tablaHTML += `
    <tr>
        <td>${categoria}</td>
        <td>${revenue} U$D</td>
        <td>${parseFloat(porcentajeTablaPromedio.toFixed(2))}%</td>
    </tr>`
        tabla.innerHTML = tablaHTML
    }
}