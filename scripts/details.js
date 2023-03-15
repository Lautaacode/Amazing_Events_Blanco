let details = data.events.filter( data => data._id ) 
//console.log(details)

let details_aux = details.map( data => { 
    let aux = {}
    aux.image = data.image
    aux.name = data.name
    aux.date = data.date
    aux.description = data.description
    aux.category = data.category
    aux.place = data.place
    aux.capacity = data.capacity
    aux.assistance = data.assistance
    aux.estimate = data.estimate
    aux.price = data.price
    aux._id = data._id
    return aux
})
//console.log(details_aux);

const locationURL = document.location.search
const param = new URLSearchParams(locationURL)
let id = param.get("id")

let details_id = details_aux.find(data => data._id == id) 
//console.log(details_id);

let detail_card = document.getElementById("details") 
//console.log(detail_card)


detail_card.innerHTML = `<div class="details">
<figure class="details-figure">
    <img src="${details_id.image}" class="details-img" alt="">
</figure>
<article class="details-info">
    <h2>${details_id.name}</h2>
    <p>${details_id.description}</p>
    <p>Date: ${details_id.date}</p>
    <div class="d-flex flex-row  gap-3" >
        <p>Capacity: ${details_id.capacity}</p>
        <p>${details_id.assistance?"Asistance: ": "Estimate: " } ${details_id.assistance?details_id.assistance:details_id.estimate}</p>  
    </div>
    <div class="d-flex flex-row  gap-3">
        <p>Place: ${details_id.place}</p>
        <p>Price: ${details_id.price}</p>
    </div>
</article>
</div>`