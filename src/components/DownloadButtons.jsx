// src/components/DownloadButtons.jsx

import React from 'react';

export default function DownloadButtons({ svgRef }) {

  function downloadSVG() {
    const svg = svgRef.current;
    if(!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const file = new Blob([source], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.download = "triangle.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Para descargar PNG, se podría usar un canvas
  async function downloadPNG() {
    const svg = svgRef.current;
    if(!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const img = new Image();
    const url = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(source)));
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.clientWidth * 2;
      canvas.height = svg.clientHeight * 2;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const png = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = png;
      a.download = "triangle.png";
      a.click();
    };
  }

  return (
    <div className="flex gap-2">
      <button onClick={downloadSVG} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Descargar SVG
      </button>
      <button onClick={downloadPNG} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Descargar PNG
      </button>
    </div>
  );
}
