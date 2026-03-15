// src/components/GeoMap.jsx
export default function GeoMap({ employees = [] }) {
  const cityCoordinates = {
    Chennai: { x: 50, y: 200 },
    Mumbai: { x: 200, y: 50 },
    Delhi: { x: 250, y: 20 },
    Ahmedabad: { x: 100, y: 150 },
    Hyderabad: { x: 150, y: 180 },
  };

  return (
    <svg width="300" height="250" style={{ border: "1px solid #ccc" }}>
      {employees.map((emp) => {
        const coords = cityCoordinates[emp.city];
        if (!coords) return null;
        return (
          <circle key={emp.id} cx={coords.x} cy={coords.y} r={10} fill="red" stroke="#000">
            <title>{emp.name} - {emp.city}</title>
          </circle>
        );
      })}
    </svg>
  );
}
