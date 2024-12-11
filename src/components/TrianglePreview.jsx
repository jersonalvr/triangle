// src/components/TrianglePreview.jsx

import React, { forwardRef } from 'react';
import { calcAlpha, calcBeta, calcGamma, formatAngle } from '../utils/calculations';

const TrianglePreview = forwardRef((props, ref) => {
  const {
    a, b, c, unit, decimals, showSideA, showSideB, showSideC,
    sideLabelFormat, showAngleA, showAngleB, showAngleC,
    angleFormat, angleUnit, parallelLabels,
    lineStyleA, lineStyleB, lineStyleC,
    colorA, colorB, colorC,
    colorAngleA, colorAngleB, colorAngleC,
    labelSize,
  } = props;

  if (!(a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a)) {
    return <div className="p-4">Valores inválidos para un triángulo.</div>;
  }

  // Calcular ángulos:
  const alpha = calcAlpha(a, b, c);
  const beta = calcBeta(a, b, c);
  const gamma = calcGamma(a, b, c);

  // Posicionar puntos:
  const A = { x: 0, y: 0 };
  const B = { x: c, y: 0 };
  const Cx = (b ** 2 - a ** 2 + c ** 2) / (2 * c);
  const Cy = Math.sqrt(b ** 2 - Cx ** 2);
  const C = { x: Cx, y: Cy };

  // Bounding box
  const minX = Math.min(A.x, B.x, C.x);
  const maxX = Math.max(A.x, B.x, C.x);
  const minY = Math.min(A.y, B.y, C.y);
  const maxY = Math.max(A.y, B.y, C.y);
  const width = maxX - minX;
  const height = maxY - minY;

  const margin = 10;
  const viewBox = `${minX - margin} ${minY - margin} ${width + 2 * margin} ${height + 2 * margin}`;

  // Función para obtener el label con sustituciones
  function getSideLabel(sideName, length) {
    let label = sideLabelFormat;

    // Reemplazar 'lado','b','c' por el nombre correcto del lado
    label = label.replace(/lado/g, sideName);

    // Reemplazar 'valor' por el valor del lado con los decimales seleccionados
    const val = length.toFixed(decimals);
    label = label.replace(/valor/g, val);

    // Reemplazar 'unit' por la unidad seleccionada
    label = label.replace(/unit/g, unit);

    return label;
  }

  // Puntos medios de cada lado:
  const midAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  const midBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
  const midCA = { x: (C.x + A.x) / 2, y: (C.y + A.y) / 2 };

  function getTextTransform(p1, p2) {
    if (!parallelLabels) return "";
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    return `rotate(${angle},${(p1.x + p2.x) / 2},${(p1.y + p2.y) / 2})`;
  }

  return (
    <div className="border p-4 overflow-auto" style={{ maxWidth: "100%", maxHeight: "80vh" }}>
      <svg
        ref={ref}
        width="auto"
        height="auto"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lados */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
          stroke={colorC}
          strokeDasharray={lineStyleC}
          strokeWidth="2" />
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y}
          stroke={colorA}
          strokeDasharray={lineStyleA}
          strokeWidth="2" />
        <line x1={C.x} y1={C.y} x2={A.x} y2={A.y}
          stroke={colorB}
          strokeDasharray={lineStyleB}
          strokeWidth="2" />

        {/* Etiquetas de lados */}
        {showSideA && (
          <text
            x={midBC.x}
            y={midBC.y}
            fill={colorA}
            fontSize={labelSize}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={getTextTransform(B, C)}
          >
            {getSideLabel("a", a)}
          </text>
        )}
        {showSideB && (
          <text
            x={midCA.x}
            y={midCA.y}
            fill={colorB}
            fontSize={labelSize}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={getTextTransform(C, A)}
          >
            {getSideLabel("b", b)}
          </text>
        )}
        {showSideC && (
          <text
            x={midAB.x}
            y={midAB.y}
            fill={colorC}
            fontSize={labelSize}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={getTextTransform(A, B)}
          >
            {getSideLabel("c", c)}
          </text>
        )}

        {/* Ángulos */}
        {showAngleA && (
          <>
            {/* Arco del ángulo en A */}
            <path d={`M ${A.x} ${A.y}
              L ${A.x + 10} ${A.y}
              A 10 10 0 0 1 ${A.x + 10 * Math.cos(Math.PI - (beta * Math.PI / 180))} ${A.y + 10 * Math.sin(Math.PI - (beta * Math.PI / 180))}
              Z`}
              fill="none" stroke={colorAngleA} strokeWidth="1" />
            {/* Etiqueta del ángulo A */}
            <text x={A.x + 15} y={A.y} fill={colorAngleA} fontSize={labelSize} textAnchor="start" alignmentBaseline="middle">
              {formatAngle(alpha, angleFormat, angleUnit, "α")}
            </text>
          </>
        )}
        {showAngleB && (
          <>
            {/* Arco del ángulo en B */}
            <path d={`M ${B.x} ${B.y}
              L ${B.x - 10} ${B.y}
              A 10 10 0 0 1 ${B.x - 10 + 10 * Math.cos(Math.PI - (gamma * Math.PI / 180))} ${B.y + 10 * Math.sin(Math.PI - (gamma * Math.PI / 180))}
              Z`}
              fill="none" stroke={colorAngleB} strokeWidth="1" />
            {/* Etiqueta del ángulo B */}
            <text x={B.x - 15} y={B.y} fill={colorAngleB} fontSize={labelSize} textAnchor="end" alignmentBaseline="middle">
              {formatAngle(beta, angleFormat, angleUnit, "β")}
            </text>
          </>
        )}
        {showAngleC && (
          <>
            {/* Arco del ángulo en C */}
            <path d={`M ${C.x} ${C.y}
              L ${C.x} ${C.y - 10}
              A 10 10 0 0 1 ${C.x - 10 * Math.sin(alpha * Math.PI / 180)} ${C.y - 10 * Math.cos(alpha * Math.PI / 180)}
              Z`}
              fill="none" stroke={colorAngleC} strokeWidth="1" />
            {/* Etiqueta del ángulo C */}
            <text x={C.x} y={C.y - 15} fill={colorAngleC} fontSize={labelSize} textAnchor="middle" alignmentBaseline="baseline">
              {formatAngle(gamma, angleFormat, angleUnit, "γ")}
            </text>
          </>
        )}
      </svg>
    </div>
  );
});

export default TrianglePreview;
