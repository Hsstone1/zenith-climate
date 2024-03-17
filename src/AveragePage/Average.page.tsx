import React, { useState } from "react";
import Container from "../Components/Container";
import RouteDropdown from "../Components/TypeDropdown";
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
const AveragePage = () => {
  const dataTypeOptions = [
    { label: "Temperature", value: "temperature", Icon: TemperatureIcon },
    { label: "Apparent", value: "apparent", Icon: TemperatureIcon },
    { label: "Rain", value: "rain", Icon: RainIcon },
    { label: "Snow", value: "snow", Icon: SnowIcon },
    { label: "Sun", value: "sun", Icon: SunIcon },
    { label: "UV Index", value: "UV", Icon: SunIcon },
    { label: "Humidity", value: "humidity", Icon: HumidityIcon },
    { label: "Dew Point", value: "dewPoint", Icon: HumidityIcon },
    { label: "Wind", value: "wind", Icon: WindIcon },
    { label: "Comfort", value: "comfort", Icon: ComfortIcon },
    // Add more data types as needed
  ];

  const handleDataTypeSelect = (value: string) => {
    // Handle the selection of data type here
    // This could involve fetching data or updating the UI to show the selected type's data
    console.log("Selected data type:", value);
  };

  return (
    <Container>
      <RouteDropdown defaultOption={"Average"} />

      <ClimateDataList
        options={dataTypeOptions}
        onSelect={handleDataTypeSelect}
      />
      <Box sx={{ height: "70%" }} />

      <LocationsList />
    </Container>
  );
};

export default AveragePage;
