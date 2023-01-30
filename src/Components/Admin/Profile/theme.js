const red = "#f2155f";
const blue = "#4e59d8";
const green = "#169957";
const grey = "#ddd";
const black = "#030D20";
const white = "white";

const color = {
  red,
  blue,
  black,
  green,
  grey,
  white,
  primary: blue,
  secondary: green,
  error: red,
};

const unit = 8;

const measurements = {
  tiny: unit / 4,
  xs: unit / 2,
  sm: unit,
  md: unit * 2,
  lg: unit * 4,
  xl: unit * 6,
  huge: unit * 8,
};

const font = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  fontSize: unit * 2,
};

export const theme = {
  unit,
  color,
  measurements,
  font,
};
