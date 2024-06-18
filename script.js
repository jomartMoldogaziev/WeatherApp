// let btn = document.getElementById('search-btn').addEventListener("click", fetchWeather)
let btn = document.getElementById('search-btn');
btn.addEventListener("click", fetchWeather);

document.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {

}


function fetchWeather() {
    const cityName = document.getElementById('city-input').value
    const API = '5ddf709696587fc2fd10ef236e914abe'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric&lang=ru`



    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ответ от сервера не ок' + response.statusText)
            }
            return response.json();
        })
        .then(data => {
            displayShow(data)
            // console.log(data.name)
            // console.log(data.main.temp)
            // console.log(data.main.feels_like)
            // console.log(data.wind.speed)
            // console.log(data.weather[0].description)
        })
        .catch(error => {
            console.log('Произошла ошибка:' + error)
            document.getElementById('weather-info').innerHTML = '<div class="loader"><span>"Error"</span></div>';
        })
}
const displayShow = (data) => {
    const weatherInfo = document.getElementById('weather-info');
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    const currentTime = new Date().toLocaleTimeString();
    const airPressure = data.main.pressure;

    let cloudy = './cloudy.png'
    let sun = 'sun.png'
    let mainly = 'mainly.png'
    let Rain = 'Rain.png'
    let smallRain = 'small rain.png'
    let partly = './cloudy.png'
    let partly2 = 'partly2.png'
    let description1 = ''

    switch (data.weather[0].description) {
        case 'небольшая облачность':
            description1 = cloudy
            break;
        case 'ясно':
            description1 = sun
            break;
        case 'пасмурно':
            description1 = mainly
            break;
        case 'дождь':
            description1 = Rain
            break;
        case 'небольшой дождь':
            description1 = smallRain
            break;
        case 'облачно с прояснениями':
            description1 = partly
            break;
        case 'переменная облачность':
            description1 = partly2
            break;
        default:
            break;
    }



    weatherInfo.innerHTML = `
    <div class="card" style="width: 22rem;">
  <img class="img" src="${description1}" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${data.name}</h3>
    <h6 class="card-text">${data.weather[0].description}</h6>
    <ul class="list-group list-group-flush">
     <li class="vremia" style="color:red; font-size: 15px"><h6><b>Жергиликтүү убакыт:</b>-</h6>${currentTime}</li>
        <li class="vremia1"><h6>Күндүн чыгышы: -</h6>${sunriseTime}</li>
        <li class="vremia1"><h6>Күндүн батышы:  -</h6>${sunsetTime}</li>
         <li class="list-group-item" style="color:red; font-size: 17px"><h6>Аба басымы:</h6>${airPressure} hPa</li>
    </ul>

  <ul class="list-group list-group-flush">
    <li class="list-group-item" style="color:red; font-size: 17px"><h6>Температура:</h6>${data.main.temp}°C</li>
    <li class="list-group-item" style="color:red; font-size: 17px"><h6>Сезилүү температурасы:</h6>${data.main.feels_like}°C</li>
    <li class="list-group-item" style="color:red; font-size: 17px"><h6>Шамалдын ылдамдыгы:</h6>${data.wind.speed}м/с</li>

  </ul>
  <div class="card-body">
    <a href="https://www.gismeteo.ru/" class="card-link">Толугураак маалымат</a>
  </div>
</div>
    `

}