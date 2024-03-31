import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import {
  calculateSmoothedData,
  chartColors,
  isLeapYear,
  monthNames,
} from "../exports";
import { getBackgroundColor } from "../colors";
import { extendedValuesPlugin } from "./HistoricalChartPlugins";

// Define a set of colors for the chart data
Chart.register(extendedValuesPlugin);

interface ChartProps {
  aggregatedData: any[];
  year: number;
}
const HistoricalTemperatureChart = ({ aggregatedData, year }: ChartProps) => {
  const daysInYear = isLeapYear(year) ? 366 : 365;
  // Generate labels for all  days to ensure data for each day is plotted
  const labels = Array.from({ length: daysInYear }, (_, index) => index + 1);
  let globalMin = Math.min(
    ...aggregatedData.flatMap((data) => [
      ...data.high_temperature,
      ...data.low_temperature,
      ...data.apparent_high_temperature,
      ...data.apparent_low_temperature,
    ])
  );
  let globalMax = Math.max(
    ...aggregatedData.flatMap((data) => [
      ...data.high_temperature,
      ...data.low_temperature,
      ...data.apparent_high_temperature,
      ...data.apparent_low_temperature,
    ])
  );

  const datasets = aggregatedData
    .map((locationData, index) => {
      const color = chartColors[index % chartColors.length];
      return [
        // High Temperature
        {
          label: "High Temperature",
          data: locationData.high_temperature.map(
            (temp: any, dayIndex: number) => ({ x: dayIndex + 1, y: temp })
          ),
          backgroundColor: color, // Example: adjust based on your logic
          barThickness: 4,
        },
        // Low Temperature
        {
          label: "Low Temperature",
          data: locationData.low_temperature.map(
            (temp: any, dayIndex: number) => ({ x: dayIndex + 1, y: temp })
          ),

          backgroundColor: color, // Example: adjust based on your logic
          barThickness: 4,
        },
        // Apparent High Temperature
        {
          label: "Apparent High Temperature",
          data: locationData.apparent_high_temperature.map(
            (temp: any, dayIndex: number) => ({ x: dayIndex + 1, y: temp })
          ),

          backgroundColor: color, // Example: adjust based on your logic
          barThickness: 2,
        },
        // Apparent Low Temperature
        {
          label: "Apparent Low Temperature",
          data: locationData.apparent_low_temperature.map(
            (temp: any, dayIndex: number) => ({ x: dayIndex + 1, y: temp })
          ),

          backgroundColor: color, // Example: adjust based on your logic
          barThickness: 2,
        },
      ];
    })
    .flat();

  // Define the chart options
  const options = {
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
        text: "Annual Temperatures",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          // Customizing tooltip title to show "MMM DD"
          title: function (tooltipItems: any) {
            const date = new Date(year, 0, tooltipItems[0].label); // Convert the index back to a date
            return `${monthNames[date.getMonth()]} ${date.getDate()}`; // Format as "MMM DD"
          },
          // Append units to tooltip values
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y.toFixed(0)}°F`; // Append degree symbol and F for Fahrenheit
            }
            return label;
          },
          labelTextColor: function (context: any) {
            const temperature = context.parsed.y;
            return getBackgroundColor(temperature, "Temperature");
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
        grid: {
          drawOnChartArea: false, // Only show the grid for the left Y axis
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
              1, 32, 61, 92, 122, 153, 183, 214, 245, 275, 306, 336,
            ];
            const monthLabels = [
              "Jan 1",
              "Feb 1",
              "Mar 1",
              "Apr 1",
              "May 1",
              "Jun 1",
              "Jul 1",
              "Aug 1",
              "Sep 1",
              "Oct 1",
              "Nov 1",
              "Dec 1",
            ];

            const monthIndex = firstDays.indexOf(value);
            if (monthIndex > -1) {
              return monthLabels[monthIndex];
            }
            return null; // Hide the label for all other days
          },
          autoSkip: false,
          min: 1,
          max: daysInYear,
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
  };

  const data = {
    labels, // Use these labels for plotting
    datasets,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* @ts-ignore */}
      <Line options={options} data={{ labels, datasets }} />
    </div>
  );
};

export default HistoricalTemperatureChart;
