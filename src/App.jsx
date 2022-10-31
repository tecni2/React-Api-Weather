import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import image from "../src/assets/pressue.svg";
import image2 from "../src/assets/wind.svg";
import icon from "../src/assets/location_on-.svg"

import Loader from "./components/Loader";

function App() {
  const [weather, setWeather] = useState({});
  const [isCentigrade, setIsCentigrade] = useState(true);
  const changeValue = () => {
    // alert("falta agregar funcionalidad")
    setIsCentigrade(!isCentigrade);
    console.log("Cambie a", isCentigrade);
  };

  useEffect(() => {
    changeLoader();

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
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
    };

    navigator.geolocation.getCurrentPosition(success, Option);
  }, []);
  // setTimeout(() => {
  // }, 1000)
  console.log("info de la API", weather);

  const [load, setLoad] = useState(true);
  const changeLoader = () => {
    setTimeout(() => {
      setLoad(false);
    }, 5000);
  };

  if (load) {
    return (
        <Loader />
    );
  } else {
    return (
      <div className="App">
        <h1>Weather app</h1>
        <h3>
          <img className="icon" src={icon} alt="" />
          {weather.sys?.country} {weather.name}
        </h3>
        <div className="card">
          <div className="img-weather">
            <img
              className="img-img-weather"
              src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <p>Temperatura</p>
            <p>
              {isCentigrade
                ? Math.round(weather.main?.temp - 273.15) + "°C"
                : Math.round(((weather.main?.temp - 273.15) * 9) / 5 + 32) +
                  "°F"}
            </p>
          </div>
          <div className="description-weather">
            <p>"{weather.weather?.[0].description}"</p>
            <p>
              <img className="icon-wind" src={image2} alt="" />
              Wind Speed: {weather.wind?.speed}
            </p>
            <p>Clouds: {weather.clouds?.all}%</p>
            <p>
              <img className="icon-wind" src={image} alt="" />
              Pressure: {weather.main?.pressure} mb
            </p>
          </div>
        </div>
        <button onClick={changeValue}>
          {isCentigrade ? "Change to °F" : "Change to °C"}
        </button>
      </div>
    );
  }
}

export default App;
