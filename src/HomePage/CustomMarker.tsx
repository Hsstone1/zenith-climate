import React, { useEffect, useRef } from "react";
import { useGoogleMap } from "@react-google-maps/api";

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
  onClick: () => void;
}

const CustomMarker = ({ position, onClick }: CustomMarkerProps) => {
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

    marker.addListener("click", onClick);

    // Store the marker in the ref
    markerRef.current = marker;

    // Cleanup function to remove the marker when the component unmounts
    return () => {
      marker.setMap(null);
    };
  }, [map, position, onClick]);

  // This component doesn't render anything itself
  return null;
};

export default CustomMarker;
