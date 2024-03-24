import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { containerColor } from "../exports";

interface GridComponentProps {
  data: {
    top: Record<string, any>;
    bottom: Record<string, any>;
  }[];
}

const GridComponent = ({ data }: GridComponentProps) => (
  <Grid container spacing={2}>
    {data.map(({ top, bottom }, index) => (
      <Grid item xs={6} key={index}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#ffffff",
          }}
        >
          {Object.entries(top).map(([key, { value, color }], idx) => (
            <Typography variant="body2" key={idx}>
              <span>{`${key}: `}</span>
              <span style={{ color, fontWeight: "bold" }}>{value}</span>
            </Typography>
          ))}
          {Object.entries(bottom).map(([key, { value, color }], idx) => (
            <Typography variant="body2" key={idx + 5000}>
              <span>{`${key}: `}</span>
              <span style={{ color, fontWeight: "bold" }}>{value}</span>
            </Typography>
          ))}
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default GridComponent;
