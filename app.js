const container = document.querySelector(".container");
const weather = document.querySelector(".weather");
const error = document.querySelector(".in-image");
const detalis = document.querySelector(".detalis");
const btn = document.querySelector(".submit");

btn.addEventListener("click", (e) => {
  const city = document.querySelector(".search input").value;
  const api_key = "cea0103d2f8c19ea9202b967bebbc26e";
  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "600px";
        weather.style.display = "none";
        detalis.style.display = "none";
        error.style.display = "block";
        error.classList.add("fade");
        return;
      }
      error.style.display = "none";
      error.classList.remove("fade");

      const img = document.querySelector(".weather img");
      const temperature = document.querySelector(".weather .celsius");
      const description = document.querySelector(".weather .description");
      const humidity = document.querySelector(".humidity-container .humidity");
      const wind = document.querySelector(".wind-container .wind");

      switch (data.weather[0].main) {
        case "Clear":
          img.src = "./images/sun.png";
          break;
        case "Rain":
          img.src = "./images/storm.png";
          break;
        case "Snow":
          img.src = "./images/snow.png";
          break;
        case "Clouds":
          img.src = "./images/cloudy.png";
          break;
        case "Haze":
          img.src = "./images/haze.png";
          break;

        default:
          Image.src = "";
      }

      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

      weather.style.display = "";
      detalis.style.display = "";
      weather.classList.add("fade");
      detalis.classList.add("fade");
      container.style.height = "600px";
    });
});
