import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [degrees, setDegrees] = useState({});
  const buttonDegrees = () => {
    alert("falta agregar funcionalidad")
  }

  useEffect(() => {
    const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
   };
   
    const success = (pos) => {
      // const crd = pos.coords;

      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const apiKey = "079ccfbd6363e20a061038552b2361b8";
      // const lang = "sp, es"
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        )
        .then((res) => setWeather(res.data))
        .catch((err) => console.log("fallo"));

        console.log(`Log de URL ${`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`}`);
    };
  
    navigator.geolocation.getCurrentPosition(success, Option);
  }, []);
  // setTimeout(() => {
  // }, 1000)
  console.log('info de la API', weather);

  return (
    <div className="App">
      <h1>Weather app</h1>
      <h3>{weather.sys?.country} {weather.name}</h3>
      <div className="card">
        <div className="img-weather">
      <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
      <p>Temperatura</p>
      <p>{weather.main?.temp}</p>
        </div>
        <div className="description-weather">
      <p>"{weather.weather?.[0].description}"</p>
      <p>Wind Speed: {weather.wind?.speed}</p>
      <p>Clouds: {weather.clouds?.all}%</p>
      <p>Pressure: {weather.main?.pressure} mb</p>
     </div>
        
      </div>
        <button onClick={buttonDegrees}>Grados</button>
    </div>
  );
}

export default App;
