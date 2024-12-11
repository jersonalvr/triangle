// src/App.jsx

import React, { useState, useRef } from 'react';
import TriangleConfigurator from './components/TriangleConfigurator';
import TrianglePreview from './components/TrianglePreview';
import DownloadButtons from './components/DownloadButtons';

function App() {
  const [config, setConfig] = useState({
    a: 100,
    b: 100,
    c: 100,
    unit: "cm",
    showSideA: true,
    showSideB: true,
    showSideC: true,
    sideLabelFormat: "lado = valor unit",
    showAngleA: false,
    showAngleB: false,
    showAngleC: false,
    angleFormat: "symbolValue",
    angleUnit: "degrees",
    parallelLabels: false,
    lineStyleA: "solid",
    lineStyleB: "solid",
    lineStyleC: "solid",
    colorA: "#ff0000",
    colorB: "#00ff00",
    colorC: "#0000ff",
    colorAngleA: "#ff0000",
    colorAngleB: "#00ff00",
    colorAngleC: "#0000ff",
    labelSize: 5,
  });

  const svgRef = useRef(null);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r flex flex-col">
        <TriangleConfigurator onChange={setConfig}/>
        <div className="mt-auto p-4">
          <DownloadButtons svgRef={svgRef} />
        </div>
      </div>
      <div className="w-2/3 p-4">
        <TrianglePreview {...config} ref={svgRef} />
      </div>
    </div>
  );
}

export default App;
