// hamburger menu

const hamburger__icon = document.getElementById("hamburger");
const header = document.getElementById("header");
hamburger__icon.addEventListener("click", () => {
  if (header.style.height != "100vh") {
    header.style.height = "100vh";
    hamburger__icon.style.transform = "Rotate(-90deg)";
  }
  else if (header.style.height == "100vh") {
    header.style.height = "0vh";
    hamburger__icon.style.transform = "Rotate(0deg)";
  }

})


// getting longitude and latitude from geolocation of browser

 let response = confirm("Do Want to know weather?");
if (response) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      getWeatherByCoords(latitude, longitude);
    })
  }
}
else {
  alert("To know about the weather you have to accept it");
}

const search__box = document.getElementById("search__box");


// api key of weather app
const api__key = "cc73bf526019f95e0e22b0e85a1d51b0";

search__box.addEventListener("click",()=>{
  var location__input__by__user = document.getElementById("search__bar").value;
  var modified__input__for__using__in__url= location__input__by__user.replace(" ","%20"); 
  getWeatherByLocation(modified__input__for__using__in__url,api__key);
  

})

function getWeatherByLocation(location){
  fetch(`http://api.weatherstack.com/current?access_key=cc73bf526019f95e0e22b0e85a1d51b0&query=${location}`).then(Response=>{
    return Response.json();
  }).then(data=>{
   
    setLocation(data);
  })
}

function getWeatherByCoords(latitude, longitude) {
  fetch(`http://api.weatherstack.com/current?access_key=cc73bf526019f95e0e22b0e85a1d51b0&query=${latitude},${longitude}`)
    .then(Response => {
      return Response.json()
    }).then(data => {
     
      setLocation(data);
    })

}


// Variables from DOM
const location__of__user = document.getElementById("location__of__user");
const date__user = document.getElementById("date__month__year__day");





function setLocation(data) {
  location__of__user.innerHTML = `${data.location.region},<br />${data.location.country}`
  adddate(data);
}




function adddate(data) {
  let currentDate = new Date();
  date__user.innerHTML = `${currentDate.getDate()} ${currentDate.toLocaleString("en-us", { month: "long" })} ${currentDate.getUTCFullYear()} ${currentDate.toLocaleString("en-us", { weekday: "long" })}`

  showTemp(data);

}
//


const realTemp = document.getElementById("realTemp");
function showTemp(data) {
  realTemp.innerHTML = `${data.current.temperature}<sup>o</sup>`
  showApparTemp(data);
}

const apparent__temp = document.getElementById("appar__temp");
function showApparTemp(data) {
  apparent__temp.innerText = `Feels like ${data.current.feelslike}`
  updateTheme(data);
  
}

function showPrimaryIcon(data) {
  const apparTemp = document.getElementById("primary__weather__tittle");
  apparTemp.innerText = `${data.current.weather_descriptions}`;
  showCloudCover(data);
}

const cloudy = document.getElementById("cloudy")
function showCloudCover(data) {

  cloudy.innerText = `${data.current.cloudcover}%`
  showHumidity(data);
}

const humidity = document.getElementById("humidity");
function showHumidity(data) {
  humidity.innerText = `${data.current.humidity}%`
  showWindSpeed(data);
}
const wind__speed = document.getElementById("windSpeed");
function showWindSpeed(data) {
  wind__speed.innerText = `${data.current.wind_speed} km/hr ${data.current.wind_dir}`
 
}




function updateTheme(data) {
  const body = document.querySelector("body");
  primary__icon = document.getElementById("primary__weather__icon__conatainer");
  var is_day = data.current.is_day;

  var weather_code = data.current.weather_code;


  if (is_day == "yes" && weather_code == 113) {
    body.className = "flex__container__column__direction theme--clear--day--mobile";
    primary__icon.innerHTML = `<img class="primary__weather__icon" src="./sun.svg" alt="It is clear now"></img> <h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3> `
    search__box.style.backgroundColor = "var(--clear-searchbox-day-color)"
  }
  else if (weather_code == 116 || weather_code == 119) {
    body.className = "flex__container__column__direction theme--cloudy--day--mobile";
    primary__icon.innerHTML = ` <img class="primary__weather__icon" src="./cloudy.svg" alt="It is cloudy now"></img><h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3> `
    search__box.style.backgroundColor = "var(--cloudy-searchbox-color)"
  }

  else if (weather_code == 122) {
    body.className = "flex__container__column__direction theme--dark--cloud--mobile"
    primary__icon.innerHTML = ` <img class="primary__weather__icon" src="./cloudy.svg" alt="It is cloudy now"></img> <h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3>`
    search__box.style.backgroundColor = "var(--overcloud-searchbox-color)"
  }

  else if (is_day == "yes" && weather_code == (227 || 317  || 323 || 326 || 329 || 332 || 335 || 338 || 350 || 362|| 365|| 368 || 371 || 374 || 377 || 392 || 395)) {
    body.className = "flex__container__column__direction theme--snow--day--mobile "
    primary__icon.innerHTML = ` <img class="primary__weather__icon" src="./snowing.svg" alt="It is snowing now"></img> <h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3>`
    search__box.style.backgroundColor = "var(--snowfall-searchbox-day-color)"
  }

  else if (weather_code == (176 || 263 || 266 || 293 || 296 || 299 || 302 || 305 || 308 || 311 || 314 || 353 || 356 || 359 || 386 || 389 || 392)) {
    body.className = "flex__container__column__direction theme--thunder--mobile "
    primary__icon.innerHTML = `<img class="primary__weather__icon" src="./storm.svg" alt="It is foggy now"></img> <h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3> `
    search__box.style.backgroundColor = "var(--storm-searchbox-color)"
  }


  else if (weather_code == 143) {
    body.className = "flex__container__column__direction theme--mist--mobile "
    primary__icon.innerHTML = ` <img class="primary__weather__icon" src="./fog.svg" alt="It is foggy now"></img> <h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3>`
    search__box.style.backgroundColor = "var(--mist-searchcbox-color)"
  }

  else if (is_day != "yes" && weather_code == 113) {
    body.className = "flex__container__column__direction theme--clear--night--mobile"
    primary__icon.innerHTML = ` <img class="primary__weather__icon" src="./moon.svg" alt="It is clear weather now"></img> <h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3>`
    search__box.style.backgroundColor = "var(--clear-searchbox-night-color)"
  }
  else if (is_day != "yes" && weather_code == (326 || 227 || 317  || 323 || 326 || 329 || 332 || 335 || 338 || 350 || 362|| 365|| 368 || 371 || 374 || 377 || 392 || 395)) {
    body.className = "flex__container__column__direction theme--snow--night--mobile"
    primary__icon.innerHTML = ` <img class="primary__weather__icon" src="./snowing.svg" alt="It is snowing now"></img> <h3 class="primary__weather__tittle" id="primary__weather__tittle">Loading...</h3>`
    search__box.style.backgroundColor = "var(--snowfall-searchbox-night-color)"
  }

 else {
    console.log("none");
  }
  showPrimaryIcon(data);
}