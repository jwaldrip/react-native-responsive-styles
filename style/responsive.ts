import type { ImageStyle, TextStyle, ViewStyle } from "./styles";
import type { MediaOptions } from "./theme/media";

export type ResponsiveOrStyle<T extends ViewStyle | TextStyle | ImageStyle> =
  | Responsive<T>
  | T;

export type ResponsiveStyleType<T extends ViewStyle | TextStyle | ImageStyle> =
  | ResponsiveOrStyle<T>
  | Array<ResponsiveOrStyle<T>>;

export type NamedResponsiveStyles<T> = {
  [P in keyof T]: ResponsiveStyleType<ViewStyle | TextStyle | ImageStyle>;
};

export type ExtractStyleType<T> = T extends ResponsiveStyleType<infer S>
  ? S
  : never;

export class Responsive<T extends ViewStyle | TextStyle | ImageStyle> {
  constructor(
    public readonly media: MediaOptions | MediaOptions[],
    public readonly style: T,
    public readonly inverted: boolean = false
  ) {}
}

export function responsive<T extends ViewStyle | TextStyle | ImageStyle>(
  mediaQuery: MediaOptions,
  style: T
) {
  return new Responsive(mediaQuery, style);
}

responsive.not = function <T extends ViewStyle | TextStyle | ImageStyle>(
  mediaQuery: MediaOptions,
  style: T
) {
  return new Responsive(mediaQuery, style, true);
};
