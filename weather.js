//interacting with API

const key = "KgI89b1OAQqes3OOYkoyGti5iz9S8TXE";
//get weather information
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
//get city information
const getCity = async (city) => {
  //n point
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  //query always starts with"?"
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
//return promise
getCity("Chicago")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
//we will need key from the object in order to do get weather API CALL

// getWeather("348308");
