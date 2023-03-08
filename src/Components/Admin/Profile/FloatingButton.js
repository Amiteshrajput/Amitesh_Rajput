import styled from "@emotion/styled";
import { theme } from "./theme";

const excludedProps = ["background", "bottomOffset", "color", "rightOffset"];

const shouldForwardProp = (p) => !excludedProps.includes(p);

export const FloatingButton = styled("button", { shouldForwardProp })(
  ({
    background,
    bottomOffset = "130px",
    color = theme.color.black,
    rightOffset = "130px",
  }) => ({
    ...theme.font,
    background: background ?? theme.color.grey,
    border: "none",
    borderRadius: theme.measurements.lg,
    bottom: bottomOffset,
    boxShadow: `0 ${theme.measurements.tiny}px ${theme.unit}px 0 hsla(100, 0%, 0%, 0.25)`,
    boxSizing: "border-box",
    color,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    height: theme.measurements.xl,
    letterSpacing: 0.25,
    lineHeight: 1,
    zIndex:10000,
    margin: 0,
    minWidth: theme.measurements.xl,
    padding: theme.measurements.md,
    position: "fixed",
    right: rightOffset,
    WebkitAppearance: "none",
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 ${theme.measurements.tiny}px ${
        theme.color.white
      }, 0 0 0 ${theme.measurements.xs}px ${background ?? theme.color.primary}`,
    },
  })
);
