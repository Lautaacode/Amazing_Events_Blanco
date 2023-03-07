function cards(array, idHTML) {
    let card = "";
    for (datos of array) {
        card += `
        <div class="card">
            <img src="${datos.image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${datos.name}</h5>
                <p class="card-text">${datos.description}</p>
            </div>
            <div class="see-more">
                <p>$${datos.price}</p>
                <a href="./details.html" class="btn btn-pink">See more..</a>
            </div>
        </div> `
    }
    const divCards = document.getElementById(idHTML);
   
    divCards.innerHTML = card;
}