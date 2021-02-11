import React, {
  ReactNode,
  createContext,
  DependencyList,
  useContext
} from "react";
import media from "./media";
import colors from "./colors";
import measurements from "./measurements";
import fonts from "./fonts";
import { Thunk, useThunk } from "../../utils/thunk";

export type ThemeableThunk<T> = Thunk<[Theme], T>;

const defaultTheme = {
  measurements,
  colors,
  media,
  fonts
};

export type Theme = typeof defaultTheme;
const ThemeContext = createContext<Theme>(defaultTheme);

export default defaultTheme;
export const ThemeProvider = ({
  theme,
  children
}: {
  theme: Theme;
  children: ReactNode;
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
export const useTheme = () => useContext(ThemeContext);
export function useThemeable<T>(
  thunk: ThemeableThunk<T>,
  deps: DependencyList = []
): T {
  return useThunk(thunk, [useTheme()], deps);
}
