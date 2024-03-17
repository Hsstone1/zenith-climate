import { API_URL } from "../exports";

// In your API/ClimateDataFunctions.js (or a similar file)
export const fetchClimateData = async (latitude: any, longitude: any, elevation: any) => {
    try {
      const response = await fetch(API_URL + "/climate_data_db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
          elevation,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      const data = await response.json();
      return data; // Return the JSON data directly
    } catch (error) {
      console.error("Error fetching climate data:", error);
      throw error; // Re-throw the error if you want to handle it later
    }
  };
  