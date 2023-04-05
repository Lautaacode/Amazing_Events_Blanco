const querySearch = document.location.search
const id = new URLSearchParams(querySearch).get("id")

async function getEvents() {
    data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            
            return data;
        })
    return data
}

async function getArray(){
    let arrayEvents = await getEvents()
let details_id = data.events.find(data => data._id == id) 
let detail_card = document.getElementById("details") 

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
}
getArray()