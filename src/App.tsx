import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import HomePage from "./HomePage/Home.page";
import ComparePage from "./ComparePage/Compare.page";
import HistoricalPage from "./HistoricalPage/Historical.page";
import ClimateTrendsPage from "./TrendsPage/Trends.page";
import ApiPage from "./ApiPage/Api.page";
import { Box, IconButton, Drawer, CssBaseline } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./App.css";
import { LoadScript } from "@react-google-maps/api";
import useLocationStore from "./Zustand/LocationStore";
import { Tooltip } from "@mui/material";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start with the sidebar closed
  const drawerWidth = 240; // Define the width of the drawer
  const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY || "";
  const { locations } = useLocationStore();

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <Router>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Drawer
            variant="persistent"
            open={sidebarOpen}
            sx={{
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: sidebarOpen ? drawerWidth : 0,
                boxSizing: "border-box",
              },
            }}
          >
            <Sidebar />
          </Drawer>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              position: "fixed",
              top: "50%",
              left: sidebarOpen ? drawerWidth : 0,
              transform: "translateY(-50%)",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Tooltip title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}>
              {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Tooltip>
          </IconButton>

          {/* Adjust the Box component to take the full width and adjust padding or margin dynamically */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 5,
              marginLeft: sidebarOpen ? `${drawerWidth}px` : 0, // Dynamically adjust marginLeft based on sidebarOpen
              transition: (theme) =>
                theme.transitions.create("margin", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/historical" element={<HistoricalPage />} />
              <Route path="/trends" element={<ClimateTrendsPage />} />
              <Route path="/api" element={<ApiPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </LoadScript>
  );
}

export default App;
