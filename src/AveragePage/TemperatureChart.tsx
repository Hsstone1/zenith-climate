import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getColorForTemperatureF } from "../exports";
import { getBackgroundColor } from "../colors";

// Define a set of colors for the chart data
const chartColors = ["#ADD8E6", "#FFC0CB", "#D8BFD8", "#FFE4E1", "#90EE90"];
const monthNames = [
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

const getColorForTemperature = (temperature: number) => {
  if (temperature >= 90) return "#ff4500"; // Red
  if (temperature >= 32 && temperature < 90) return "#6495ed"; // Blue
  return "#800080"; // Purple for temperatures below 32
};

interface TemperatureChartProps {
  aggregatedData: any[];
}
const TemperatureChart = ({ aggregatedData }: TemperatureChartProps) => {
  const datasets = aggregatedData
    .map((locationData, index) => {
      const color = chartColors[index % chartColors.length];

      // High and Low Temperature dataset
      const highTemperatureData = locationData.high_temperature || [];
      const lowTemperatureData = locationData.low_temperature || [];

      // Apparent High and Low Temperature dataset (dashed lines)
      const apparentHighTemperatureData =
        locationData.apparent_high_temperature || [];
      const apparentLowTemperatureData =
        locationData.apparent_low_temperature || [];

      // Expected Max and Min Temperature dataset (fill)
      const expectedMaxData = locationData.expected_max || [];
      const expectedMinData = locationData.expected_min || [];

      return [
        {
          label: `High Temperature`,
          data: highTemperatureData,
          borderColor: color,
          borderWidth: 2,
          backgroundColor: "transparent",
          tension: 0.4,
        },
        {
          label: `Low Temperature`,
          data: lowTemperatureData,
          borderColor: color,
          borderWidth: 2,

          backgroundColor: "transparent",
          tension: 0.4,
        },
        {
          label: `Apparent High Temperature`,
          data: apparentHighTemperatureData,
          borderColor: color,
          borderDash: [10, 5],
          borderWidth: 1,

          backgroundColor: "transparent",
          tension: 0.4,
        },
        {
          label: `Apparent Low Temperature`,
          data: apparentLowTemperatureData,
          borderColor: color,
          borderDash: [10, 5],
          borderWidth: 1,

          backgroundColor: "transparent",
          tension: 0.4,
        },
        {
          label: `Expected Max Temperature`,
          data: expectedMaxData,
          borderColor: color,
          borderWidth: 0,
          backgroundColor: "transparent",
          tension: 0.4,
        },
        {
          label: `Expected Min Temperature`,
          data: expectedMinData,
          borderColor: color,
          borderWidth: 0,
          backgroundColor: `${color}33`, // Light opacity fill between max and min
          fill: "-1", // Fill to the previous dataset
          tension: 0.4,
        },
      ];
    })
    .flat();

  // Define the chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature Chart",
      },
      tooltip: {
        callbacks: {
          // Customizing tooltip title to show "MMM DD"
          title: function (tooltipItems: any) {
            const date = new Date(2020, 0, tooltipItems[0].label); // Convert the index back to a date
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
        ticks: {
          // Append units to y-axis labels
          callback: function (value: any) {
            return `${value}°F`; // Append degree symbol and F for Fahrenheit
          },
        },
      },
      x: {
        type: "linear", // Ensure the axis is treated as linear
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
          max: 366,
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
  };

  // Generate labels for all 366 days to ensure data for each day is plotted
  const labels = Array.from({ length: 366 }, (_, index) => index + 1);

  const data = {
    labels, // Use these labels for plotting
    datasets,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {" "}
      {/* Adjust the height as needed */}
      <Line
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            legend: { ...options.plugins.legend, position: "top" },
          },
          interaction: {
            mode: "nearest", // Replace "string" with one of the valid options
            intersect: false,
          },
          scales: {
            ...options.scales,
            x: {
              ...options.scales.x,
              type: "linear",
            },
          },
        }}
        data={data}
      />
    </div>
  );
};

export default TemperatureChart;
