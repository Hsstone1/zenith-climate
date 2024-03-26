import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import useLocationStore from "../Zustand/LocationStore";
import { chartColors } from "../exports";
const LocationColorsList = () => {
  const { locations } = useLocationStore();

  const visibleLocations = locations.filter((location) => location.visible);

  return (
    <Box sx={{ display: "flex", overflowX: "auto" }}>
      {visibleLocations.map((location, index) => {
        if (location.visible) {
          return (
            <Box
              key={location.name}
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "16px",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: chartColors[index % chartColors.length],
                  mr: 1,
                }}
              />
              <Typography sx={{ color: "#B0BEC5", fontSize: "12px" }}>
                {location.name}
              </Typography>
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default LocationColorsList;
