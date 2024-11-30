import logo from './logo.svg';
import React from "react";
import Heatmap from "./components/Heatmap";
import data from "./processed_spotify_2024_fixed.json";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Heatmap data={data} />
    </div>
  );
}

export default App;

