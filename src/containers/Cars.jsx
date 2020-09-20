import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";

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
    <>
      <Grid container>
        {cars.map((car) => (
          <Grid
            container
            item
            justify="center"
            style={{ background: car.color }}
            key={car.name}
          >
            <Grid item>
              <Typography variant="h2" gutterBottom>
                {car.name}
              </Typography>
            </Grid>
            <Grid container item>
              {Array.from(new Array(car.imagesCount).keys()).map((value) => (
                <Grid item key={value} xs={12} md={4}>
                  <img
                    src={`https://cdn.gugelong.com/cars/${car.name}/${
                      value + 1
                    }.${car.extension}!/compress/true/fw/800`}
                    width="100%"
                    alt={`${car.name}_${value + 1}`}
                    style={{ paddingBottom: 8 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
