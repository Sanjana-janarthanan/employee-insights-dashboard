// src/components/VirtualizedTable.jsx
import { Link } from "react-router-dom";

export default function VirtualizedTable({ data = [] }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {data.map((row) => (
        <div key={row.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "5px" }}>
          <Link to={`/details/${row.id}`}>{row.name} - {row.city}</Link>
        </div>
      ))}

      {/* Analytics button */}
      <Link
        to="/analytics"
        style={{ display: "block", marginTop: "20px", fontWeight: "bold" }}
      >
        View Analytics
      </Link>
    </div>
  );
}
