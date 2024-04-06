// LocationsList.tsx
import React, { useEffect, useState } from "react";
import { Location } from "../exports";
import useLocationStore from "../Zustand/LocationStore";
import {
  Typography,
  IconButton,
  Tooltip,
  ButtonBase,
  Box,
  GlobalStyles,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import InfoIcon from "@mui/icons-material/Info";
import useGeneralStore from "../Zustand/GeneralStore";

interface LocationsListProps {
  singleVisibleLocation?: boolean;
}

const LocationsList = ({ singleVisibleLocation }: LocationsListProps) => {
  const {
    locations,
    removeLocation,
    toggleVisibility,
    selectedLocation,
    setSelectedLocation,
    toggleVisibilityExclusive,
  } = useLocationStore();
  const [confirmDelete, setConfirmDelete] = useState<Location | null>();
  const { isSidebarOpen, setIsSidebarOpen } = useGeneralStore();

  useEffect(() => {
    if (singleVisibleLocation && locations.length > 0) {
      const visibleLocations = locations.filter((loc) => loc.visible);

      if (visibleLocations.length > 1) {
        // Always ensure only the first initially visible location remains visible, or the latest added if none are visible
        const targetVisibleLocationId =
          visibleLocations.length > 0
            ? visibleLocations[0].id
            : locations[locations.length - 1].id;

        toggleVisibilityExclusive(targetVisibleLocationId);
        toggleVisibilityExclusive(targetVisibleLocationId);
      }
    }
  }, [locations, singleVisibleLocation]);

  const handleLocationClick = (location: Location) => {
    if (singleVisibleLocation) {
      // Use the new toggle method when singleVisibleLocation is true
      toggleVisibilityExclusive(location.id);
    } else {
      // Use the original toggle method when false
      toggleVisibility(location);
    }
  };
  const handleInfoClick = (
    event: React.MouseEvent<HTMLElement>,
    location: Location
  ) => {
    event.stopPropagation();
    // Check if the selected location is the same as the clicked one
    if (selectedLocation && selectedLocation.id === location.id) {
      setSelectedLocation(null); // Deselect the location
      //setIsSidebarOpen(false); // Close the sidebar
    } else {
      setSelectedLocation(location); // Set the clicked location as selected
      setIsSidebarOpen(true); // Open the sidebar
    }
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLElement>,
    location: Location
  ) => {
    event.stopPropagation(); // Prevents the ButtonBase onClick from being called
    if (confirmDelete === location) {
      removeLocation(location.id);
      setConfirmDelete(null); // Reset after action
    } else {
      setConfirmDelete(location);
    }
  };

  const handleCancelDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevents the ButtonBase onClick from being called

    setConfirmDelete(null);
  };

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes borderColorFade": {
            "0%": {
              borderColor: "#ff0000", // start color
            },
            "50%": {
              borderColor: "#0000ff", // mid transition color
            },
            "100%": {
              borderColor: "#ff0000", // end color
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          p: 1,
          overflowX: "scroll", // Enable horizontal scrolling
          // Custom scrollbar styles for Webkit browsers (Chrome, Safari, Edge)
          "&::-webkit-scrollbar": {
            backgroundColor: `rgba(0,0,0,0.1)`, // Background color of the scrollbar track
            height: `0.4rem`, // Height of the scrollbar
            borderRadius: `1rem`, // Round the scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `rgba(0,0,0,0.3)`, // Color of the scrollbar thumb
            borderRadius: `1rem`, // Round the thumb
          },
        }}
      >
        {locations.map((location) => (
          <Box
            key={location.id}
            sx={{
              border: 2,
              borderColor: location.isLoading
                ? "error.main"
                : location.visible
                ? "primary.main"
                : "divider",
              animation: location.isLoading
                ? "borderColorFade 2s infinite"
                : "none",
              px: 1,
              mx: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
              width: "fit-content",
              height: "10vh",
              cursor: "pointer", // Make it obvious it's clickable
            }}
            onClick={() => handleLocationClick(location)}
          >
            <Typography
              variant="body1"
              noWrap
              sx={{
                width: "15vw",
                minWidth: "125px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center",
              }}
            >
              {!location.isLoading ? (
                location.name.includes(",") ? (
                  <>{location.name.split(",", 2).join(",")}</>
                ) : (
                  location.name
                )
              ) : (
                "Loading..."
              )}
            </Typography>
            {location.name.includes(",") &&
              location.name.split(",").length > 2 && (
                <Typography
                  variant="body2" // You can adjust the variant for a different typography font
                  noWrap
                  sx={{
                    width: "15vw",
                    minWidth: "125px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "gray", // This sets the color to light gray
                    textAlign: "center",
                  }}
                >
                  {location.name.split(",").slice(2).join(",")}
                </Typography>
              )}
            {!location.isLoading && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center", // Center the icons
                }}
              >
                {confirmDelete === location ? (
                  <Tooltip title="Cancel Delete">
                    <IconButton
                      onClick={(e) => handleCancelDelete(e)}
                      size="small"
                    >
                      <DoNotDisturbOnIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Location Info">
                    <IconButton
                      onClick={(e) => handleInfoClick(e, location)}
                      size="small"
                      sx={{
                        color:
                          selectedLocation &&
                          selectedLocation.id === location.id
                            ? "blue"
                            : "inherit",
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip
                  title={
                    confirmDelete === location
                      ? "Confirm Delete"
                      : "Delete Location"
                  }
                >
                  <IconButton
                    onClick={(e) => handleDeleteClick(e, location)}
                    color={confirmDelete === location ? "error" : "inherit"}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default LocationsList;
