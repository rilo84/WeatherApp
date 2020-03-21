const GetWeatherData = async (city,cord=false) => {
  let uri ="https://api.openweathermap.org/data/2.5/weather";
  let query;
  if(cord === true){
    query = `?${city}`;
  }
  else{
    query = `?q=${city}`;
  }
  let units="&units=metric";
  let lang = "&lang=se";
  let key = "&appid=f7878e843959cc9a619f5cb2b84f21c4";

  let data;

  await fetch(`${uri}${query}${units}${lang}${key}`)
  .then(res => {
    data = res.json();
  });

  return data;
};

export default GetWeatherData;
