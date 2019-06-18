const mymap = L.map('myMap').setView([0, 0], 1);
const marker = L.marker([0, 0], ).addTo(mymap);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ';
const tiles = L.tileLayer(tileUrl, {
    attribution
});
getData();
async function getData() {
    const response = await fetch("/api");
    const data = await response.json();
    tiles.addTo(mymap);
    for (item of data) {
        marker.setLatLng([item.weather.latitude, item.weather.longitude]);
        const newmarker = L.marker([item.weather.latitude, item.weather.longitude], ).addTo(mymap);
        const text = `The weather hear at ${item.weather.latitude} 
        ${item.weather.longitude} is ${item.weather.currently.summary} with temperature of ${item.weather.currently.temperature}C.`;
        if (item.air === 0) {
            newmarker.bindPopup(text + ' No air quality reading');
        } else {
            const airdt = ` The particle density of(${ item.air.parameter }) is ${ item.air.value} ${item.air.unit} last recorded on ${
            item.air.lastUpdated
        }`;
            newmarker.bindPopup(text + airdt);
        }



    }
}