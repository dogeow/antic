import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const cars = [
  {
    name: "Supra",
    imagesCount: 9,
    color: "#999999",
  },
  {
    name: "Mustang",
    imagesCount: 6,
    color: "#edf348",
  },
  {
    name: "AMG",
    imagesCount: 5,
    color: "#c0c5d2",
  },
];

export default function Cars() {
  return (
    <>
      <Grid container spacing={2}>
        {cars.map((car) => {
          return (
            <Grid
              container
              item
              spacing={2}
              key={car.name}
              style={{ background: car.color }}
            >
              <Grid item>
                <Typography variant="h2" gutterBottom>
                  {car.name}
                </Typography>
              </Grid>
              <Grid container item spacing={2}>
                {Array.from(new Array(car.imagesCount).keys()).map((value) => {
                  return (
                    <Grid item key={value} xs={12} md={4}>
                      <img
                        src={`https://cdn.gugelong.com/cars/${car.name}/${
                          value + 1
                        }.jpeg`}
                        alt={`Supra_${value + 1}`}
                        width="100%"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
