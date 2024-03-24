import React, { useEffect, useState } from "react";
import Container from "../Components/Container";
import RouteDropdown from "../Components/RouteDropdown";
import LocationsList from "../Components/LocationsList";
import ClimateDataList from "../Components/ClimateDataList";
import { Box } from "@mui/system";

import TemperatureIcon from "@mui/icons-material/Thermostat";
import ComfortIcon from "@mui/icons-material/ThermostatAuto";
import HumidityIcon from "@mui/icons-material/WaterDrop";

import RainIcon from "@mui/icons-material/Grain";
import SnowIcon from "@mui/icons-material/AcUnit";
import SunIcon from "@mui/icons-material/WbSunny";
import WindIcon from "@mui/icons-material/Air";
import useLocationStore from "../Zustand/LocationStore";
import TemperatureChart from "./TemperatureChart";

interface AggregatedData {
  [key: string]: number[];
}

const AveragePage = () => {
  const { locations } = useLocationStore();

  const aggregateVisibleLocationData = (fields: string[]) => {
    const aggregatedData: {}[] = [];

    locations.forEach((location) => {
      if (location.visible) {
        // Initialize an object to store the daily data for the current visible location
        const locationData: { [key: string]: any } = {};

        fields.forEach((field) => {
          // Extract the 'daily' data for the current field
          const dailyData = location.average_data[field]?.daily;

          // Add this data to the locationData object under the field name
          locationData[field] = dailyData;
        });

        // Add the populated locationData object to the aggregatedData array
        aggregatedData.push(locationData);
      }
    });

    return aggregatedData;
  };

  // const dataTypeOptions = [
  //   { label: "Temperature", value: "temperature", Icon: TemperatureIcon },
  //   { label: "Rain", value: "rain", Icon: RainIcon },
  //   { label: "Snow", value: "snow", Icon: SnowIcon },
  //   { label: "Sun", value: "sun", Icon: SunIcon },
  //   { label: "Humidity", value: "humidity", Icon: HumidityIcon },
  //   { label: "Comfort", value: "comfort", Icon: ComfortIcon },
  // ];

  const dataTypeOptions = [
    { label: "Temperature", value: "temperature" },
    { label: "Rain", value: "rain" },
    { label: "Snow", value: "snow" },
    { label: "Sun", value: "sun" },
    { label: "Humidity", value: "humidity" },
    { label: "Comfort", value: "comfort" },
  ];

  const handleDataTypeSelect = (value: string) => {
    // Handle the selection of data type here
    // This could involve fetching data or updating the UI to show the selected type's data
    console.log("Selected data type:", value);
  };

  const aggregatedData = aggregateVisibleLocationData([
    "high_temperature",
    "low_temperature",
    "apparent_high_temperature",
    "apparent_low_temperature",
    "expected_max",
    "expected_min",
  ]);

  useEffect(() => {
    console.log("Aggregated data: ", aggregatedData);
  }, [aggregatedData, locations]);

  return (
    <Container>
      <RouteDropdown defaultOption={"Average"} />

      <ClimateDataList
        options={dataTypeOptions}
        onSelect={handleDataTypeSelect}
      />
      <Box sx={{ height: "75%" }}>
        <TemperatureChart aggregatedData={aggregatedData} />
      </Box>

      <LocationsList />
    </Container>
  );
};

export default AveragePage;
