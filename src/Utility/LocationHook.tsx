import { fetchClimateData } from "../API/DatabaseFunctions";
import { getElevation, getGeolocate } from "../API/GoogleFunctions";
import useLocationStore from "../Zustand/LocationStore";

export const useNewLocation = () => {
  const { locations, removeLocation, addLocation } = useLocationStore();

  const addNewLocation = async (latitude: number, longitude: number) => {
    // Assuming event.latLng is defined and using Date.now() for a simple unique ID
    const id = "ID" + Date.now();
    const tempId = `${id}_temp`; // Temporary ID with suffix

    //Adds a temporary location to the store while fetching data
    addLocation({
      id: tempId,
      name: `${latitude}, ${longitude}`, // Temporary placeholder name
      visible: false,
      latitude,
      longitude,
      elevation: 0, // Initially empty or null
      average_data: {}, // Initially empty
      koppen: "", // Initially empty
      hardiness: "", // Initially empty
      isLoading: true, // Initially loading
    });
    try {
      const elevation = await getElevation(latitude, longitude);
      const name = await getGeolocate(latitude, longitude);
      const data = await fetchClimateData(latitude, longitude, elevation);
      const { climate_data, location_data } = data;

      addLocation({
        id,
        name,
        visible: true,
        latitude,
        longitude,
        elevation,
        average_data: climate_data,
        koppen: location_data.koppen,
        hardiness: location_data.plant_hardiness,
        isLoading: false, // Set isLoading to false
      });
      removeLocation(tempId); // Remove the temporary location
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };
  return addNewLocation;
};
