import React, { useState, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import PremiumIcon from "@mui/icons-material/AutoAwesome";
import { useTheme } from "@mui/material/styles";

interface DataTypeSelectionProps {
  options: {
    value: string;
    label: string;
    isPremium?: boolean;
    Icon?: React.ElementType;
  }[];
  onSelect: (value: string) => void;
}

const ClimateDataList = ({ options, onSelect }: DataTypeSelectionProps) => {
  const [selected, setSelected] = useState<string>(options[0]?.value);
  const theme = useTheme();

  useEffect(() => {
    // Ensure the first option is selected and handled by default on initial render
    if (options.length > 0) {
      onSelect(options[0].value);
    }
  }, [options, onSelect]);

  return (
    <Box
      sx={{
        display: "flex",

        overflowX: "scroll", // Enable horizontal scrolling
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => {
            setSelected(option.value);
            onSelect(option.value);
          }}
          variant="outlined"
          sx={{
            minWidth: "10vw",
            width: "auto",
            textTransform: "none",
            color: "black",
            borderColor:
              option.value === selected ? theme.palette.primary.main : "#ccc",
            backgroundColor:
              option.value === selected ? theme.palette.action.selected : "",
            "&:hover": {
              borderColor: theme.palette.primary.dark,
            },
            borderRadius: "1rem",
            m: 1, // Maintain constant margins
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap", // Prevent the text from wrapping
              overflow: "hidden", // Hide overflowed text
            }}
          >
            {option.Icon ? (
              <option.Icon sx={{ color: "lightblue", height: "20px" }} />
            ) : null}
            {option.label}
            {option.isPremium && <PremiumIcon sx={{ color: "gold", ml: 1 }} />}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default ClimateDataList;
