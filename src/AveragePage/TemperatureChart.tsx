import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { calculateSmoothedData, chartColors, monthNames } from "../exports";
import { getBackgroundColor } from "../colors";
import { extendedValuesPlugin } from "./ChartPlugins";

// Define a set of colors for the chart data
Chart.register(extendedValuesPlugin);

interface ChartProps {
  aggregatedData: any[];
}
const TemperatureChart = ({ aggregatedData }: ChartProps) => {
  const smoothDays = 14;
  const downsampleFactor =
    aggregatedData.length > 1 ? Math.min(aggregatedData.length - 1, 7) : 1;
  let globalMin = Math.min(
    ...aggregatedData.flatMap((data) => [
      ...data.high_temperature,
      ...data.low_temperature,
      ...data.apparent_high_temperature,
      ...data.apparent_low_temperature,
      ...data.expected_max,
      ...data.expected_min,
    ])
  );
  let globalMax = Math.max(
    ...aggregatedData.flatMap((data) => [
      ...data.high_temperature,
      ...data.low_temperature,
      ...data.apparent_high_temperature,
      ...data.apparent_low_temperature,
      ...data.expected_max,
      ...data.expected_min,
    ])
  );

  const downsampleToWeekly = (data: any[]) => {
    const downsampledData = data.reduce(
      (
        acc: { x: number; y: number }[],
        curr: any,
        index: number,
        array: any[]
      ) => {
        if (index % downsampleFactor === 0) {
          // Calculate the average for the week
          const weekSlice = array.slice(index, index + downsampleFactor);
          if (Array.isArray(weekSlice)) {
            // Add type guard
            const weekAverage =
              weekSlice.reduce((sum: number, value: number) => sum + value, 0) /
              weekSlice.length;
            // Determine the x-axis index for this week's average
            const xIndex = index + 1; // Use '+1' to align with the day of the year
            acc.push({ x: xIndex, y: weekAverage });
          }
        }
        return acc;
      },
      []
    );

    // Ensure the last data point is at day 366 if not already
    if (
      downsampledData.length > 0 &&
      downsampledData[downsampledData.length - 1].x < 366
    ) {
      const lastDataPoint = downsampledData[downsampledData.length - 1];
      downsampledData.push({ x: 366, y: lastDataPoint.y }); // Duplicate the last data point at day 366
    }

    return downsampledData;
  };

  const datasets = aggregatedData
    .map((locationData, index) => {
      const color = chartColors[index % chartColors.length];
      // High and Low Temperature dataset
      const highTemperatureData = calculateSmoothedData(
        locationData.high_temperature || [],
        smoothDays
      );

      const lowTemperatureData = calculateSmoothedData(
        locationData.low_temperature || [],
        smoothDays
      );
      // Apparent High and Low Temperature dataset (dashed lines)
      const apparentHighTemperatureData = downsampleToWeekly(
        calculateSmoothedData(
          locationData.apparent_high_temperature || [],
          smoothDays
        )
      );

      const apparentLowTemperatureData = downsampleToWeekly(
        calculateSmoothedData(
          locationData.apparent_low_temperature || [],
          smoothDays
        )
      );

      // Expected Max and Min Temperature dataset (fill)
      const expectedMaxData = downsampleToWeekly(
        calculateSmoothedData(locationData.expected_max || [], smoothDays)
      );
      const expectedMinData = downsampleToWeekly(
        calculateSmoothedData(locationData.expected_min || [], smoothDays)
      );

      return [
        {
          label: `High Temperature`,
          data: highTemperatureData,
          borderColor: color,
          borderWidth: 2,
          backgroundColor: "transparent",
          tension: 0.8,
          yAxisID: "y",
        },
        {
          label: `Low Temperature`,
          data: lowTemperatureData,
          borderColor: color,
          borderWidth: 2,
          backgroundColor: "transparent",
          tension: 0.8,
          yAxisID: "y",
        },
        {
          label: `Apparent High Temperature`,
          data: apparentHighTemperatureData,
          borderColor: color,
          borderDash: [10, 5],
          borderWidth: 0.5,
          backgroundColor: "transparent",
          tension: 0.4,
          yAxisID: "y",
        },
        {
          label: `Apparent Low Temperature`,
          data: apparentLowTemperatureData,
          borderColor: color,
          borderDash: [10, 5],
          borderWidth: 0.5,

          backgroundColor: "transparent",
          tension: 0.4,
          yAxisID: "y",
        },
        {
          label: `Expected Max Temperature`,
          data: expectedMaxData,
          borderColor: color,
          borderWidth: 0,
          backgroundColor: "transparent",
          tension: 0.4,
          yAxisID: "y1",
        },
        {
          label: `Expected Min Temperature`,
          data: expectedMinData,
          borderColor: color,
          borderWidth: 0,
          backgroundColor: `${color}20`, // Light opacity fill between max and min
          fill: "-1", // Fill to the previous dataset
          tension: 0.4,
          yAxisID: "y1",
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
    interaction: {
      mode: "nearest", // Replace "string" with one of the valid options
      intersect: false,
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

  // return (
  //   <div style={{ width: "100%", height: "100%" }}>
  //     {" "}
  //     {/* Adjust the height as needed */}
  //     <Line
  //       options={{
  //         ...options,
  //         plugins: {
  //           ...options.plugins,
  //           legend: { ...options.plugins.legend, position: "top" },
  //         },
  //         interaction: {
  //           mode: "nearest", // Replace "string" with one of the valid options
  //           intersect: false,
  //         },
  //         scales: {
  //           ...options.scales,
  //           x: {
  //             ...options.scales.x,
  //             type: "linear",
  //           },
  //         },
  //       }}
  //       data={data}
  //     />
  //   </div>
  // );
};

export default TemperatureChart;
