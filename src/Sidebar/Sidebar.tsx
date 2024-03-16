import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CompareIcon from "@mui/icons-material/Compare";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ApiIcon from "@mui/icons-material/Api";
import { Typography } from "@mui/material";

const Sidebar = () => (
  <Box>
    <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, textAlign: "center" }}
    >
      Peek Climate
    </Typography>
    <List>
      {["Home", "Compare", "Historical", "Climate Trends", "API"].map(
        (text, index) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={"/" + text.toLowerCase().replace(" ", "")}
          >
            <ListItemIcon>
              {index === 0 && <HomeIcon />}
              {index === 1 && <CompareIcon />}
              {index === 2 && <HistoryIcon />}
              {index === 3 && <TrendingUpIcon />}
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
