import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const App: React.FC = () => {
  const [viewport, setViewport] = useState<{
    width: number | string;
    height: number | string;
    latitude: number;
    longitude: number;

    zoom: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 31.9742044,
    longitude: -49.25875,
    zoom: 2
  });
  const [locationData, setLocationData] = useState<any>();
  console.log(locationData);
  type CityProps = {
    longitude: number;
    latitude: number;
    key: string;
    title: string;
  };
  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://localhost:5000/api/logs");
      let data = await response.json();
      setLocationData(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        ...viewport,
        height: window.innerHeight,
        width: window.innerWidth
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={viewport => {
        // call `setState` and use the state to update the map.
        setViewport(viewport);
      }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {locationData === undefined ? (
        <h1>HELLO</h1>
      ) : (
        locationData.map((city: any) => {
          return (
            <Marker
              latitude={city.latitude}
              longitude={city.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <span
                role="img"
                aria-label="map marker emoji"
                style={{ fontSize: `${viewport.zoom * 0.2}rem` }}
              >
                📷
              </span>
            </Marker>
          );
        })
      )}
    </ReactMapGL>
  );
};

export default App;
