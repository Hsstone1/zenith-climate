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
import { Button } from "@mui/material";
import { getKoppenDescription } from "../exports";

// Import your account section component

const Sidebar = () => {
  // This state could come from your location selection logic

  const { selectedLocation, setSelectedLocation } = useLocationStore();

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
              color: getBackgroundColor(
                selectedLocation.average_data?.precipitation?.annual / 12,
                "Precip"
              ),
            },
          },
          bottom: {
            Snow: {
              value: `${selectedLocation.average_data?.snow?.annual.toFixed(
                0
              )} in`,
              color: getBackgroundColor(
                selectedLocation.average_data?.snow?.annual / (5 * 12),
                "Precip"
              ),
            },
          },
        },

        {
          top: {
            Sun: {
              value: `${selectedLocation.average_data?.sun?.annual.toFixed(
                0
              )}%`,
              color: getBackgroundColor(
                selectedLocation.average_data?.sun?.annual,
                "Temperature"
              ),
            },
          },
          bottom: {
            Hours: {
              value: `${selectedLocation.average_data?.sunlight_hours?.annual.toFixed(
                0
              )}`,
              color: getBackgroundColor(
                selectedLocation.average_data?.sunlight_hours?.annual /
                  (12 * 3.65),
                "Temperature"
              ),
            },
          },
        },

        {
          top: {
            Humidity: {
              value: `${selectedLocation.average_data?.mean_humidity?.annual.toFixed(
                0
              )}%`,
              color: getBackgroundColor(
                selectedLocation.average_data?.mean_humidity?.annual / 15,
                "Precip"
              ), // Example color
            },
          },
          bottom: {
            Dew: {
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`${process.env.PUBLIC_URL}/climate-images/(${selectedLocation.koppen}).png`}
          alt="Location Climate"
          style={{ width: "100%", borderRadius: "4px" }}
        />
      </Box>
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
      <Typography variant="body2" sx={{ color: "gray" }}>
        {`Comfort: ${(
          selectedLocation.average_data?.comfort_index?.annual / 10
        ).toFixed(1)}/10`}
      </Typography>
      <Tooltip
        title={`${getKoppenDescription(selectedLocation.koppen)}`}
        placement="bottom"
      >
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
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          width: "100%", // Ensure the button stretches to the container width
          textTransform: "none", // Prevents the button from capitalizing your text
        }}
        startIcon={<AccountCircleIcon />}
        onClick={handleAccountClick} // Use the handleAccountClick to set the anchorEl
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Account
        </Typography>
      </Button>
    </>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Button
        component={Link}
        to="/home"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          width: "100%", // Ensure the button stretches to the container width
          textTransform: "none", // Prevents the button from capitalizing your text
        }}
        startIcon={
          <img
            src={`${process.env.PUBLIC_URL}/logo512.jpg`}
            alt="logo"
            style={{ height: "30px", marginRight: "10px" }}
          />
        }
        onClick={() => {
          setSelectedLocation(null);
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Zenith Climate
        </Typography>
      </Button>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>{locationDetails}</Box>
      <Divider />
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-start" }}>
        {accountSection}
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
      </Box>
    </Box>
  );
};

export default Sidebar;
