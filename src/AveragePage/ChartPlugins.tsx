export const extendedValuesPlugin = {
  id: "extendedValuesPlugin",
  afterDatasetsDraw: (chart: any) => {
    const ctx = chart.ctx;
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    let annotatedPositions: any[] = [];

    // Proximity check function
    const isTooClose = (
      newPosition: any,
      annotatedPositions: any,
      minDistance = 25
    ) => {
      return annotatedPositions.some(
        (pos: any) =>
          Math.sqrt(
            Math.pow(newPosition.x - pos.x, 2) +
              Math.pow(newPosition.y - pos.y, 2)
          ) < minDistance
      );
    };

    chart.data.datasets.forEach((dataset: any, i: any) => {
      if (!chart.getDatasetMeta(i).hidden) {
        const maxValue = Math.max(...dataset.data);
        const minValue = Math.min(...dataset.data);
        const maxThresholdValue = maxValue * 0.75;
        const minThresholdValue = minValue * 1.25;

        dataset.data.forEach((value: any, index: any) => {
          // Check for values within the threshold of min and max
          if (value >= maxThresholdValue || value <= minThresholdValue) {
            const position = chart
              .getDatasetMeta(i)
              .data[index].getCenterPoint();

            // Only annotate the value if it's not too close to others
            if (!isTooClose(position, annotatedPositions, 75)) {
              annotateValue(
                ctx,
                value,
                dataset,
                index,
                chart.getDatasetMeta(i)
              );
              annotatedPositions.push(position); // Track the position of annotated value
            }
          }
        });
      }
    });
  },
};

// Helper function to annotate values
function annotateValue(
  ctx: any,
  value: any,
  dataset: any,
  index: any,
  meta: any
) {
  const position = meta.data[index].getCenterPoint();
  let unit = "";
  if (dataset.label.toLowerCase().includes("temperature")) {
    unit = "°F";
  } else if (dataset.label.toLowerCase().includes("day")) {
    unit = "days";
  } else if (
    dataset.label.toLowerCase().includes("snow") ||
    dataset.label.toLowerCase().includes("rain")
  ) {
    unit = "in";
  }
  const text = `${value.toFixed(0)} ${unit}`;

  ctx.fillStyle = dataset.borderColor || "black";
  ctx.fillText(text, position.x, position.y - 5);
}
