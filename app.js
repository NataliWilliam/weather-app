//DOM MANIPULATION
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const updateUI = (data) => {
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // destructure propetties - get properties from the object and store them in const
  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `  
  <h5 class="font-size p-padding">${cityDets.EnglishName}</h5>
  <div class="cond font-size p-padding p-top">${weather.WeatherText}</div>
  <span class="font-size p-padding">${weather.Temperature.Metric.Value}</span>
  <span class="font-size">&deg;C</span>
`;

  //update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.isDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }
  time.setAttribute("src", timeSrc);
  // remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  // object shorthand notation - when the property name is the same like value name we can write like this
  // return {cityDets, weather };

  return {
    cityDets: cityDets,
    weather: weather,
  };
};
cityForm.addEventListener("submit", (e) => {
  //prevent default action (will not refresh the page )
  e.preventDefault();
  //get city value
  const city = cityForm.city.value.trim();
  //clear the form field
  cityForm.reset();
  //update the ui with the new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
