import { useRef, useReducer } from "react";

function App() {
  const ref = useRef();
  const [, rerender] = useReducer(() => []);

  const lines = useRef([]);
  const currentLine = useRef(null);

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    currentLine.current = {
      color: "black",
      coordinates: [
        {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
      ],
    };

    lines.current.push(currentLine.current);
  };

  const drawLines = () => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.current.forEach((line) => {
      if (!line.coordinates || line.coordinates.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;

      ctx.moveTo(line.coordinates[0].x, line.coordinates[0].y);
      for (let i = 1; i < line.coordinates.length - 1; i++) {
        const cp = line.coordinates[i];
        const ep = line.coordinates[i + 1];
        ctx.quadraticCurveTo(cp.x, cp.y, (cp.x + ep.x) / 2, (cp.y + ep.y) / 2);
      }

      // Dessiner la dernière partie de la ligne
      if (line.coordinates.length > 1) {
        const lastPoint = line.coordinates[line.coordinates.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);
      }

      ctx.stroke();
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#efedeb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <canvas
        width={400}
        height={400}
        onPointerDown={startDrawing}
        onPointerMove={(e) => {
          e.preventDefault();
          if (!currentLine.current) return;
          const canvas = ref.current;
          const rect = canvas.getBoundingClientRect();
          const coordinate = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };

          currentLine.current.coordinates.push(coordinate);
          drawLines();
        }}
        onPointerUp={(e) => {
          e.preventDefault();
          if (currentLine.current) {
            currentLine.current = null;
            rerender();
          }
        }}
        ref={ref}
        style={{
          background: "white",
          border: "2px solid #9aa4b1",
          borderRadius: 8,
        }}
      />
      <pre style={{ height: 100, width: 400, overflow: "auto" }}>
        {JSON.stringify(lines.current, null, 2)}
      </pre>
    </div>
  );
}

export default App;
