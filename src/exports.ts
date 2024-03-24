export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const API_URL = process.env.REACT_APP_API_URL;
export const S3_IMAGE_BUCKET_URL = process.env.REACT_APP_S3_IMAGE_BUCKET_URL;



export const getColorForTemperatureF = (tempF:number) => {
  const colorRamp = [
    { max: -40, color: '#0000FF' }, // Deep Blue
    { max: 0, color: '#6495ED' },   // Cornflower Blue
    { max: 32, color: '#00FFFF' },  // Cyan
    { max: 60, color: '#008000' },  // Green
    { max: 70, color: '#ADFF2F' },  // GreenYellow
    { max: 80, color: '#FFFF00' },  // Yellow
    { max: 90, color: '#FFA500' },  // Orange
    { max: 100, color: '#FF4500' }, // OrangeRed
    { max: 110, color: '#FF0000' }, // Red
    { max: 120, color: '#8B0000' }, // DarkRed
  ];

  // Find the first entry in the ramp that this temperature is less than or equal to
  const rampEntry = colorRamp.find(entry => tempF <= entry.max);
  
  // If a matching entry is found, return its color; otherwise, return a default color
  return rampEntry ? rampEntry.color : '#8B0000'; // Use DarkRed for any temperature above 120
}


export interface Location {
    // Define the properties of a location
    id: string;
    name: string;
    visible: boolean;
    latitude: number;
    longitude: number;
    elevation: number;
    average_data: any;
    koppen: string;
    hardiness: string;
    isLoading: boolean,
}

export   const dropdownOptions = [
    { label: "Home", description: "View Map", value: "home"},
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

export const containerColor = '#f8f8f8'
