// LocationsList.tsx
import React, { useState } from "react";
import { Location } from "../exports";
import useLocationStore from "../Zustand/LocationStore";
import {
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import InfoIcon from "@mui/icons-material/Info";

const LocationsList = () => {
  const { locations, removeLocation, toggleVisibility } = useLocationStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>();
  const [confirmDelete, setConfirmDelete] = useState<Location | null>();

  const handleInfoClick = (location: Location) => {
    setCurrentLocation(location);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setCurrentLocation(null);
  };

  const handleDeleteClick = (location: Location) => {
    if (confirmDelete === location) {
      removeLocation(location);
      setConfirmDelete(null); // Reset after action
    } else {
      setConfirmDelete(location);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        overflowX: "scroll", // Enable horizontal scrolling
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      {locations.map((location) => (
        <Box
          key={location.id}
          sx={{
            border: 1,
            borderColor: "divider",
            px: 1,
            mx: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: "1rem",
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="body1"
            gutterBottom
            noWrap
            sx={{
              width: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {location.name}
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Tooltip
              title={location.visible ? "Hide Location" : "Show Location"}
            >
              <IconButton
                onClick={() => toggleVisibility(location)}
                size="small"
              >
                {location.visible ? (
                  <VisibilityIcon color="action" />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Location Info">
              <IconButton
                onClick={() => handleInfoClick(location)}
                size="small"
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
            {confirmDelete === location ? (
              <Tooltip title="Confirm Delete">
                <IconButton
                  onClick={() => handleDeleteClick(location)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Delete Location">
                <IconButton
                  onClick={() => setConfirmDelete(location)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            {confirmDelete === location && (
              <Tooltip title="Cancel Delete">
                <IconButton onClick={handleCancelDelete} size="small">
                  <DoNotDisturbOnIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {isDialogOpen && currentLocation === location && (
            <Dialog open={isDialogOpen} onClose={handleClose}>
              <DialogTitle>{currentLocation.name}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {/* Provide your location overview stats and information here */}
                  Location information and stats here.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default LocationsList;