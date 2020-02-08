import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import listEntries from "./utils/API";
const App: React.FC = () => {
  const [viewport, setViewport] = useState<{
    width: number | string;
    height: number | string;
    latitude: number;
    longitude: number;

    zoom: number;
  }>({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });
  const [logEntries, setLogEntries] = useState<any>([]);

  useEffect(() => {
    listEntries().then(locationData => {
      setLogEntries(locationData);
    });
  }, []);

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
      {logEntries.map((entry: any) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            📷
          </Marker>
        </React.Fragment>
      ))}
    </ReactMapGL>
  );
};

export default App;
