import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {

    const employees =
      JSON.parse(localStorage.getItem("employees")) || [];

    const emp = employees.find(e => e.id === Number(id));

    if (emp) {
      setName(emp.name);
      setDept(emp.dept);
      setSalary(emp.salary);
    }

  }, [id]);

  const handleUpdate = () => {

    const employees =
      JSON.parse(localStorage.getItem("employees")) || [];

    const updatedEmployees = employees.map(emp =>
      emp.id === Number(id)
        ? { ...emp, name, dept, salary }
        : emp
    );

    localStorage.setItem(
      "employees",
      JSON.stringify(updatedEmployees)
    );

    alert("Employee Updated");

    navigate("/list");
  };

  return (
    <div>

      <h2>Edit Employee</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        value={dept}
        onChange={(e) => setDept(e.target.value)}
      />

      <br /><br />

      <input
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <br /><br />

      <button onClick={handleUpdate}>
        Update Employee
      </button>

    </div>
  );
}

export default EditEmployee;
