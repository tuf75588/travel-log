import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import MarkerData from "./components/Marker";
const App: React.FC = () => {
  const [viewport, setViewport] = useState<{
    width: number | string;
    height: number | string;
    latitude: any;
    longitude: any;
    zoom: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2
  });
  const [locationData, setLocationData] = useState<any>();
  const [loading, setLoading] = useState(true);
  console.log(locationData);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let response = await fetch("http://localhost:5000/api/logs");
      let data = await response.json();
      setLocationData(data);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <MarkerData data={locationData} />
    </ReactMapGL>
  );
};

export default App;
