import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom"; // Ensure you've installed this package
import { debounce } from "lodash";

import {
  calculateSmoothedData,
  chartColors,
  isLeapYear,
  monthNames,
} from "../exports";
import { getBackgroundColor } from "../colors";
import { extendedValuesPlugin } from "./HistoricalChartPlugins";
import useHistoricalStore from "../Zustand/HistoricalStore";

// Define a set of colors for the chart data
Chart.register(extendedValuesPlugin);
Chart.register(...registerables, zoomPlugin); // Register zoom plugin and chart.js defaults

interface ChartProps {
  aggregatedData: any[];
  year: number;
  locationName: string;
}
const HistoricalChart = ({
  aggregatedData,
  year,
  locationName,
}: ChartProps) => {
  const daysInYear = isLeapYear(year) ? 366 : 365;
  const chartRef = useRef<any>(null);
  const { visibleRange, setVisibleRange } = useHistoricalStore();

  // Generate labels for all  days to ensure data for each day is plotted
  const labels = Array.from(
    { length: daysInYear * 2 },
    (_, index) => index + 1
  );

  // Find the global min and max values for the y-axis
  let globalMin = Math.min(
    ...aggregatedData.flatMap((data) => [
      ...data.high_temperature,
      ...data.low_temperature,
    ])
  );
  let globalMax = Math.max(
    ...aggregatedData.flatMap((data) => [
      ...data.high_temperature,
      ...data.low_temperature,
    ])
  );

  let processedLocationName = locationName;
  const parts = locationName.split(",");

  // If there are more than one commas, rejoin the first two parts
  if (parts.length > 2) {
    processedLocationName = parts.slice(0, 2).join(",");
  }

  const processedData = aggregatedData.flatMap((locationData, index) => {
    const color = chartColors[index % chartColors.length];
    const combinedTemperatureData: { x: number; y: any }[] = [];

    // Your existing code for actual temperatures...
    const highTemps = locationData.high_temperature || [];
    const lowTemps = locationData.low_temperature || [];

    for (let i = 0; i < locationData.high_temperature.length; i++) {
      combinedTemperatureData.push({
        x: i * 2 + 1,
        y: highTemps[i],
      });
      combinedTemperatureData.push({
        x: i * 2 + 2,
        y: lowTemps[i],
      });
    }
    const temperatureDataset = {
      label: `Temperature`,
      data: combinedTemperatureData,
      backgroundColor: color,
      borderColor: color,
      fill: false,
      tension: 0.7,
      borderWidth: 1,
      yaxisID: "y",
    };

    // New: Process apparent high and low temperatures
    const apparentHighTemps = locationData.apparent_high_temperature || [];
    const apparentLowTemps = locationData.apparent_low_temperature || [];
    const combinedApparentData: { x: number; y: any }[] = [];

    for (let i = 0; i < apparentHighTemps.length; i++) {
      combinedApparentData.push({
        x: i * 2 + 1,
        y: apparentHighTemps[i],
      });
      combinedApparentData.push({
        x: i * 2 + 2,
        y: apparentLowTemps[i],
      });
    }

    const apparentDataset = {
      label: `Apparent Temperature`,
      data: combinedApparentData,
      backgroundColor: color,
      borderColor: color,
      fill: false,
      tension: 0.5,
      borderWidth: 0.5,
      borderDash: [10, 5],
      yaxisID: "y1", // Associate with the new y-axis
    };

    return [temperatureDataset, apparentDataset]; // Combine this with the actual temperature datasets as needed
  });

  const debouncedSetVisibleRange = useCallback(
    debounce((min, max) => {
      setVisibleRange({ min, max });
    }, 100),
    []
  );

  useEffect(() => {
    console.log(visibleRange);
  }, [visibleRange]);

  // // Zoom functions
  // const zoomIn = () => {
  //   const chart = chartRef.current;
  //   if (chart) {
  //     chart.zoom(1.5); // Zoom in by 10%
  //   }
  // };

  // const zoomOut = () => {
  //   const chart = chartRef.current;
  //   if (chart) {
  //     chart.zoom(0.5); // Zoom out by 10%
  //   }
  // };

  // Define the chart options
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        extendedValuesPlugin,
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: true,
          text: `${processedLocationName} Historical Data for ${year}`,
          font: {
            size: 16,
          },
        },

        tooltip: {
          callbacks: {
            title: function (tooltipItems: any, data: any) {
              const dayIndex = Math.floor(tooltipItems[0].parsed.x / 2);
              const date = new Date(year, 0, dayIndex);
              const amPm = tooltipItems[0].parsed.x % 2 === 0 ? "AM" : "PM"; // Adjust based on your data's layout

              return `${monthNames[date.getMonth()]} ${date.getDate()} ${amPm}`;
            },
            label: function (context: any) {
              let label = context.dataset.label || "";
              if (label) {
                const type = context.dataIndex % 2 === 0 ? "High" : "Low";
                label = `${type} ` + label;
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += `${context.parsed.y.toFixed(0)}°F`;
              }
              return label;
            },
            labelTextColor: function (context: any) {
              return getBackgroundColor(context.parsed.y, "Temperature");
            },
          },
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
            onPan: function ({ chart }: any) {
              const min = chart.scales.x.min;
              const max = chart.scales.x.max;
              debouncedSetVisibleRange(min, max);
            },
          },
          zoom: {
            onZoom: function ({ chart }: any) {
              const min = chart.scales.x.min;
              const max = chart.scales.x.max;
              debouncedSetVisibleRange(min, max);
            },
            wheel: {
              enabled: true,
              speed: 0.5,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
          limits: {
            x: {
              min: 1,
              max: daysInYear * 2,
              minRange: 30,
              maxRange: daysInYear * 2,
            },
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          position: "left",
          afterDataLimits: (axis: any) => {
            axis.min = globalMin;
            axis.max = globalMax;
          },
          ticks: {
            // Append units to y-axis labels
            callback: function (value: any) {
              return `${value}°F`; // Append degree symbol and F for Fahrenheit
            },
          },
        },

        y1: {
          beginAtZero: true,
          position: "right",
          afterDataLimits: (axis: any) => {
            axis.min = globalMin;
            axis.max = globalMax;
          },
          ticks: {
            // Append units to y-axis labels
            callback: function (value: any) {
              return `${value}°F`; // Append degree symbol and F for Fahrenheit
            },
          },
        },

        x: {
          type: "linear", // Ensure the axis is treated as linear
          offset: false,
          stacked: true,
          ticks: {
            callback: function (value: any, index: any, ticks: any) {
              // Define the first day of each month in a leap year
              const firstDays = [
                1, 64, 122, 184, 244, 306, 366, 428, 490, 550, 612, 672,
              ]; // Doubled indices

              // Define the month labels
              const monthLabels = [
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
              const monthIndex = firstDays.indexOf(value);
              if (monthIndex > -1) {
                return monthLabels[monthIndex];
              }
              return null; // Hide the label for all other days
            },
            autoSkip: false,
            min: 1,
            max: daysInYear * 2,
            stepSize: 1,
          },

          grid: {
            display: true,
            drawOnChartArea: true,
          },
        },
      },

      elements: {
        point: {
          radius: 0, // Optionally hide points
        },
      },
      interaction: {
        mode: "index", // Replace "string" with one of the valid options
        intersect: false,
      },
    }),
    [globalMin, globalMax, daysInYear, processedLocationName, year]
  );

  return (
    <>
      {/* <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button> */}
      <div style={{ width: "100%", height: "100%" }}>
        <Line
          // @ts-ignore
          options={options}
          ref={chartRef}
          data={{ labels, datasets: processedData }}
        />
      </div>
    </>
  );
};

export default HistoricalChart;
