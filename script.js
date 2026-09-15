const weatherApi = {
    key: "3e050b0230b775f114a1ed1d9812d41b",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};
const txtInput = document.getElementById("input-box");
const btnWeather = document.getElementById("button");
const hTemp = document.getElementById("temp");
const hCity = document.getElementById("city");


const divWeatherBody = document.getElementById("weather-body");
const divErrorMessage = document.getElementById("error-message");
const pDate = document.getElementById("date");


const pMinMax = document.getElementById("min-max");
const pWeather = document.getElementById("weather");

const pHumidity = document.getElementById("humidity");
const pWind = document.getElementById("wind");
const pPressure= document.getElementById("pressure");

txtInput.addEventListener("keypress" ,async (event)=>{
    if(event.key==="Enter"){
        await getweatherReport(event.target.value);
    }
})
btnWeather.addEventListener("click" ,async (enter)=>{
  await getweatherReport(txtInput.value);
})

async function getweatherReport(city){
    try{
        const response= await fetch(
            `${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
        ); const data= await response.json();
        if(!response.ok){
            throw new Error("City not found!");
        }
        
        showWeatherReport(data);
        divWeatherBody.classList.remove("d-none");
        divErrorMessage.classList.add("d-none");
    }catch(error){
        console.log(`error:${error}`)
        divWeatherBody.classList.add("d-none");
        divErrorMessage.classList.remove("d-none");
        clearWeatherDisplay();

    }
}
function showWeatherReport(weather){
hCity.innerText=`${weather.name},${weather.sys.country}`;
pDate.innerText= formatDate(new Date());
hTemp.innerHTML= `${Math.round(weather.main.temp)}&deg;C`;
pMinMax.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C(min)/${Math.ceil(weather.main.temp_max)}&deg;C(max)`;
pWeather.innerText=`${weather.weather[0].main}`;
pHumidity.innerText=`${weather.main.humidity}`;
pWind.innerText = `${weather.wind.speed} kmph`;
pPressure.innerText = `${weather.main.pressure} hPa`;
updateBackground(weather.weather[0].main);
}

function formatDate(date) {
    const obj = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString(undefined, obj);
}
function updateBackground(weatherType){
const background = {
    Clear:"images/clear.jpeg",
    Clouds:"images/clouds.jpeg",
    Haze:"images/clouds.jpeg",
    Rain:"images/rain.jpeg",
    Thunderstorm:"images/thunder.jpeg",
    Sunny:"images/sunny.jpeg",
    Snow:"images/snow.jpeg"
};
document.body.style.backgroundImage =`url(${background[weatherType]|| "images/clear.jpeg"})`;
}
function clearWeatherDisplay(){
hCity.innerText ="";
pDate.innerText="";
hTemp.innerText="";
pMinMax.innerText="";
pHumidity.innerText="";
pWind.innerText="";
pPressure.innerText="";
}