// Showing the real date and time

let now = new Date();
let day = now.getDay();
let hour = now.getHours();
let min = now.getMinutes();
let weekday = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
let currentDate = document.querySelector("#bdate");
currentDate.innerHTML = `${weekday[day]} ${hour} : ${min}`;
console.log(`${weekday[day]} ${hour} : ${min}`);

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
        let humidityEl = document.querySelector("#humidity");
        let windEl = document.querySelector("#wind");
        humidityEl.textContent = `${response.data.main.humidity}`;
        windEl.textContent = `${Math.round(response.data.wind.speed)}`;
        newTemp.textContent = `${Math.round(response.data.main.temp)}`;
        c.textContent = "℃";
        f.textContent = "℉";
    }
    axios.get(apiUrl).then(getTemp);
}
formSearch.addEventListener("submit", newCity);


// Conversion Celcius to Farenheit and backwards

let c = document.querySelector("#celcius");
let f = document.querySelector("#farenheit");

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

f.addEventListener("click", CFconversion);


// Showing the current city you're in and its real temperature on button click

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
        humidityEl.textContent = `${response.data.main.humidity}`;
        windEl.textContent = `${Math.round(response.data.wind.speed)}`;
        newTemp.textContent = `${Math.round(response.data.main.temp)}`;
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
// let dayNumber = now.getDate();
// let month = now.getMonth();
// let months = [
//     "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
// ];
// let currentDate = document.querySelector("#bdate");
// currentDate.innerHTML = `${months[month]} ${dayNumber}`;
// 