import { Thunk } from "../../utils/thunk";

export interface ColorSpec {
  fill?: string;
  placement?: string;
  border?: string;
}

export const defaultColors = {
  inherited: {},
  primary: { fill: "#6200EE", placement: "#ffffff" },
  secondary: { fill: "#ffffff", placement: "#6200EE", border: "#6200EE" },
  background: { fill: "#ffffff", placement: "#000000" },
  surface: { fill: "#dedede", placement: "#000000" },
  error: { fill: "#b00020", placement: "#ffffff" },
  warning: { fill: "#fff000", placement: "#000000" },
  success: { fill: "#00a600", placement: "#ffffff" },
  info: { fill: "#0090cc", placement: "#ffffff" }
};
export type ColorProp = keyof typeof defaultColors;
export type ThemeColors = Record<ColorProp, ColorSpec>;
export type ThemeableColorThunk = Thunk<[ThemeColors], ColorSpec>;
export default defaultColors as ThemeColors;
