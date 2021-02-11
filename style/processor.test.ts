import { responsive } from "./responsive";
import { forViewport } from "./processor";
import theme from "./theme";
import { getViewport } from "./viewport";

describe("forViewport", () => {
  it("removes unused breakpoints from the stylesheet", () => {
    const styles = {
      text: {
        color: "#ffffff"
      },
      container: [
        responsive(theme.media.xsmall, { width: "50%" }),
        { padding: 0 }
      ]
    };
    expect(
      forViewport(
        styles,
        getViewport({
          width: 1200,
          height: 0,
          scale: 0,
          fontScale: 0
        })
      )
    ).toMatchObject({
      text: { color: "#ffffff" },
      container: { padding: 0 }
    });
  });

  it("handles inverted styles", () => {
    const styles = {
      text: {
        color: "#ffffff"
      },
      container: [
        responsive.not(theme.media.large, { width: "50%" }),
        { padding: 0 }
      ]
    };
    expect(
      forViewport(
        styles,
        getViewport({
          width: 1100,
          height: 0,
          scale: 0,
          fontScale: 0
        })
      )
    ).toMatchObject({
      text: { color: "#ffffff" },
      container: { padding: 0 }
    });
  });

  it("adds styles matching the current breakpoint", () => {
    const styles = {
      text: {
        color: "#ffffff"
      },
      container: [
        responsive(theme.media.large, { width: "50%" }),
        { padding: 0 }
      ]
    };
    expect(
      forViewport(
        styles,
        getViewport({
          width: 1100,
          height: 0,
          scale: 0,
          fontScale: 0
        })
      )
    ).toMatchObject({
      text: { color: "#ffffff" },
      container: { padding: 0, width: "50%" }
    });
  });

  it("adds overrides styles with multiple matches", () => {
    const styles = {
      text: {
        color: "#ffffff"
      },
      container: [
        responsive(theme.media.medium, { width: "50%" }),
        responsive(
          {
            minWidth: theme.media.small.minWidth,
            maxWidth: theme.media.large.maxWidth
          },
          { width: "75%" }
        ),
        { padding: 0 }
      ]
    };
    expect(
      forViewport(
        styles,
        getViewport({
          width: 1100,
          height: 0,
          scale: 0,
          fontScale: 0
        })
      )
    ).toMatchObject({
      text: { color: "#ffffff" },
      container: { padding: 0, width: "75%" }
    });
  });
});
