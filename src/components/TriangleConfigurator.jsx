// src/components/TriangleConfigurator.jsx

import React, { useState } from 'react';

const unitsList = ["cm", "m", "km", "in", "ft"];
const lineStyles = [
  { label: "Continuo", value: "solid" },
  { label: "Punteado", value: "5,5" },
  { label: "Puntos", value: "1,5" },
];

export default function TriangleConfigurator({ onChange }) {
  const [a, setA] = useState(100);
  const [b, setB] = useState(100);
  const [c, setC] = useState(100);
  const [unit, setUnit] = useState("cm");
  const [showSideA, setShowSideA] = useState(true);
  const [showSideB, setShowSideB] = useState(true);
  const [showSideC, setShowSideC] = useState(true);

  const [sideLabelFormat, setSideLabelFormat] = useState("lado"); 

  const [showAngleA, setShowAngleA] = useState(false);
  const [showAngleB, setShowAngleB] = useState(false);
  const [showAngleC, setShowAngleC] = useState(false);

  const [angleFormat, setAngleFormat] = useState("symbolValue"); 
  const [angleUnit, setAngleUnit] = useState("degrees");

  const [parallelLabels, setParallelLabels] = useState(false);

  const [lineStyleA, setLineStyleA] = useState("solid");
  const [lineStyleB, setLineStyleB] = useState("solid");
  const [lineStyleC, setLineStyleC] = useState("solid");

  const [colorA, setColorA] = useState("#ff0000");
  const [colorB, setColorB] = useState("#00ff00");
  const [colorC, setColorC] = useState("#0000ff");

  const [colorAngleA, setColorAngleA] = useState("#ff0000");
  const [colorAngleB, setColorAngleB] = useState("#00ff00");
  const [colorAngleC, setColorAngleC] = useState("#0000ff");

  const [labelSize, setLabelSize] = useState(12); // Nuevo estado para el tamaño de la etiqueta

  function handleChange() {
    onChange({
      a: parseFloat(a),
      b: parseFloat(b),
      c: parseFloat(c),
      unit,
      showSideA, showSideB, showSideC,
      sideLabelFormat,
      showAngleA, showAngleB, showAngleC,
      angleFormat,
      angleUnit,
      parallelLabels,
      lineStyleA, lineStyleB, lineStyleC,
      colorA, colorB, colorC,
      colorAngleA, colorAngleB, colorAngleC,
      labelSize, // Pasar el tamaño de la etiqueta
    });
  }

  React.useEffect(() => {
    handleChange();
  }, [a, b, c, unit, showSideA, showSideB, showSideC, sideLabelFormat, showAngleA, showAngleB, showAngleC, angleFormat, angleUnit, parallelLabels, lineStyleA, lineStyleB, lineStyleC, colorA, colorB, colorC, colorAngleA, colorAngleB, colorAngleC, labelSize]);

  return (
    <div className="p-4 space-y-4 overflow-auto">
      <div>
        <h3 className="font-bold">Lados</h3>
        <div className="flex gap-2">
          <input type="number" value={a} onChange={e => setA(e.target.value)} className="border p-1" placeholder="a"/>
          <input type="number" value={b} onChange={e => setB(e.target.value)} className="border p-1" placeholder="b"/>
          <input type="number" value={c} onChange={e => setC(e.target.value)} className="border p-1" placeholder="c"/>
        </div>
        <select value={unit} onChange={e => setUnit(e.target.value)} className="border p-1 mt-2 w-full">
          {unitsList.map(u => <option key={u}>{u}</option>)}
        </select>
      </div>

      <div>
        <h3 className="font-bold">Etiquetas de Lados</h3>
        <label><input type="checkbox" checked={showSideA} onChange={e => setShowSideA(e.target.checked)}/> Mostrar lado a</label><br/>
        <label><input type="checkbox" checked={showSideB} onChange={e => setShowSideB(e.target.checked)}/> Mostrar lado b</label><br/>
        <label><input type="checkbox" checked={showSideC} onChange={e => setShowSideC(e.target.checked)}/> Mostrar lado c</label><br/>
        <div className="mt-2">
          Formato etiqueta:
          <select value={sideLabelFormat} onChange={e => setSideLabelFormat(e.target.value)} className="border p-1 w-full mt-1">
            <option value="lado">lado</option>
            <option value="valor">valor</option>
            <option value="lado = valor">lado = valor</option>
            <option value="valor unit">valor unit</option>
            <option value="lado = valor unit">lado = valor unit</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="font-bold">Ángulos</h3>
        <label><input type="checkbox" checked={showAngleA} onChange={e => setShowAngleA(e.target.checked)}/> Mostrar α</label><br/>
        <label><input type="checkbox" checked={showAngleB} onChange={e => setShowAngleB(e.target.checked)}/> Mostrar β</label><br/>
        <label><input type="checkbox" checked={showAngleC} onChange={e => setShowAngleC(e.target.checked)}/> Mostrar γ</label><br/>
        <div className="mt-2">
          Formato etiqueta ángulo:
          <select value={angleFormat} onChange={e => setAngleFormat(e.target.value)} className="border p-1 w-full mt-1">
            <option value="symbolOnly">Solo símbolo (α)</option>
            <option value="symbolValue">Símbolo y valor (α = n°)</option>
            <option value="valueOnly">Solo valor (n°)</option>
          </select>
        </div>
        <div className="mt-2">
          Unidad del ángulo:
          <select value={angleUnit} onChange={e => setAngleUnit(e.target.value)} className="border p-1 w-full mt-1">
            <option value="degrees">Grados</option>
            <option value="radians">Radianes</option>
            <option value="celsius">Celsius</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="font-bold">Orientación de Etiquetas</h3>
        <label><input type="checkbox" checked={parallelLabels} onChange={e => setParallelLabels(e.target.checked)}/> Etiquetas paralelas al lado</label>
      </div>

      <div>
        <h3 className="font-bold">Estilo de Líneas (Lados)</h3>
        <div className="flex gap-2 items-center">
          <span>a:</span>
          <select value={lineStyleA} onChange={e => setLineStyleA(e.target.value)} className="border p-1 flex-grow">
            {lineStyles.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <input type="color" value={colorA} onChange={e => setColorA(e.target.value)} className="w-12"/>
        </div>
        <div className="flex gap-2 items-center">
          <span>b:</span>
          <select value={lineStyleB} onChange={e => setLineStyleB(e.target.value)} className="border p-1 flex-grow">
            {lineStyles.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <input type="color" value={colorB} onChange={e => setColorB(e.target.value)} className="w-12"/>
        </div>
        <div className="flex gap-2 items-center">
          <span>c:</span>
          <select value={lineStyleC} onChange={e => setLineStyleC(e.target.value)} className="border p-1 flex-grow">
            {lineStyles.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <input type="color" value={colorC} onChange={e => setColorC(e.target.value)} className="w-12"/>
        </div>
      </div>

      <div>
        <h3 className="font-bold">Colores de Ángulos</h3>
        <div className="flex gap-2 items-center">
          <span>α:</span>
          <input type="color" value={colorAngleA} onChange={e => setColorAngleA(e.target.value)} className="w-12"/>
        </div>
        <div className="flex gap-2 items-center">
          <span>β:</span>
          <input type="color" value={colorAngleB} onChange={e => setColorAngleB(e.target.value)} className="w-12"/>
        </div>
        <div className="flex gap-2 items-center">
          <span>γ:</span>
          <input type="color" value={colorAngleC} onChange={e => setColorAngleC(e.target.value)} className="w-12"/>
        </div>
      </div>

      <div>
        <h3 className="font-bold">Tamaño de Etiquetas</h3>
        <input
          type="range"
          min="8"
          max="24"
          value={labelSize}
          onChange={(e) => setLabelSize(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center">{labelSize}px</div>
      </div>
    </div>
  );
}
