import React from "react";
import useLocationStore from "../Zustand/LocationStore";
import MapComponent from "./Map"; // Ensure this path is correct
import { getElevation, getGeolocate } from "../API/GoogleFunctions";
import Container from "../Components/Container";
import RouteDropdown from "../Components/TypeDropdown";
import LocationsList from "../Components/LocationsList";

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
        const id = "ID" + Date.now(); // Simple unique ID

        addLocation({
          id,
          name,
          visible: true,
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
    <Container>
      <RouteDropdown defaultOption={"Home"} />

      <MapComponent
        onMapClick={handleMapClick}
        mapContainerStyle={{
          height: "70vh",
          width: "100%",
        }}
      />
      <LocationsList />
    </Container>
  );
};

export default HomePage;
