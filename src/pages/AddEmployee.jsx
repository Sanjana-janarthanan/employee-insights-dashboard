import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {

  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate();

  const handleAdd = () => {

    const newEmployee = {
      id: Date.now(),
      name,
      dept,
      salary
    };

    const existingEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    existingEmployees.push(newEmployee);

    localStorage.setItem("employees", JSON.stringify(existingEmployees));

    alert("Employee Added!");

    navigate("/list");
  };

  return (
    <div>

      <h2>Add Employee</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Department"
        onChange={(e) => setDept(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Salary"
        onChange={(e) => setSalary(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAdd}>
        Add Employee
      </button>

    </div>
  );
}

export default AddEmployee;
