function past_filter(array, date_reference) {
    let past_date=[]
    for(i =0; i< array.length; i++) {
        if (array[i].date< date_reference) {
            past_date.push(array[i])
        }
    }
    return past_date
}

let datos = past_filter(data.events, data.currentDate)

cards(datos, "cards_past_events")