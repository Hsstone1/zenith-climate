import React, { useEffect, useState } from "react";
import Container from "../Components/Container";
import RouteDropdown from "../Components/RouteDropdown";
import LocationsList from "../Components/LocationsList";
import ClimateDataList from "../Components/ClimateDataList";
import { Box } from "@mui/system";

import CircularProgress from "@mui/material/CircularProgress";

import useLocationStore from "../Zustand/LocationStore";
import HistoricalChart from "./HistoricalChart";
import { fetchClimateDataYear } from "../API/DatabaseFunctions";

import { Location } from "../exports";
// import LocationColorsList from "./VisibleLocationColors";
// import PrecipChart from "./PrecipChart";
// import SunChart from "./SunChart";
// import HumidityChart from "./HumidityChart";

interface AggregatedData {
  [key: string]: number[];
}

const HistoricalPage = () => {
  const { locations, updateHistoricalData } = useLocationStore();
  const [selectedYear, setSelectedYear] = useState(2022);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  let processedLocationName = selectedLocation?.name;
  const parts = selectedLocation?.name.split(",") ?? [];
  if (parts.length > 2) {
    processedLocationName = parts.slice(0, 2).join(",");
  }

  useEffect(() => {
    setDataFetched(false);
    const visibleLocation = locations.find((location) => location.visible);
    setSelectedLocation(visibleLocation || null);

    const fetchData = async () => {
      if (!visibleLocation) return; // Early exit if no visible location

      const needsFetching =
        !visibleLocation.historical_data ||
        !visibleLocation.historical_data[selectedYear];
      if (needsFetching) {
        fetchClimateDataYear(
          visibleLocation.latitude,
          visibleLocation.longitude,
          visibleLocation.elevation,
          selectedYear
        )
          .then((data) =>
            updateHistoricalData(visibleLocation.id, selectedYear, data)
          )
          .catch((error) =>
            console.error(
              `Failed to fetch data for ${visibleLocation.name}:`,
              error
            )
          )
          .finally(() => setDataFetched(true));
      } else {
        setDataFetched(true); // Data already fetched for the selected year
      }
    };

    fetchData();
  }, [selectedYear, locations]);

  const aggregateVisibleLocationData = () => {
    if (
      !selectedLocation ||
      !selectedLocation.average_data ||
      Object.keys(selectedLocation.average_data).length === 0 ||
      !selectedLocation.historical_data ||
      !selectedLocation.historical_data[selectedYear]
    ) {
      return [];
    }

    const fields = [
      "high_temperature",
      "low_temperature",
      "apparent_high_temperature",
      "apparent_low_temperature",
    ];
    const locationData = fields.reduce((acc: any, field) => {
      const dailyData =
        selectedLocation.historical_data[selectedYear][field]?.daily;
      if (dailyData) {
        acc[field] = dailyData;
      }
      return acc;
    }, {});

    return [locationData];
  };

  const temperatureAggregatedData = aggregateVisibleLocationData();

  return (
    <Container>
      <RouteDropdown defaultOption={"Historical"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "70%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexGrow: 1, flexShrink: 1, overflow: "auto" }}>
          {dataFetched &&
          temperatureAggregatedData.length > 0 &&
          selectedLocation ? (
            <HistoricalChart
              aggregatedData={temperatureAggregatedData}
              year={selectedYear}
              locationName={
                processedLocationName
                  ? processedLocationName
                  : selectedLocation?.name
              }
            />
          ) : locations.length > 0 ? ( // Check if there are any locations
            !dataFetched ? ( // If data is not yet fetched
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CircularProgress /> {/* Show spinner */}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                Add a Location to view Historical Data
              </Box>
            )
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Add a Location to view Historical Data
            </Box>
          )}
        </Box>
      </Box>

      <LocationsList singleVisibleLocation={true} />
    </Container>
  );
};

export default HistoricalPage;
