import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom"; // For navigation
import Box from "@mui/material/Box"; // Importing Box for additional layout control
import { dropdownOptions } from "../exports";

interface DropdownOption {
  label: string;
  description: string;
  value: string;
}

interface TypeDropdownProps {
  defaultOption?: string;
}

const TypeDropdown = ({ defaultOption }: TypeDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>(
    defaultOption || dropdownOptions[0].label
  ); // Use first option as default if not provided

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: string, route: string) => {
    setSelected(value);
    setAnchorEl(null);
    navigate(`/${route}`); // Ensure navigation is relative to the root
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          mr: 1, // Adds a small margin to the right of the text for spacing
        }}
      >
        {selected}
      </Typography>
      <Tooltip title="Select Option" placement="right">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="small" // Adjust the size as needed
        >
          <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
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
    </Box>
  );
};

export default TypeDropdown;
