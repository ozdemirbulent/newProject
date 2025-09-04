const ApiKey = "ece77d73e31dc2f2d0f3ace477f2d5fc";
const form = document.querySelector("form");
const input = document.getElementById("city");
const weatherDiv = document.getElementById("Weather");
const icon = document.getElementById("icon");
const temperature = document.getElementById("temperature");
const details = document.getElementById("details");
const description = document.getElementById("description");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = input.value;
  getWeather(cityValue);
});

async function getWeather(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${ApiKey}&lang=tr&units=metric`
    );

    const data = await response.json();
    const tempValue = Math.round(data.main.temp);
    const iconCode = data.weather[0].icon;
    console.log(data);
    const detailsArr = [
      `Hissedilen: ${Math.round(data.main.feels_like)}°C`,
      `Nem Oranı: ${data.main.humidity}%`,
      `Rüzgar: ${data.wind.speed} m/s`,
    ];

    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`;
    temperature.textContent = `${tempValue}°C`;
    let detailsNew = detailsArr.map((item) => `<div>${item}</div>`);
    details.innerHTML = detailsNew.join("");
    description.textContent = data.weather[0].description;
  } catch (error) {
    if (input.value === "") {
      temperature.textContent = "";
      icon.innerHTML = "";
      description.textContent = "Lütfen bir şehir giriniz.";
      details.innerHTML = "";
    }
    temperature.textContent = "";
    icon.innerHTML = "";
    description.textContent = "Lütfen geçerli bir konum  giriniz.";
    details.innerHTML = "";
  }
}

const temaDegistir = document.getElementById("theme-toggle");
temaDegistir.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    temaDegistir.textContent = "koyu Tema";
  } else {
    temaDegistir.textContent = "açık Tema";
  }
});
