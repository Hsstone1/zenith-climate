export const getBackgroundColor = (
  value: number,
  dataType:
    | "Temperature"
    | "Precip"
    | "Humidity"
    | "SunHours"
    | "SunPercent"
    | "UV Index"
    | ""
) => {
  if (dataType === "Temperature") {
    //Degrees F, -20 is dark blue, 130 is dark red
    const lowerValue = -20;
    const upperValue = 130;
    if (value > upperValue) {
      return TemperatureColors[TemperatureColors.length - 1];
    }
    if (value < lowerValue) {
      return TemperatureColors[0];
    }
    return TemperatureColors[
      Math.round(
        ((value + Math.abs(lowerValue)) / (upperValue + Math.abs(lowerValue))) *
          (TemperatureColors.length - 1)
      )
    ];
  } else if (dataType === "") {
    return "#FFFFFF";
  }
};

export const getTextColor = (value: number, dataType: string) => {
  if (dataType === "Temperature") {
    return value >= 89.5 || value <= 0.5 ? "#FFFFFF" : "#000000";
  } else if (dataType === "Precip") {
    return value >= 4.5 ? "#FFFFFF" : "#000000";
  } else if (dataType === "Humidity") {
    return value >= 30 ? "#FFFFFF" : "#000000";
  } else if (dataType === "SunHours") {
    return value <= 49.5 ? "#FFFFFF" : "#000000";
  } else if (dataType === "SunPercent") {
    return value <= 19.5 ? "#FFFFFF" : "#000000";
  }
};

const TemperatureColors = [
  "#3333FF",
  "#3838FF",
  "#3E3EFF",
  "#4444FF",
  "#4A4AFF",
  "#5050FF",
  "#5656FF",
  "#5C5CFF",
  "#5F5FFF",
  "#6363FF",
  "#6868FF",
  "#6E6EFF",
  "#7474FF",
  "#7A7AFF",
  "#8080FF",
  "#8686FF",
  "#8C8CFF",
  "#9292FF",
  "#9999FF",
  "#9E9EFF",
  "#A4A4FF",
  "#AAAAFF",
  "#B0B0FF",
  "#B6B6FF",
  "#BCBCFF",
  "#C2C2FF",
  "#C8C8FF",
  "#CECEFF",
  "#D4D4FF",
  "#DADAFF",
  "#E0E0FF",
  "#E6E6FF",
  "#ECECFF",
  "#F2F2FF",
  "#F8F8FF",
  "#FEFEFF",
  "#FFF7EF",
  "#FFEFE0",
  "#FFE8D1",
  "#FFE0C2",
  "#FFD9B3",
  "#FFD1A4",
  "#FFC994",
  "#FFC285",
  "#FFBA76",
  "#FFB266",
  "#FFAA56",
  "#FFA347",
  "#FF9B38",
  "#FF9429",
  "#FF8C1A",
  "#FF850B",
  "#FF7D00",
  "#FF7500",
  "#FF6D00",
  "#FF6600",
  "#FF5E00",
  "#FF5600",
  "#FF4F00",
  "#FF4700",
  "#FF4000",
  "#FF3800",
  "#FF3000",
  "#FF2800",
  "#FF2100",
  "#FF1900",
  "#FF1100",
  "#FF0A00",
  "#FF0200",
  "#F50000",
  "#E60000",
  "#D70000",
  "#C60000",
  "#B70000",
  "#A80000",
  "#990000",
  "#890000",
  "#7A0000",
  "#6B0000",
  "#5C0000",
  "#4D0000",
  "#3C0000",
  "#2D0000",
  "#1E0000",
  "#0F0000",
  "#000000",
];
