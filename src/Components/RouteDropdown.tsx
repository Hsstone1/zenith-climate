import React, { useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableViewIcon from "@mui/icons-material/TableView";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom"; // For navigation
import Box from "@mui/material/Box"; // Importing Box for additional layout control
import GooglePlacesAutocomplete from "./GoogleAutocomplete";
import Button from "@mui/material/Button";
import useGeneralStore from "../Zustand/GeneralStore";

const dropdownOptions = [
  { label: "Home", description: "View Map", value: "home" },
  {
    label: "Averages",
    description: "View climate averages",
    value: "average",
  },
  {
    label: "Historical",
    description: "View historical climate data",
    value: "historical",
  },
  { label: "Trends", description: "View climate trends", value: "trends" },
];

interface RouteDropdownProps {
  defaultOption?: string;
}

const RouteDropdown = ({ defaultOption }: RouteDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>(defaultOption || "");
  const { selectedButtonType, setSelectedButtonType } = useGeneralStore();

  let leaveTimer: NodeJS.Timeout;

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    clearTimeout(leaveTimer);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    leaveTimer = setTimeout(() => {
      setAnchorEl(null);
    }, 100);
  };

  const handleClose = (value: string, route: string) => {
    //setSelected(value);
    setAnchorEl(null);
    navigate(`/${route}`);
  };

  const handleIconButtonClick = (type: string) => {
    setSelectedButtonType(type); // Update the selectedButtonType state in your store
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "6vh",
        justifyContent: "space-between", // Adjusted for spacing and alignment
        width: "100%",
      }}
    >
      <Box
        onMouseEnter={handleMouseEnter}
        component="span"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          size="small"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mr: 1,
          }}
        >
          {selected}
        </Typography>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          onMouseEnter: () => clearTimeout(leaveTimer),
          onMouseLeave: handleMouseLeave,
        }}
      >
        {dropdownOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleClose(option.label, option.value)}
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0" },
              "& .MuiTypography-body2": { color: "gray", fontSize: "0.8rem" },
            }}
          >
            <Typography variant="body1" component="div">
              {option.label}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ mx: "10px", mt: "5px" }}
            >
              {option.description}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <GooglePlacesAutocomplete />
      {selected !== "Home" && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Chart">
            <IconButton
              onClick={() => handleIconButtonClick("Chart")}
              color={selectedButtonType === "Chart" ? "primary" : "default"}
            >
              <BarChartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Table">
            <IconButton
              onClick={() => handleIconButtonClick("Table")}
              color={selectedButtonType === "Table" ? "primary" : "default"}
            >
              <TableViewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default RouteDropdown;
