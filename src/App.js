import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Ciudad, setCiudad] = useState("Chiclayo");
  const [inputText, setInputText] = useState("Chiclayo");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [carga, setCarga] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${Ciudad}&appid=e0b1d42fd914027e6f761a71f32eff01&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error("Algo salió mal");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setCarga(false));
  }, [Ciudad, error]);

  const Buscador = (e) => {
    if (e.key === "Enter") {
      setCiudad(e.target.value);
      setInputText("");
    }
  };

  return (
    
    <div className="bg_img">
      {!carga ? (
        <>

        <div className="detallesciudad">
        <TextField
            variant="filled"
            label="Buscar lugar"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={Buscador}
          />
          <h1 className="ciudad">{data.name}</h1>
          <div className="grupoicono">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
            <h1>{data.weather[0].main}</h1>
          </div>

          <h1 className="temp">{data.main.temp.toFixed()} °C</h1>
        </div>
          <div className="detalles" timeout={800} in={!carga}>
            <div className="box_container">
              <div className="box">
                <p>Humedad</p>
                <h1>{data.main.humidity.toFixed()}%</h1>
              </div>

              <div className="box">
                <p>Viento</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>

              <div className="box">
                <p>Se siente</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
