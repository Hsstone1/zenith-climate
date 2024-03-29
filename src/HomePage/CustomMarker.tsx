import React, { useEffect, useRef } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { Location } from "../exports";

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
  onClick: (location: Location) => void;
  location: Location;
}

const CustomMarker = ({ position, onClick, location }: CustomMarkerProps) => {
  const map = useGoogleMap(); // Assuming you're within a <GoogleMap> context

  // Specify the type of the ref as google.maps.Marker or null (initially null)
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create the marker
    const marker = new google.maps.Marker({
      position,
      map,
    });

    marker.addListener("click", () => onClick(location));

    // Store the marker in the ref
    markerRef.current = marker;

    // Cleanup function to remove the marker when the component unmounts
    return () => {
      marker.setMap(null);
    };
  }, [map, position, onClick, location]);

  return null;
};

export default CustomMarker;
