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
  } else if (dataType === "Precip") {
    //Inches of rain per month 0 is light blue, 12 is dark blue

    const lowerValue = 0;
    const upperValue = 12;
    if (value > upperValue) {
      return PrecipColors[PrecipColors.length - 1];
    }
    if (value < lowerValue) {
      return PrecipColors[0];
    }
    return PrecipColors[
      Math.round(
        ((value + Math.abs(lowerValue)) / (upperValue + Math.abs(lowerValue))) *
          (PrecipColors.length - 1)
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

const PrecipColors = [
  "#FFFFFF",
  "#FBFBFF",
  "#F7F7FF",
  "#F4F4FF",
  "#EFEFFF",
  "#ECECFF",
  "#E7E7FF",
  "#E4E4FF",
  "#E0E0FF",
  "#DDDDFF",
  "#D8D8FF",
  "#D5D5FF",
  "#D0D0FF",
  "#CDCDFF",
  "#CACAFF",
  "#C6C6FF",
  "#C2C2FF",
  "#BEBEFF",
  "#BBBBFF",
  "#B6B6FF",
  "#B3B3FF",
  "#AEAEFF",
  "#ABABFF",
  "#A7A7FF",
  "#A4A4FF",
  "#9F9FFF",
  "#9C9CFF",
  "#9797FF",
  "#9494FF",
  "#9191FF",
  "#8D8DFF",
  "#8989FF",
  "#8585FF",
  "#8282FF",
  "#7D7DFF",
  "#7A7AFF",
  "#7575FF",
  "#7272FF",
  "#6E6EFF",
  "#6B6BFF",
  "#6666FF",
  "#6363FF",
  "#6060FF",
  "#5B5BFF",
  "#5858FF",
  "#5454FF",
  "#5050FF",
  "#4C4CFF",
  "#4949FF",
  "#4444FF",
  "#4141FF",
  "#3C3CFF",
  "#3939FF",
  "#3535FF",
  "#3232FF",
  "#2D2DFF",
  "#2A2AFF",
  "#2727FF",
  "#2222FF",
  "#1F1FFF",
  "#1B1BFF",
  "#1818FF",
  "#1313FF",
  "#1010FF",
  "#0B0BFF",
  "#0808FF",
  "#0404FF",
  "#0000FF",
  "#0000FB",
  "#0000F8",
  "#0000F5",
  "#0000F0",
  "#0000ED",
  "#0000E8",
  "#0000E5",
  "#0000E1",
  "#0000DE",
  "#0000D9",
  "#0000D6",
  "#0000D1",
  "#0000CE",
  "#0000CA",
  "#0000C6",
  "#0000C2",
  "#0000BF",
  "#0000BC",
  "#0000B7",
  "#0000B4",
  "#0000AF",
  "#0000AC",
  "#0000A8",
  "#0000A5",
  "#0000A0",
  "#00009D",
  "#000098",
  "#000095",
  "#000091",
  "#00008D",
  "#00008A",
  "#000086",
  "#000083",
  "#00007E",
  "#00007B",
  "#000076",
  "#000073",
  "#00006F",
  "#00006C",
  "#000067",
  "#000064",
  "#00005F",
  "#00005C",
  "#000058",
  "#000054",
  "#000051",
  "#00004D",
  "#00004A",
  "#000045",
  "#000042",
  "#00003D",
  "#00003A",
];
