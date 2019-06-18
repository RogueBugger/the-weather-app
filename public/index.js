let latitude, longitude, summary, temperature, humidity, weather, air, airdata;
if ("geolocation" in navigator) {
    console.log("geolocation is available");

    navigator.geolocation.getCurrentPosition(async position => {
        try {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            const url = `weather/${latitude},${longitude}`;
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);

            weather = json.weather;
            document.getElementById("latitude").textContent = latitude;
            document.getElementById("longitude").textContent = longitude;
            document.getElementById("summary").textContent =
                weather.currently.summary;
            document.getElementById("temperature").textContent =
                weather.currently.temperature;
            air = json.airQuality.results[0].measurements[0];
            document.getElementById(
                "parameter"
            ).textContent = `The particle density of (${air.parameter})`;
            document.getElementById("value").textContent = `is ${air.value}`;
            document.getElementById("unit").textContent = air.unit;
            document.getElementById("lastUpdated").textContent = `last recorded on ${
        air.lastUpdated
      }`;
            summary = weather.currently.summary;
            humidity = weather.currently.humidity;
            temperature = weather.currently.temperature;

        } catch (error) {
            air = 0
            document.getElementById("parameter").textContent = 'No data!';
            document.getElementById("value").textContent = ' in ';
            document.getElementById("unit").textContent = " air";
            document.getElementById("lastUpdated").textContent = "quality";
        }
        const data = {
            latitude,
            longitude,
            summary,
            temperature,
            humidity,
            weather,
            air
        };
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const jresponse = await fetch("/api", options);
        const jsonData = await jresponse.json();
    });

} else {
    console.log("geolocation is unavailable");
}