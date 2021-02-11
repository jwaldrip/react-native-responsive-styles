import React, { ReactNode } from "react";
import { useTheme, ThemeProvider } from "./theme";
import { ThemeColors, ColorProp, ThemeableColorThunk } from "./theme/colors";
import { useThunk } from "../utils/thunk";

export function ColorProvider({
  color,
  children
}: {
  color: ThemeableColorThunk | ColorProp;
  children: ReactNode;
}) {
  const theme = useTheme();
  const thunk =
    typeof color === "string" ? (colors: ThemeColors) => colors[color] : color;
  const nextColorSpec = useThunk(thunk, [theme.colors]);
  if (color === "inherited") return children;
  const nextTheme = { ...theme };
  nextTheme.colors.inherited = { ...theme.colors.inherited, ...nextColorSpec };
  return <ThemeProvider theme={nextTheme}>{children}</ThemeProvider>;
}
