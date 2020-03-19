const GetForecastData = async (city) => {
    let uri ="http://api.openweathermap.org/data/2.5/forecast";
    let query = `?q=${city}`;
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


export default GetForecastData;