import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import iconLocation from "../src/assets/location_on-.svg";
import iconSpeed from "../src/assets/wind.svg";
import iconClouds from "../src/assets/clouds.svg"
import iconPressure from "../src/assets/pressure.svg";

import Loader from "./components/Loader";

function App() {
  const [weather, setWeather] = useState({});
  const [isCentigrade, setIsCentigrade] = useState(true);
  const changeValue = () => {
    setIsCentigrade(!isCentigrade);
  };
  
  useEffect(() => {
    changeLoader();
    const options = {
      enableHighAccuracy: true,
      // timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const success = (pos) => {

      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const apiKey = "079ccfbd6363e20a061038552b2361b8";

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        )
        .then((res) => setWeather(res.data))
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  // setTimeout(() => {
  // }, 1000)
  console.log("info de la API", weather);


    // inicio cambio de background dependiendo el estado
  let datosDe = weather.weather?.[0].description;
  let fog_ = 'fog';
 
  function fondo (datos) {
    if(datos === fog_) {
      document.body.classList.add("body-change")
    }
    if(datos === 'scattered clouds') {
      document.body.classList.add("body-scattered-clouds")
    }
    // datos === datos_ ?  document.body.classList.add("body-change") : document.body.classList.add("body-change2")
    // document.body.classList.add("body-change");
    // console.log(`"${datos}" "${scattered}"`);
  }
  fondo(datosDe);  
   // final cambio de background dependiendo el estado



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
        <h3 className="h3-location">
          <img className="icon" src={iconLocation} alt="" />
          {weather.sys?.country} {weather.name}
        </h3>
        <div className="card">
          <div className="img-weather">
            <img
              className="img-img-weather"
              src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <p className="p-temperature"><b>Temperature:</b></p>
            <p className="p-value"><b>
              {isCentigrade
                ? Math.round(weather.main?.temp - 273.15) + "°C"
                : Math.round(((weather.main?.temp - 273.15) * 9) / 5 + 32) +
                  "°F"}
            </b></p>
          </div>
          <div className="description-weather">
            <p>" {weather.weather?.[0].description} "</p>
            <p>
              <img className="icon-wind" src={iconSpeed} alt="" />
              Wind Speed: {weather.wind?.speed}
            </p>
            <p>
              <img className="icon-wind" src={iconClouds} alt="" />
              Clouds: {weather.clouds?.all}%</p>
            <p>
              <img className="icon-wind" src={iconPressure} alt="" />
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
