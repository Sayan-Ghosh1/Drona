import { useEffect, useState } from "react";

type Student = {
  _id: string;
  name: string;
  email: string;
  sport: string;
  position: string;
};

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/players/search")

      .then((response) => response.json())
      .then((data: Student[]) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Sport</th>
              <th className="border p-3">Position</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center border-b">
                <td className="border p-3">{student.name}</td>
                <td className="border p-3">{student.email}</td>
                <td className="border p-3">{student.sport}</td>
                <td className="border p-3">{student.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;