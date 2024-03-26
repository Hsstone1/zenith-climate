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
  isLoading: boolean;
}

export const dropdownOptions = [
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

export const containerColor = "#f8f8f8";

export const chartColors = [
  "#0384fc", // Darker version of #ADD8E6
  "#f77f5e", // Darker version of #FFC0CB
  "#c284e3", // Darker version of #D8BFD8
  "#ffee00", // Darker version of #FFE4E1
  "#f2d085", // Darker version of #90EE90
];
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const calculateSmoothedData = (data: any, smoothDays: number) => {
  return data.map((_: any, i: any) => {
    let start = i - Math.floor(smoothDays / 2);
    let end = i + Math.floor(smoothDays / 2);
    start = Math.max(start, 0);
    end = Math.min(end, data.length - 1);
    const segment = data.slice(start, end + 1);
    const average =
      segment.reduce((acc: any, val: any) => acc + val, 0) / segment.length;
    return average;
  });
};
