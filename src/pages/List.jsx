// src/pages/List.jsx
import { useEffect, useState } from "react";
import VirtualizedTable from "../components/VirtualizedTable.jsx";

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const employees = [
      { id: 1, name: "John ", city: "Chennai", salary: 50000 },
      { id: 2, name: "Ravi ", city: "Mumbai", salary: 60000 },
      { id: 3, name: "Priya ", city: "Delhi", salary: 55000 },
      { id: 4, name: "Arjun ", city: "Ahmedabad", salary: 65000 },
      { id: 5, name: "Sneha ", city: "Hyderabad", salary: 52000 },
      { id: 6, name: "Rupa", city: "Mysore", salary: 89000 },
      { id: 7, name: "Shreya", city: "Telanaga", salary: 40000 },
      { id: 8, name: "Jacob", city: "Bangalore", salary: 74000 },
      { id: 9, name: "Afreen", city: "Kerala", salary: 62000 },
      { id: 10, name: "David", city: "Madhya Pradesh", salary: 38000 },
      { id: 11, name: "Reddy", city: "Bhopal", salary: 85000 },

    ];

    setTimeout(() => {
      setData(employees);
      localStorage.setItem("employees", JSON.stringify(employees)); // persist globally
    }, 500);
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      {data.length === 0 ? <p>Loading employees...</p> : <VirtualizedTable data={data} />}
    </div>
  );
}
