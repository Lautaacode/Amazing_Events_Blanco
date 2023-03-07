function upcoming_filter(array, date_reference) {
    let upcoming_date=[]
    for(i =0; i< array.length; i++) {
        if (array[i].date > date_reference) {
            upcoming_date.push(array[i])
        }
    }
    return upcoming_date
}

let datos = upcoming_filter(data.events, data.currentDate)

cards(datos, "cards_upcoming_events")