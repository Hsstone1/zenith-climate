import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TrendsIcon from "@mui/icons-material/TrendingUp";
import ApiIcon from "@mui/icons-material/Api";
import AverageIcon from "@mui/icons-material/BarChart";
import HistoricalIcon from "@mui/icons-material/CalendarToday";
import useLocationStore from "../Zustand/LocationStore";
import GridComponent from "./GridComponent";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { getBackgroundColor } from "../colors";

// Import your account section component

const Sidebar = () => {
  // This state could come from your location selection logic

  const { selectedLocation } = useLocationStore();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAccountClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const gridData = selectedLocation
    ? [
        {
          top: {
            High: {
              value: `${selectedLocation.average_data?.high_temperature?.annual.toFixed(
                0
              )}°F`,
              color: getBackgroundColor(
                selectedLocation.average_data?.high_temperature?.annual,
                "Temperature"
              ), // Example color
            },
          },
          bottom: {
            Low: {
              value: `${selectedLocation.average_data?.low_temperature?.annual.toFixed(
                0
              )}°F`,
              color: getBackgroundColor(
                selectedLocation.average_data?.low_temperature?.annual,
                "Temperature"
              ),
            },
          },
        },
        {
          top: {
            Rain: {
              value: `${selectedLocation.average_data?.precipitation?.annual.toFixed(
                0
              )} in`,
              color: "#FF0000", // Example color
            },
          },
          bottom: {
            Snow: {
              value: `${selectedLocation.average_data?.snow?.annual.toFixed(
                0
              )} in`,
              color: "#0000FF", // Example color
            },
          },
        },

        {
          top: {
            Comfort: {
              value: `${selectedLocation.average_data?.comfort_index?.annual.toFixed(
                0
              )}%`,
              color: "#FF0000", // Example color
            },
          },
          bottom: {
            Sun: {
              value: `${selectedLocation.average_data?.sun?.annual.toFixed(
                0
              )}%`,
              color: "#0000FF", // Example color
            },
          },
        },

        {
          top: {
            Humidity: {
              value: `${selectedLocation.average_data?.mean_humidity?.annual.toFixed(
                0
              )}%`,
              color: "#FF0000", // Example color
            },
          },
          bottom: {
            Dewpoint: {
              value: `${selectedLocation.average_data?.dewpoint?.annual.toFixed(
                0
              )}°F`,
              color: getBackgroundColor(
                selectedLocation.average_data?.dewpoint?.annual,
                "Temperature"
              ),
            },
          },
        },
      ]
    : [];

  const locationDetails = selectedLocation ? (
    <Box sx={{ p: 2 }}>
      <img
        src={`${process.env.PUBLIC_URL}/logo512.jpg`}
        alt="Location"
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <Typography
        variant="subtitle1"
        component="h2"
        noWrap
        sx={{ fontWeight: "normal" }}
      >
        {selectedLocation.name}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "gray" }}
      >{`Elevation: ${Math.round(
        selectedLocation.elevation
      )} Feet`}</Typography>
      <Tooltip title="Cold semi-arid steppe climate" placement="right">
        <Typography variant="body2" sx={{ color: "gray" }}>
          {`Climate Type: (${selectedLocation.koppen})`}
        </Typography>
      </Tooltip>
      <Divider sx={{ my: 2 }} />
      <GridComponent data={gridData} />
    </Box>
  ) : (
    <List>
      {["Home", "Average", "Historical", "Climate Trends", "API"].map(
        (text, index) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={"/" + text.toLowerCase().replace(" ", "")}
          >
            <ListItemIcon>
              {index === 0 && <HomeIcon />}
              {index === 1 && <AverageIcon />}
              {index === 2 && <HistoricalIcon />}
              {index === 3 && <TrendsIcon />}
              {index === 4 && <ApiIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )
      )}
    </List>
  );

  const accountSection = (
    <>
      <IconButton onClick={handleAccountClick}>
        <AccountCircleIcon />
      </IconButton>
      <Typography variant="h5">Account</Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleClose}>Premium</MenuItem>
        <MenuItem onClick={handleClose}>Preferences</MenuItem>
        <MenuItem onClick={handleClose}>API</MenuItem>
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
      </Popover>
    </>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo512.jpg`}
          alt="logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <Typography variant="h6">Zenith Climate</Typography>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>{locationDetails}</Box>
      <Divider />
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-start" }}>
        {accountSection}
      </Box>
    </Box>
  );
};

export default Sidebar;
