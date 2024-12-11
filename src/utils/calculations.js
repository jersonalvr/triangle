const RAD_TO_DEG = 180 / Math.PI;

export function calcAlpha(a, b, c) {
  return Math.acos((b**2 + c**2 - a**2)/(2*b*c)) * RAD_TO_DEG;
}

export function calcBeta(a, b, c) {
  return Math.acos((a**2 + c**2 - b**2)/(2*a*c)) * RAD_TO_DEG;
}

export function calcGamma(a, b, c) {
  return Math.acos((a**2 + b**2 - c**2)/(2*a*b)) * RAD_TO_DEG;
}

export function toRadians(deg) {
  return deg * (Math.PI / 180);
}

export function formatAngle(value, format, unit, symbol) {
  // format puede ser "symbolOnly", "symbolValue", "valueOnly"
  // unit puede ser "degrees", "radians", "celsius"
  let angle = value;
  
  if (unit === "radians") {
    angle = toRadians(value);
  }

  let suffix = "";
  if (unit === "degrees") suffix = "°";
  else if (unit === "celsius") suffix = "°C";

  if (format === "symbolOnly") return symbol;
  if (format === "symbolValue") return `${symbol} = ${angle.toFixed(2)}${suffix}`;
  if (format === "valueOnly") return `${angle.toFixed(2)}${suffix}`;
  
  return `${angle.toFixed(2)}${suffix}`;
}
