import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

interface GridComponentProps {
  data: { top: Record<string, any>; bottom: Record<string, any> }[];
}
const GridComponent = ({ data }: GridComponentProps) => (
  <Grid container spacing={2}>
    {data.map(({ top, bottom }, index) => (
      <Grid item xs={6} key={index}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {Object.entries(top).map(([key, value], idx) => (
            <Typography
              variant="body1"
              key={idx}
            >{`${key}: ${value}`}</Typography>
          ))}
          {Object.entries(bottom).map(([key, value], idx) => (
            <Typography
              variant="body1"
              key={idx + 100}
            >{`${key}: ${value}`}</Typography>
          ))}
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default GridComponent;
