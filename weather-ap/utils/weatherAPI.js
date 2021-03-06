const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=6239b7a5e9e5158e36e907023a265ae3';

export const fetchWeather = (lat, lon) => {
    const url = rootUrl + '&lat=' + lat + '&lon=' + lon + '&units=metric';
    console.log(url);

    return fetch(url)
        .then(res => res.json())
        .then(json => ({
            temp: json.main.temp,
            weather: json.weather[0].main,
        }));
};
