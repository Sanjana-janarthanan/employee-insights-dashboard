// src/pages/Analytics.jsx
import SalaryChart from "../components/SalaryChart.jsx";
import GeoMap from "../components/GeoMap.jsx";

export default function Analytics() {
  const storedData = localStorage.getItem("employees");
  const data = storedData ? JSON.parse(storedData) : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Analytics</h2>

      <div style={{ marginBottom: "40px" }}>
        <h3>Salary Distribution by City</h3>
        {data.length === 0 ? <p>Loading chart...</p> : <SalaryChart data={data} />}
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Employee Locations</h3>
        {data.length === 0 ? <p>Loading map...</p> : <GeoMap employees={data} />}
        <p style={{ fontSize: "12px", marginTop: "5px" }}>
          Note: City coordinates are hardcoded for demo purposes.
        </p>
      </div>

      <div>
        <h3>Developer Note (Intentional Bug)</h3>
        <p style={{ fontSize: "12px", color: "red" }}>
          Intentional bug: In VirtualizedTable scroll handler, scrollTop state
          uses a stale closure which can cause row jumps during fast scrolling.
        </p>
      </div>
    </div>
  );
}
