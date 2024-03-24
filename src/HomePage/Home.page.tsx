import React, { useEffect } from "react";
import useLocationStore from "../Zustand/LocationStore";
import MapComponent from "./Map"; // Ensure this path is correct
import { getElevation, getGeolocate } from "../API/GoogleFunctions";
import Container from "../Components/Container";
import { Box } from "@mui/system";

import RouteDropdown from "../Components/RouteDropdown";
import LocationsList from "../Components/LocationsList";
import { API_URL } from "../exports";
import { fetchClimateData } from "../API/DatabaseFunctions";
import { useNewLocation } from "../Utility/LocationHook";

const HomePage = () => {
  const { locations, removeLocation, addLocation } = useLocationStore();
  const addNewLocation = useNewLocation();

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      addNewLocation(
        parseFloat(event.latLng.lat().toFixed(4)),
        parseFloat(event.latLng.lng().toFixed(4))
      );
    }
  };

  return (
    <Container>
      <RouteDropdown defaultOption={"Home"} />

      <Box sx={{ height: "80%" }}>
        <MapComponent
          onMapClick={handleMapClick}
          mapContainerStyle={{
            height: "70vh",
            width: "100%",
          }}
        />
      </Box>

      <LocationsList />
    </Container>
  );
};

export default HomePage;
