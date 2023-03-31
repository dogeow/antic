import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { CDN_URL } from "../../config/services";

const cars = [
  {
    name: "Supra",
    imagesCount: 9,
    color: "#999999",
    extension: "jpeg",
  },
  {
    name: "Mustang",
    imagesCount: 6,
    color: "#edf348",
    extension: "jpeg",
  },
  {
    name: "Camry",
    imagesCount: 6,
    color: "#2c4fb1",
    extension: "jpg",
  },
  {
    name: "Model3",
    imagesCount: 6,
    color: "#ad2c2b",
    extension: "jpg",
  },
];

export default function Cars() {
  return (
    <div>
      {cars.map((car) => (
        <div style={{ background: car.color }} key={car.name}>
          <Typography variant="h2" gutterBottom>
            {car.name}
          </Typography>
          <Grid container>
            {Array.from(new Array(car.imagesCount).keys()).map((value) => (
              <Grid item key={value} xs={12} md={4}>
                <img
                  src={`${CDN_URL}/cars/${car.name}/${value + 1}.${car.extension}!/compress/true/fw/800`}
                  width="100%"
                  alt={`${car.name}_${value + 1}`}
                  style={{ paddingBottom: 16 }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}
