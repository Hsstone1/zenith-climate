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
import LocationColorsList from "./VisibleLocationColors";
import PrecipChart from "./PrecipChart";

interface AggregatedData {
  [key: string]: number[];
}

const AveragePage = () => {
  const { locations } = useLocationStore();
  const [selectedChart, setSelectedChart] = useState("temperature");

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
    setSelectedChart(value);
  };

  const temperatureAggregatedData = aggregateVisibleLocationData([
    "high_temperature",
    "low_temperature",
    "apparent_high_temperature",
    "apparent_low_temperature",
    "expected_max",
    "expected_min",
  ]);

  const rainAggregatedData = aggregateVisibleLocationData([
    "precipitation",
    "precip_days",
  ]);

  const snowAggregatedData = aggregateVisibleLocationData([
    "snow",
    "snow_days",
  ]);

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "temperature":
        return <TemperatureChart aggregatedData={temperatureAggregatedData} />;
      case "rain":
        return <PrecipChart aggregatedData={rainAggregatedData} type="Rain" />;
      case "snow":
        return <PrecipChart aggregatedData={snowAggregatedData} type="Snow" />;
      // Add cases for other data types as necessary
      default:
        return <TemperatureChart aggregatedData={temperatureAggregatedData} />; // Default case if needed
    }
  };

  return (
    <Container>
      <RouteDropdown defaultOption={"Average"} />

      <ClimateDataList
        options={dataTypeOptions}
        onSelect={handleDataTypeSelect}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Ensures spaced layout
          height: "75%", // Adjust this value based on your actual header/navigation height
          overflow: "hidden", // Prevents children from overflowing
        }}
      >
        <Box sx={{ flexGrow: 0, flexShrink: 0, m: 1 }}>
          <LocationColorsList />
        </Box>
        <Box sx={{ flexGrow: 1, flexShrink: 1, overflow: "auto" }}>
          {renderSelectedChart()}
        </Box>
      </Box>

      <LocationsList />
    </Container>
  );
};

export default AveragePage;
