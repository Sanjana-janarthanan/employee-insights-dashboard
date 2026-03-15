// src/components/SalaryChart.jsx
export default function SalaryChart({ data = [] }) {
  const cities = {};
  data.forEach((d) => {
    cities[d.city] = (cities[d.city] || 0) + parseInt(d.salary);
  });

  const entries = Object.entries(cities);
  const maxSalary = Math.max(...Object.values(cities), 0);
  const scale = maxSalary ? 250 / maxSalary : 0;

  return (
    <svg width="500" height="300" style={{ border: "1px solid #ccc" }}>
      {entries.map((c, i) => {
        const height = c[1] * scale;
        const y = 300 - height;
        return (
          <g key={i}>
            <rect x={i * 60} y={y} width="40" height={height} fill="blue" />
            <text x={i * 60 + 20} y={y - 5} textAnchor="middle" fontSize="12" fill="black">
              {c[1]}
            </text>
            <text x={i * 60 + 20} y={300 + 15} textAnchor="middle" fontSize="12" fill="black">
              {c[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
