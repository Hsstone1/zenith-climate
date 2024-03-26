import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { calculateSmoothedData, chartColors, monthNames } from "../exports";
import { getBackgroundColor } from "../colors";
import { extendedValuesPlugin } from "./ChartPlugins";

Chart.register(extendedValuesPlugin);

interface ChartProps {
  aggregatedData: any[];
  type: "Rain" | "Snow";
}

const PrecipChart = ({ aggregatedData, type }: ChartProps) => {
  const datasets = aggregatedData
    .map((locationData, index) => {
      const color = chartColors[index % chartColors.length];
      // Calculate the smoothed data for precipLineData
      let precipLineData = [];
      let precipBarData = [];
      const smoothDays = 14; // Days to average over

      if (type === "Rain") {
        precipLineData = calculateSmoothedData(
          locationData.precipitation,
          smoothDays
        ).map((value: number) => value * 30);
        precipBarData = calculateSmoothedData(
          locationData.precip_days,
          smoothDays
        ).map((value: number) => value * 30);
      } else {
        precipLineData = calculateSmoothedData(
          locationData.snow,
          smoothDays
        ).map((value: number) => value * 30);
        precipBarData = calculateSmoothedData(
          locationData.snow_days,
          smoothDays
        ).map((value: number) => value * 30);
      }

      return [
        {
          type: "line",

          label: `${type}`,
          data: precipLineData,
          borderColor: color,
          borderWidth: 2,
          backgroundColor: "transparent",
          tension: 0.4,
          yAxisID: "y", // Use the primary Y axis for the line
        },
        // {
        //   type: "line",
        //   label: type == "Rain" ? `Rain Days` : `Snow Days`,
        //   data: precipBarData.map((value: any, index: any) => ({
        //     x: index + 1,
        //     y: value,
        //   })),
        //   borderColor: color,
        //   borderWidth: 0,
        //   backgroundColor: `${color}50`,
        //   fill: true,
        //   yAxisID: "y1", // Use the secondary Y axis for the bars
        // },
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
        text: type === "Rain" ? "Annual Rainfall" : "Annual Snowfall",
        font: {
          size: 16,
        },
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
              // Check if the label contains the word "day"
              const unit = label.toLowerCase().includes("day") ? "days" : "in";
              label += `${context.parsed.y.toFixed(0)} ${unit}`;
            }
            return label;
          },
          labelTextColor: function (context: any) {
            const precip = context.parsed.y;
            return getBackgroundColor(precip / 12, "Precip");
          },
        },
      },
    },

    scales: {
      y: {
        // Primary Y-axis for the line chart
        beginAtZero: true,
        position: "left",
        ticks: {
          callback: function (value: any) {
            return `${value} in`;
          },
        },
      },
      y1: {
        // Secondary Y-axis for the bar chart
        beginAtZero: true,
        max: 30,
        position: "right",
        grid: {
          drawOnChartArea: false, // Only show the grid for the left Y axis
        },
        ticks: {
          callback: function (value: any) {
            return `${value} days`; // Days of precipitation/snow
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
    interaction: {
      mode: "nearest", // Replace "string" with one of the valid options
      intersect: false,
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
      {/* @ts-ignore */}
      <Line options={options} data={{ labels, datasets }} />
    </div>
  );
};

export default PrecipChart;
