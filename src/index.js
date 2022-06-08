// Showing the real date and time

// let now = new Date();
// let day = now.getDay();
// let hour = now.getHours();
// let min = now.getMinutes();
// let weekday = [
//     "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
// ];
// let currentDate = document.querySelector("#bdate");
// currentDate.innerHTML = `${weekday[day]} ${hour} : ${min}`;
// console.log(`${weekday[day]} ${hour} : ${min}`);

// Showing the city you search and its real temperature

let formSearch = document.querySelector("#search");
let buttonSearch = document.querySelector("#BS");
function newCity(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#CS");
    let headCity = document.querySelector("#headC");
    let city = searchCity.value;
    headCity.innerHTML = city;
    let apiKey = "936d2722fd6ddb5c6ab52ceb5b0238af";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    function getTemp(response) {
        console.log(response.data);
        let newTemp = document.querySelector("#DT");
        let maxTemperEl = document.querySelector("#maxTemp");
        let minTemperEl = document.querySelector("#minTemp");
        let humidityEl = document.querySelector("#humidity");
        let windEl = document.querySelector("#wind");
        let skyIconEl = document.querySelector("#skyIcon");
        let descriptionEl = document.querySelector("#weatherDescription");
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
        c.textContent = "℃";
        f.textContent = "℉";
        cmin.textContent = "℃";
        fmin.textContent = "℉";
    }
    axios.get(apiUrl).then(getTemp);
}
formSearch.addEventListener("submit", newCity);


// Conversion Celcius to Farenheit and backwards

let c = document.querySelector("#celcius");
let f = document.querySelector("#farenheit");
let cmin = document.querySelector("#celciusmin");
let fmin = document.querySelector("#farenheitmin");

function CFconversion(event) {
    event.preventDefault();
    let dayTemperEl = document.querySelector("#DT");
    let dayTemper = Number(dayTemperEl.textContent);
    if (c.innerHTML === "℃" && f.innerHTML === "℉") {
        let countF = Math.round((dayTemper * 9) / 5 + 32);
        dayTemperEl.innerHTML = countF;
        c.textContent = "℉";
        f.textContent = "℃";
    }
    else {
        let countC = Math.round((dayTemper - 32) * 5 / 9);
        dayTemperEl.innerHTML = countC;
        c.textContent = "℃";
        f.textContent = "℉";
    }
}

function CFminconversion(event) {
    event.preventDefault();
    let maxTemperEl = document.querySelector("#maxTemp");
    let maxTemper = Number(maxTemperEl.textContent);
    let minTemperEl = document.querySelector("#minTemp");
    let minTemper = Number(minTemperEl.textContent);

    if (cmin.innerHTML === "℃" && fmin.innerHTML === "℉") {
        let countmaxF = Math.round((maxTemper * 9) / 5 + 32);
        maxTemperEl.innerHTML = countmaxF;
        let countminF = Math.round((minTemper * 9) / 5 + 32);
        minTemperEl.innerHTML = countminF;
        cmin.textContent = "℉";
        fmin.textContent = "℃";
    }
    else {
        let countmaxC = Math.round((maxTemper - 32) * 5 / 9);
        maxTemperEl.innerHTML = countmaxC;
        let countminC = Math.round((minTemper - 32) * 5 / 9);
        minTemperEl.innerHTML = countminC;
        cmin.textContent = "℃";
        fmin.textContent = "℉";
    }
}



f.addEventListener("click", CFconversion);
fmin.addEventListener("click", CFminconversion);


// Showing the current city you're in and its real temperature on button click

function showTempPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "936d2722fd6ddb5c6ab52ceb5b0238af";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    function getTempbyCurrent(response) {
        let headCity = document.querySelector("#headC");
        console.log(response.data);
        headCity.innerHTML = `${response.data.name}`;
        let newTemp = document.querySelector("#DT");
        let humidityEl = document.querySelector("#humidity");
        let windEl = document.querySelector("#wind");
        let maxTemperEl = document.querySelector("#maxTemp");
        let minTemperEl = document.querySelector("#minTemp");
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
        descriptionEl.innerHTML = response.data.weather[0].description;
        cmin.textContent = "℃";
        fmin.textContent = "℉";
        c.textContent = "℃";
        f.textContent = "℉";
    }
    axios.get(apiUrl).then(getTempbyCurrent);
}

function gettPosition() {
    navigator.geolocation.getCurrentPosition(showTempPosition);
}

let button = document.querySelector("#currentCityTemp");
button.addEventListener("click", gettPosition);







// This will be in my project according to my prototype:
let now = new Date();
let dayNumber = now.getDate();
let month = now.getMonth();
let months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
let currentDate = document.querySelector("#bdate");
currentDate.innerHTML = `${months[month]} ${dayNumber}`;
