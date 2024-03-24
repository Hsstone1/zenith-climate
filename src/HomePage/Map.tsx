// MapComponent.js
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
// import { CircularProgress, IconButton } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";
// import DeleteIcon from "@mui/icons-material/Delete";
import useLocationStore from "../Zustand/LocationStore"; // Adjust the path as necessary
import useGeneralStore from "../Zustand/GeneralStore";
import CustomMarker from "./CustomMarker"; // Import the 'CustomMarker' component from the appropriate module

import { Location } from "../exports";
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
  const { mapInstance, setMapInstance } = useGeneralStore();

  const { locations, removeLocation, setSelectedLocation } = useLocationStore();
  const { isSidebarOpen, setIsSidebarOpen } = useGeneralStore();

  const handleMarkerClicked = (location: Location) => {
    console.log("Marker clicked");
    setSelectedLocation(location);
    setIsSidebarOpen(true);
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={(map) => setMapInstance(map)}
    >
      {locations.map((location) => (
        <CustomMarker
          key={location.id}
          position={{ lat: location.latitude, lng: location.longitude }}
          onClick={() => handleMarkerClicked(location)} // Pass the location to the click handler
          location={location} // Provide the location data to the CustomMarker
        />
      ))}
    </GoogleMap>
  );
};

export default MapComponent;
