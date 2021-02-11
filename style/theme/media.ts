import { Platform } from "react-native";
import type { Thunk } from "../../utils/thunk";

export interface MediaOptions {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  minScale?: number;
  maxScale?: number;
  minResolution?: number;
  maxResolution?: number;
  minFontScale?: number;
  maxFontScale?: number;
  orientation?: "portrait" | "landscape";
  variant?: "browser" | "native";
  platform?: typeof Platform.OS | Array<typeof Platform.OS>;
}

class Media implements MediaOptions {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  minScale?: number;
  maxScale?: number;
  minResolution?: number;
  maxResolution?: number;
  minFontScale?: number;
  maxFontScale?: number;
  orientation?: "portrait" | "landscape";
  variant?: "browser" | "native";
  platform?: typeof Platform.OS | Array<typeof Platform.OS>;

  constructor(mediaOptions: MediaOptions) {
    Object.assign(this, mediaOptions);
  }

  get up(): MediaOptions {
    return Object.keys(this)
      .filter((key) => !key.startsWith("max"))
      .reduce(
        (acc, key) => ({ ...acc, [key]: this[key as keyof MediaOptions] }),
        {}
      );
  }

  get down(): MediaOptions {
    return Object.keys(this)
      .filter((key) => !key.startsWith("min"))
      .reduce(
        (acc, key) => ({ ...acc, [key]: this[key as keyof MediaOptions] }),
        {}
      );
  }
}

const defaultMedia = {
  portrait: { orientation: "portrait" },
  landscape: { orientation: "landscape" },
  ios: { platform: "ios" },
  android: { platform: "android" },
  mobile: { platform: ["ios", "android"] },
  web: { variant: "web" },
  desktop: { platform: ["macos", "windows"] },
  xsmall: new Media({ minWidth: 0, maxWidth: 320 }),
  small: new Media({ minWidth: 321, maxWidth: 768 }),
  medium: new Media({ minWidth: 769, maxWidth: 960 }),
  large: new Media({ minWidth: 961, maxWidth: 1200 }),
  xlarge: new Media({ minWidth: 1201 })
};

export type { Media };
export type ThemeMedia = typeof defaultMedia;
export type ThemeableMediaThunk = Thunk<
  [ThemeMedia],
  MediaOptions | MediaOptions[]
>;
export default defaultMedia;
