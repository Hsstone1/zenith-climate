
export interface Location {
    // Define the properties of a location
    id: string;
    name: string;
    visible: boolean;
    latitude: number;
    longitude: number;
    elevation: number;
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
