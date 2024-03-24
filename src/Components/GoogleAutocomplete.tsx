import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNewLocation } from "../Utility/LocationHook";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

const GooglePlacesAutocomplete = () => {
  const addNewLocation = useNewLocation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState("");

  const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
    //console.log("Place selected: ", place);

    if (place && place.geometry && place.geometry.location) {
      addNewLocation(
        parseFloat(place.geometry.location.lat().toFixed(4)),
        parseFloat(place.geometry.location.lng().toFixed(4))
      );
    }
  };

  useEffect(() => {
    if (!autocomplete && inputRef.current) {
      const autocompleteInit = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["(regions)"], // you can specify the type
        }
      );
      autocompleteInit.addListener("place_changed", () => {
        const place = autocompleteInit.getPlace();
        onPlaceSelected(place);
      });
      setAutocomplete(autocompleteInit);
    }
  }, [onPlaceSelected, autocomplete]);

  // Function to clear the text field and suggestions
  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field directly
      setInputValue(""); // Clear the state managing the input value
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      inputRef={inputRef}
      size="small"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {inputValue && (
              <IconButton onClick={handleClearInput} edge="end" size="small">
                <Tooltip title="Clear" placement="top">
                  <CloseIcon />
                </Tooltip>
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      sx={{
        width: "20vw",
        maxWidth: "100%",
        alignContent: "center",

        m: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: "1rem", // Adjust for more or less rounding
        },
        "& .MuiInputBase-input": {
          height: "1em", // Adjust the height of the input as needed
          fontSize: "0.875rem", // Adjust font size as needed
        },
      }}
    />
  );
};

export default GooglePlacesAutocomplete;
