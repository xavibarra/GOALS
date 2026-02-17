export const MAP_THEME = {
  // unvisited
  baseFill: "#e8e3dc",
  baseStroke: "#c8bfb5",
  baseStrokeWidth: 0.6,

  // visited
  visitedFill: "#d4a373",
  visitedStroke: "#a48e7a",
  visitedStrokeWidth: 0.8,

  // hover unvisited
  hoverFill: "#f0e8d8",
  hoverStroke: "#a48e7a",
  hoverStrokeWidth: 1,

  // hover visited
  visitedHoverFill: "#c49060",
  visitedHoverStroke: "#8a7060",
  visitedHoverStrokeWidth: 1,

  // pressed
  pressedFill: "#b87d52",

  // ocean / map background
  oceanBg: "#b9e2fc46",
};

export function getCountryStyle(isDone) {
  return {
    default: {
      fill: isDone ? MAP_THEME.visitedFill : MAP_THEME.baseFill,
      stroke: isDone ? MAP_THEME.visitedStroke : MAP_THEME.baseStroke,
      strokeWidth: isDone
        ? MAP_THEME.visitedStrokeWidth
        : MAP_THEME.baseStrokeWidth,
      outline: "none",
    },
    hover: {
      fill: isDone ? MAP_THEME.visitedHoverFill : MAP_THEME.hoverFill,
      stroke: isDone ? MAP_THEME.visitedHoverStroke : MAP_THEME.hoverStroke,
      strokeWidth: isDone
        ? MAP_THEME.visitedHoverStrokeWidth
        : MAP_THEME.hoverStrokeWidth,
      outline: "none",
      cursor: "pointer",
    },
    pressed: {
      fill: MAP_THEME.pressedFill,
      stroke: MAP_THEME.visitedStroke,
      strokeWidth: 1,
      outline: "none",
    },
  };
}
