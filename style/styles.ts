import { useMemo, DependencyList } from "react";
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import {
  Responsive,
  NamedResponsiveStyles,
  ResponsiveStyleType,
  ExtractStyleType
} from "./responsive";
import { useThunk, ExtractThunk } from "../utils/thunk";
import type { MediaOptions, ThemeableMediaThunk } from "./theme/media";
import { useViewport, ViewportState } from "./viewport";
import { useTheme, useThemeable, ThemeableThunk } from "./theme";

// export type StyleType = ViewStyle | TextStyle | ImageStyle;
// export type NamedStyles<T> = { [P in keyof T]: StyleType };

export type { ViewStyle, TextStyle, ImageStyle };

function checkMinKey(
  key: string,
  value: number,
  viewport: ViewportState
): boolean {
  const viewportKey = key.split("min")[1].toLowerCase() as keyof ViewportState;
  return viewport[viewportKey] >= value;
}

function checkMaxKey(
  key: string,
  value: number,
  viewport: ViewportState
): boolean {
  const viewportKey = key.split("max")[1].toLowerCase() as keyof ViewportState;
  return viewport[viewportKey] <= value;
}

function checkExactKey<T extends unknown | unknown[]>(
  key: string,
  value: T,
  viewport: ViewportState
): boolean {
  if (Array.isArray(value)) {
    return value.some((item) => checkExactKey(key, item, viewport));
  }
  return viewport[key as keyof ViewportState] === value;
}

const flattenMedia = (media: MediaOptions | MediaOptions[]) =>
  Array.isArray(media)
    ? media.reduce<MediaOptions>((acc, item) => ({ ...acc, ...item }), {})
    : media;

function matchesViewport(
  media: MediaOptions | MediaOptions[],
  viewport: ViewportState
): boolean {
  const mediaOptions = flattenMedia(media);
  return Object.keys(mediaOptions).every((key: string) => {
    const value = mediaOptions[key as keyof MediaOptions];
    if (typeof value === "undefined") return true;
    if (key.startsWith("min") && typeof value === "number") {
      return checkMinKey(key, value, viewport);
    }
    if (key.startsWith("max") && typeof value === "number") {
      return checkMaxKey(key, value, viewport);
    }
    return checkExactKey(key, value, viewport);
  });
}

function processStyle<T extends ViewStyle | TextStyle | ImageStyle>(
  style: ResponsiveStyleType<T>,
  viewport: ViewportState
): T {
  if (Array.isArray(style)) {
    return style
      .map((item) => processStyle(item, viewport))
      .reduce((acc, item) => ({ ...acc, ...item }));
  }
  if (style instanceof Responsive) {
    const doesMatch = matchesViewport(style.media, viewport);
    const shouldReturnStyle =
      (doesMatch && !style.inverted) || (!doesMatch && style.inverted);
    if (shouldReturnStyle) return style.style;
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as T;
  }
  return style;
}

export function useMatchesViewport(media: ThemeableMediaThunk): boolean {
  const mediaOptions = useThunk(media, [useTheme().media]);
  const viewport = useViewport();
  return matchesViewport(mediaOptions, viewport);
}

export function useStyles<
  T extends NamedResponsiveStyles<T> | NamedResponsiveStyles<any>
>(
  styles: ThemeableThunk<T | NamedResponsiveStyles<T>>,
  deps?: DependencyList
): StyleSheet.NamedStyles<
  { [P in keyof T]: ExtractStyleType<ExtractThunk<typeof styles>[P]> }
> {
  const themedStyles = useThemeable(styles, deps);
  const viewport = useViewport();
  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const result = {} as {
      [P in keyof ExtractThunk<typeof styles>]: ExtractStyleType<
        ExtractThunk<typeof styles>[P]
      >;
    };
    for (const key in themedStyles) {
      result[key] = processStyle(themedStyles[key], viewport) as any;
    }
    return StyleSheet.create(result);
  }, [themedStyles, viewport]);
}
