import { useMemo } from "react";
import { Dimensions, Platform, useWindowDimensions } from "react-native";

export type ViewportState = ReturnType<typeof Dimensions.get> & {
  platform: typeof Platform.OS;
  orientation: "portrait" | "landscape";
  variant: "browser" | "native";
  resolution: number;
};

export function useViewport(): ViewportState {
  const { height, width, scale, fontScale } = useWindowDimensions();
  return useMemo(() => getViewport({ height, width, scale, fontScale }), [
    height,
    width,
    scale,
    fontScale
  ]);
}

export function getViewport(
  windowDimensions: ReturnType<typeof Dimensions.get>
): ViewportState {
  const { height, width, scale } = windowDimensions;
  return {
    ...windowDimensions,
    resolution: 160 * scale,
    orientation: height >= width ? "portrait" : "landscape",
    platform: Platform.OS,
    variant: Platform.OS === "web" ? "browser" : "native"
  };
}
