import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import listEntries from "./utils/API";
import LogEntryForm from "./components/LogEntryForm";
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
  const [logEntries, setLogEntries] = useState<[]>([]);
  const [showPopup, setShowPopup] = useState<any>({});
  const [addEntryLocation, setAddEntryLocation] = useState<any>(null);
  const showAddMarkerPopup = (event: any) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    });
  };

  const listAllEntries = async () => {
    const response = await listEntries();
    setLogEntries(response);
  };
  useEffect(() => {
    listAllEntries();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={viewport => {
        // call `setState` and use the state to update the map.
        setViewport(viewport);
      }}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry: any) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup((prev: object) => {
                  return {
                    [entry._id]: true
                  };
                })
              }
            >
              <svg
                className="marker yellow"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] && (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              anchor="top"
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  visited on {new Date(entry.createdAt).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <React.Fragment>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            anchor="top"
            onClose={() => setAddEntryLocation(null)}
            closeOnClick={false}
          >
            <div className="popup">
              <LogEntryForm
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                onClose={() => {
                  setAddEntryLocation(null);
                  listAllEntries();
                }}
              />
            </div>
          </Popup>
        </React.Fragment>
      ) : (
        ""
      )}
    </ReactMapGL>
  );
};

export default App;
