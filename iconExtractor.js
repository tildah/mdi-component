import * as icons from "/node_modules/@mdi/js/mdi.js";

export function getPath(iconName) {
  let capitalized = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  return icons[`mdi${capitalized}`]
}