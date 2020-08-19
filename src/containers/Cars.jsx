import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
    name: "AMG",
    imagesCount: 6,
    color: "#c0c5d2",
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
    <>
      <Grid container>
        {cars.map((car) => {
          return (
            <Grid
              container
              item
              spacing={2}
              justify="center"
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
                        }.${car.extension}!/fw/800`}
                        alt={`${car.name}_${value + 1}`}
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
