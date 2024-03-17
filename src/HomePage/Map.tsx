// MapComponent.js
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import useLocationStore from "../Zustand/LocationStore"; // Adjust the path as necessary

const center = {
  lat: 34.397,
  lng: -100.644,
};

const options = {
  mapTypeId: "terrain",
  streetViewControl: false, // Disable Street View
  fullscreenControl: false, // Disable fullscreen button
  mapTypeControl: false, // Disable map type control
  zoomControl: true, // Enable zoom control

  maxZoom: 14, // Set the maximum zoom level
  minZoom: 3, // Set the minimum zoom level
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      east: 180,
      west: -180,
    },

    strictBounds: true,
  },
};

interface MapComponentProps {
  onMapClick: (e: google.maps.MapMouseEvent) => void;
  mapContainerStyle?: React.CSSProperties;
}

const MapComponent = ({ onMapClick, mapContainerStyle }: MapComponentProps) => {
  const locations = useLocationStore((state) => state.locations);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={center}
      options={options}
      onClick={onMapClick}
    >
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.latitude, lng: location.longitude }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapComponent;
