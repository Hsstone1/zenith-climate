export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const API_URL = process.env.REACT_APP_API_URL;
export const S3_IMAGE_BUCKET_URL = process.env.REACT_APP_S3_IMAGE_BUCKET_URL;


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
