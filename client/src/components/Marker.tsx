import React from "react";
import { Marker } from "react-map-gl";

type dataProps = {
  data: {
    title: string;
    longitude: number;
    key: string;
    latitude: number;
  }[];
};

type cityProps = {
  title: string;
  longitude: number;
  key: string;
  latitude: number;
}[];
const MarkerData = (props: dataProps) => {
  return props.data.map(city => {
    return (
      <Marker
        key={props.city.title}
        longitude={props.city.longitude}
        latitude={props.city.latitude}
      >
        <p>you are here!</p>
      </Marker>
    );
  });
};

export default MarkerData;
