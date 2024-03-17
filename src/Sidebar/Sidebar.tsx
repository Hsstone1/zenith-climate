import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TrendsIcon from "@mui/icons-material/TrendingUp";
import ApiIcon from "@mui/icons-material/Api";
import { Typography } from "@mui/material";

import AverageIcon from "@mui/icons-material/BarChart";
import HistoricalIcon from "@mui/icons-material/CalendarToday";
import { containerColor } from "../exports";

const Sidebar = () => (
  <Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/logo512.jpg`}
        alt="logo"
        style={{ height: "50px", marginRight: "10px" }}
      />
      <Typography variant="h6" component="div">
        Zenith Climate
      </Typography>
    </Box>
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
  </Box>
);

export default Sidebar;
