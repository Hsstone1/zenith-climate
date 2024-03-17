// Container.tsx
import React from "react";
import Box from "@mui/material/Box"; // Import the 'Box' component from the '@mui/material' package
import { containerColor } from "../exports";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <Box
      sx={{
        height: "90vh",
        //border: "1px solid #ccc",
        borderRadius: "2rem",
        px: 2, // Horizontal padding
        backgroundColor: containerColor,
        overflowY: "auto", // Added for scrollable content within the container if it exceeds the height
        overflowX: "hidden", // Hide horizontal scrollbar
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
