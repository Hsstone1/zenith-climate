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

// This function returns the position for the OverlayView
const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height + 64), // Adjust if necessary to position correctly above the marker
});

interface MapComponentProps {
  onMapClick: (e: google.maps.MapMouseEvent) => void;
  mapContainerStyle?: React.CSSProperties;
}

const MapComponent = ({ onMapClick, mapContainerStyle }: MapComponentProps) => {
  const { mapInstance, setMapInstance } = useGeneralStore();

  const { locations, removeLocation, setSelectedLocation } = useLocationStore();
  const { isSidebarOpen, setIsSidebarOpen } = useGeneralStore();

  const handleInfoButtonClick = (e: any, location: Location) => {
    e.stopPropagation(); // Prevent event from bubbling up to the map
    setSelectedLocation(location);
    setIsSidebarOpen(true);
  };

  const handleDeteleButtonClick = (e: any, location: Location) => {
    e.stopPropagation(); // Prevent event from bubbling up to the map
    removeLocation(location.id);
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
          onClick={() => console.log("Marker clicked!")}
        />
      ))}

      {/* {locations.map((location) => (
        <>
          <Marker
            key={location.id}
            position={{ lat: location.latitude, lng: location.longitude }}
            // This hides the default marker if isLoading is true
            visible={false}
          />
          {location.isLoading ? (
            <OverlayView
              position={{ lat: location.latitude, lng: location.longitude }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <div
                style={{
                  background: "white",
                  padding: "6px",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100px",
                  minWidth: "100px",
                }}
              >
                <CircularProgress size={20} />
                <span>{location.name}</span>
              </div>
            </OverlayView>
          ) : (
            <OverlayView
              position={{ lat: location.latitude, lng: location.longitude }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <div
                style={{
                  background: "white",
                  padding: "6px",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px",
                  minWidth: "100px",
                }}
              >
                <span>{location.name}</span>
                <div>
                  <IconButton
                    aria-label="info"
                    size="small"
                    onClick={(e) => handleInfoButtonClick(e, location)}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={(e) => handleDeteleButtonClick(e, location)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </OverlayView>
          )}
        </>
      ))} */}
    </GoogleMap>
  );
};

export default MapComponent;
