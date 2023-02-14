const app = document.querySelector(".container");
const temp = document.querySelector(".temp");
const timeOutput = document.querySelector(".time");
const dateOutput = document.querySelector(".date");
const condition = document.querySelector(".condition");
const nameOutput = document.querySelector(".city-name");
const icon = document.querySelector(".icon");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const windIcon = document.querySelector(".wind-icon");
const humidityIcon = document.querySelector(".humidity-icon");

let cityInput = "London";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.length == 0) {
    alert("Inserisci una città");
  } else {
    cityInput = search.value;
  }

  weatherFetch();
  search.value = "";
});

function weekDate(day, month, year) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date(`${day}/${month}/${year}`).getDay()];
}

// fetch
function weatherFetch() {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=e50aa2d009c6434e940150224231402&q=${cityInput}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = data.current.temp_c + "&#176;";
      condition.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const year = parseInt(date.substr(0, 4));
      const month = parseInt(date.substr(5, 2));
      const day = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${weekDate(
        day,
        month,
        year
      )} ${day}, ${month} ${year}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );

      icon.src = "./assets/icons/" + iconId;

      humidity.innerHTML = data.current.humidity + "%";
      wind.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";
      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        btn.style.color = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.background = "linear-gradient(180deg, #28e2ce, #4be2e3)";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.background = "linear-gradient(180deg, #5be4fe, #58c8f7)";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else {
        app.style.background = "linear-gradient(180deg, #e4e5ea, #c8d3e7)";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
    })
    .catch(() => {
      alert("Città non trovata, riprova");
    });
}
