import React, { useState } from "react";

import ReactLoading from "react-loading";

import api from "./services/api";

import "./App.css";

function App() {
  const [planet, setPlanet] = useState("");
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  async function loadPlanet() {
    try {
      const response = await api.get(`/${getRndInt(1, 69)}`);
      setLoading(false);
      setPlanet(response.data);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrorMessage("Something went wrong, please try again later");
    }
  }

  return (
    <div className="card__before">
      {planet ? (
        <div className="card__after">
          <h1 className="card__title">{planet.name}</h1>
          <div className="card__content">
            <h3>Population: {planet.population}</h3>
            <h3>Climate: {planet.climate}</h3>
            <h3>Terrain: {planet.terrain}</h3>
            <h5>Featured in {planet.films.length} films</h5>
          </div>
        </div>
      ) : (
        <h1 className="planet-generator">
          Click the button to get a random planet
        </h1>
      )}
      {loading ? (
        <button className="card__button disabled" disabled>
          Next
        </button>
      ) : (
        <button
          className="card__button"
          onClick={() => {
            setLoading(true);
            loadPlanet();
            setErrorMessage("");
          }}
        >
          {planet ? "Next" : "Get planet"}
        </button>
      )}
      {loading ? (
        <ReactLoading type="bars" color="red" height={20} width={40} />
      ) : null}
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </div>
  );
}
export default App;
