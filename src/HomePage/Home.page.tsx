import React from "react";
import useLocationStore from "../Zustand/LocationStore";
import MapComponent from "./Map"; // Ensure this path is correct
import { getElevation, getGeolocate } from "../API/GoogleFunctions";

const HomePage = () => {
  const addLocation = useLocationStore((state) => state.addLocation);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    // Assuming event.latLng is defined and using Date.now() for a simple unique ID
    if (event.latLng) {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      try {
        const elevation = await getElevation(latitude, longitude);
        const name = await getGeolocate(latitude, longitude);
        const id = Date.now(); // Simple unique ID

        addLocation({
          id,
          name,
          latitude,
          longitude,
          elevation,
        });
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <MapComponent onMapClick={handleMapClick} />
      <p>Climate data for the world</p>
    </div>
  );
};

export default HomePage;
