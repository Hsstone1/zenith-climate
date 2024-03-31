import React, { useEffect, useState } from "react";
import Container from "../Components/Container";
import RouteDropdown from "../Components/RouteDropdown";
import LocationsList from "../Components/LocationsList";
import ClimateDataList from "../Components/ClimateDataList";
import { Box } from "@mui/system";

import useLocationStore from "../Zustand/LocationStore";
import TemperatureChart from "./HistoricalTemperatureChart";
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
  const [selectedChart, setSelectedChart] = useState("temperature");
  const [selectedYear, setSelectedYear] = useState(2022);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setDataFetched(false);

      const fetchPromises = locations.map((location) => {
        if (
          location.visible &&
          location.average_data &&
          (!location.historical_data || !location.historical_data[selectedYear])
        ) {
          return fetchClimateDataYear(
            location.latitude,
            location.longitude,
            location.elevation,
            selectedYear
          )
            .then((data) =>
              updateHistoricalData(location.id, selectedYear, data)
            )
            .catch((error) =>
              console.error(`Failed to fetch data for ${location.name}:`, error)
            );
        }
        return Promise.resolve();
      });

      await Promise.all(fetchPromises);
      setDataFetched(true); // Indicate that data fetching has completed
    };

    setDataFetched(false); // Reset the flag when the selectedYear or locations change
    fetchData();
  }, [selectedYear, locations]);

  const aggregateVisibleLocationData = (fields: string[]) => {
    const aggregatedData: {}[] = [];

    locations.forEach((location) => {
      if (
        location.visible &&
        location.average_data && // Ensure average_data is loaded
        Object.keys(location.average_data).length > 0 && // Check that average_data is not empty
        location.historical_data && // Ensure historical_data is initialized
        location.historical_data[selectedYear]
      ) {
        // Initialize an object to store the daily data for the current visible location
        const locationData: { [key: string]: any } = {};

        fields.forEach((field) => {
          let dailyData = null;
          // Extract the 'daily' data for the current field
          if (
            location.historical_data &&
            location.historical_data[selectedYear]
          ) {
            dailyData = location.historical_data[selectedYear][field]?.daily;
            locationData[field] = dailyData;
          }
        });

        // Add the populated locationData object to the aggregatedData array
        aggregatedData.push(locationData);
      }
    });

    return aggregatedData;
  };

  const dataTypeOptions = [
    { label: "Temperature", value: "temperature" },
    { label: "Rain", value: "rain" },
    { label: "Snow", value: "snow" },
    { label: "Sun", value: "sun" },
    { label: "Humidity", value: "humidity" },
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
  ]);

  //   const rainAggregatedData = aggregateVisibleLocationData([
  //     "precipitation",
  //     "precip_days",
  //   ]);

  //   const snowAggregatedData = aggregateVisibleLocationData([
  //     "snow",
  //     "snow_days",
  //   ]);

  //   const sunAggregatedData = aggregateVisibleLocationData([
  //     "sun",
  //     "sunlight_hours",
  //   ]);

  //   const humidityAggregatedData = aggregateVisibleLocationData([
  //     "mean_humidity",
  //     "expected_max_dewpoint",
  //   ]);

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "temperature":
        return (
          <TemperatureChart
            aggregatedData={temperatureAggregatedData}
            year={selectedYear}
          />
        );
      //   case "rain":
      //     return <PrecipChart aggregatedData={rainAggregatedData} type="Rain" />;
      //   case "snow":
      //     return <PrecipChart aggregatedData={snowAggregatedData} type="Snow" />;
      //   case "sun":
      //     return <SunChart aggregatedData={sunAggregatedData} type="Sun" />;
      //   case "humidity":
      //     return (
      //       <HumidityChart
      //         aggregatedData={humidityAggregatedData}
      //         type="Humidity"
      //       />
      //     );
      //default:
      //  return <TemperatureChart aggregatedData={temperatureAggregatedData} />; // Default case if needed
    }
  };

  return (
    <Container>
      <RouteDropdown defaultOption={"Historical"} />

      <ClimateDataList
        options={dataTypeOptions}
        onSelect={handleDataTypeSelect}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "75%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexGrow: 1, flexShrink: 1, overflow: "auto" }}>
          {dataFetched && renderSelectedChart()}
        </Box>
      </Box>

      <LocationsList singleVisibleLocation={true} />
    </Container>
  );
};

export default HistoricalPage;
