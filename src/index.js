// Showing the real date 


let now = new Date();
let dayNumber = now.getDate();
let month = now.getMonth();
let months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
let currentDate = document.querySelector("#bdate");
currentDate.innerHTML = `${months[month]} ${dayNumber}`;

// Date conversion from API array

function formatDate(day) {
    let date = new Date(day * 1000);
    let dayNumber = date.getDate();
    let month = date.getMonth();
    let months = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
    ];
    let fullDate = `${dayNumber}.${months[month]}`;
    return fullDate;

}


// Showing the real forecast


function showForecast(response) {
    let forecastArray = response.data.daily;

    let forecastEl = document.querySelector("#forecast");

    let forecastHTML = `<div class="row row-cols-2">`;
    forecastArray.forEach(function (forecastDay, index) {
        if (index > 0 && index < 5) {
            forecastHTML = forecastHTML + `
    
    <div class="col border border-primary border-opacity-75">
        <div class="row-3 forecastForm">
            <div class="col fore-date">${formatDate(forecastDay.dt)}</div>
            <div class="col fore-temp">
                <span class="smdaytemp">${Math.round(forecastDay.temp.max)}</span>/<span class="smnighttemp">${Math.round(forecastDay.temp.min)}℃</span>
            </div>
            <div class="col fore-status">
            <img
            src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="" width="60" class="iconFore"/>
            </div>
        </div>

    </div>
     `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastEl.innerHTML = forecastHTML;
}


// Getting a forecast data via lattitude & longtitude 


function getForecast(coordinates) {

    let apiKey = "936d2722fd6ddb5c6ab52ceb5b0238af";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}


// Showing the city you search and its real weather


let formSearch = document.querySelector("#search");
let buttonSearch = document.querySelector("#BS");

function citySearch(city) {
    let apiKey = "936d2722fd6ddb5c6ab52ceb5b0238af";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getTemp);
}

function submitCity(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#CS");
    let city = citySearch(searchCity.value);
}


// Showing current weather conditions


function getTemp(response) {
    console.log(response.data);
    let newTemp = document.querySelector("#DT");
    let maxTemperEl = document.querySelector("#maxTemp");
    let minTemperEl = document.querySelector("#minTemp");
    let humidityEl = document.querySelector("#humidity");
    let windEl = document.querySelector("#wind");
    let skyIconEl = document.querySelector("#skyIcon");
    let descriptionEl = document.querySelector("#weatherDescription");
    let headCity = document.querySelector("#headC");
    headCity.innerHTML = response.data.name;
    humidityEl.textContent = `${response.data.main.humidity}`;
    windEl.textContent = `${Math.round(response.data.wind.speed)}`;
    newTemp.textContent = `${Math.round(response.data.main.temp)}`;
    maxTemperEl.textContent = `${Math.round(response.data.main.temp_max)}`;
    minTemperEl.textContent = `${Math.round(response.data.main.temp_min)}`;
    skyIconEl.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    skyIconEl.setAttribute("alt", response.data.weather[0].description);
    descriptionEl.innerHTML = response.data.weather[0].description;

    getForecast(response.data.coord);
}

formSearch.addEventListener("submit", submitCity);


// Showing the current city you're in and its real weather on button click


function showTempPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "936d2722fd6ddb5c6ab52ceb5b0238af";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    function getTempbyCurrent(response) {
        let headCity = document.querySelector("#headC");

        headCity.innerHTML = `${response.data.name}`;
        let newTemp = document.querySelector("#DT");
        let humidityEl = document.querySelector("#humidity");
        let windEl = document.querySelector("#wind");
        let maxTemperEl = document.querySelector("#maxTemp");
        let minTemperEl = document.querySelector("#minTemp");
        let skyIconEl = document.querySelector("#skyIcon");
        let descriptionEl = document.querySelector("#weatherDescription");
        humidityEl.textContent = `${response.data.main.humidity}`;
        humidityEl.textContent = `${response.data.main.humidity}`;
        windEl.textContent = `${Math.round(response.data.wind.speed)}`;
        newTemp.textContent = `${Math.round(response.data.main.temp)}`;
        maxTemperEl.textContent = `${Math.round(response.data.main.temp_max)}`;
        minTemperEl.textContent = `${Math.round(response.data.main.temp_min)}`;
        skyIconEl.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        skyIconEl.setAttribute("alt", response.data.weather[0].description);
        descriptionEl.innerHTML = `${response.data.weather[0].description}`;
        getForecast(response.data.coord);
    }
    axios.get(apiUrl).then(getTempbyCurrent);
}

function gettPosition() {
    navigator.geolocation.getCurrentPosition(showTempPosition);
}

let button = document.querySelector("#currentCityTemp");
button.addEventListener("click", gettPosition);


citySearch("Kyiv");

