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
  historical_data: any;
  koppen: string;
  hardiness: string;
  isLoading: boolean;
}

export const containerColor = "#f8f8f8";

export const chartColors = [
  "#0384fc", // Darker version of #ADD8E6
  "#f52c2c", // Darker version of #FFC0CB
  "#c284e3", // Darker version of #D8BFD8
  "#20b806", // Darker version of #FFE4E1
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

export const monthMidPoints = [
  15, 46, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349,
];

export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

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

const koppenDescriptions: { [key: string]: string } = {
  A: "Tropical/Megathermal climates",
  Af: "Tropical rainforest climate, with no dry season.",
  Am: "Tropical monsoon climate, with a short dry season.",
  Aw: "Tropical savanna climate, with a winter dry season.",
  Bsh: "Semi-arid (steppe) hot climate.",
  Bsk: "Semi-arid (steppe) cold climate.",
  Bwh: "Arid (desert) hot climate.",
  Bwk: "Arid (desert) cold climate.",
  C: "Temperate/Mesothermal climates",
  Cfa: "Humid subtropical climate, with no dry season and a hot summer.",
  Cfb: "Oceanic climate, with no dry season and a warm summer.",
  Cfc: "Oceanic climate, with no dry season and a cold summer.",
  Csa: "Mediterranean climate, with a dry and hot summer.",
  Csb: "Mediterranean climate, with a dry and warm summer.",
  Csc: "Mediterranean climate, with a dry and cold summer.",
  Cwa: "Humid subtropical climate, with a dry winter and a hot summer.",
  Cwb: "Humid subtropical climate, with a dry winter and a warm summer.",
  Cwc: "Humid subtropical climate, with a dry winter and a cold summer.",
  D: "Cold/Snow climates",
  Dfa: "Humid continental climate, with no dry season and a hot summer.",
  Dfb: "Humid continental climate, with no dry season and a warm summer.",
  Dfc: "Subarctic climate, with no dry season and a cool summer.",
  Dfd: "Subarctic climate, with no dry season and extremely cold winter.",
  Dsa: "Cold semi-arid climate, with a dry summer and a hot summer.",
  Dsb: "Cold semi-arid climate, with a dry summer and a warm summer.",
  Dsc: "Cold semi-arid climate, with a dry summer and a cool summer.",
  Dsd: "Cold semi-arid climate, with a dry summer and extremely cold winter.",
  Dwa: "Humid continental climate, with a dry winter and a hot summer.",
  Dwb: "Humid continental climate, with a dry winter and a warm summer.",
  Dwc: "Subarctic climate, with a dry winter and a cool summer.",
  Dwd: "Subarctic climate, with a dry winter and extremely cold winter.",
  EF: "Ice cap climate, perpetually frozen with no true summer.",
  ET: "Tundra climate, cold with slight warmth during short summers.",
};

export const getKoppenDescription = (koppenCode: string) => {
  return koppenDescriptions[koppenCode] || "Unknown Koppen classification";
};
