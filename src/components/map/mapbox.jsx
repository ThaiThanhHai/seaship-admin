import React, { useState } from "react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useEffect } from "react";

const Mapbox = ({ address }) => {
  const [coordinates, setCoordinates] = useState([[105.787629, 10.036513]]);
  const [waypoints, setWaypoints] = useState([]);

  const pasreEncodeURI = (address) => {
    const newAddress = address.map((data) => {
      return `${data.lng}%2C${data.lat}`;
    });
    return newAddress.join("%3B");
  };

  const getDirections = async () => {
    try {
      const coordinates = pasreEncodeURI(address);
      const result = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${coordinates}?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoidGhhaXRoYW5oaGFpIiwiYSI6ImNsOGVwZ2s0bjBpdWQzdnA5c3U5NmVoM3IifQ.h7reW0CjFKe-waithRjc0g`
      );
      setWaypoints(result.data.waypoints);
      setCoordinates(result.data.routes[0].geometry.coordinates);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDirections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoidGhhaXRoYW5oaGFpIiwiYSI6ImNsOGVwZ2s0bjBpdWQzdnA5c3U5NmVoM3IifQ.h7reW0CjFKe-waithRjc0g"
      initialViewState={{
        longitude: coordinates[0][0],
        latitude: coordinates[0][1],
        zoom: 11,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {waypoints &&
        waypoints.map((waypoint, index) => {
          return (
            <Marker
              key={index}
              longitude={waypoint.location[0]}
              latitude={waypoint.location[1]}
              color="blue"
            />
          );
        })}
      <NavigationControl position="bottom-left" />
      <Source
        id="polylineLayer"
        type="geojson"
        data={{
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        }}
      >
        <Layer
          id="lineLayer"
          type="line"
          source="my-data"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "#007041",
            "line-width": 5,
          }}
        />
      </Source>
    </Map>
  );
};

export default Mapbox;
