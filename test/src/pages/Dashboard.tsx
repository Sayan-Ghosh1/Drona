import { useEffect, useState } from "react";

type Student = {
  _id: string;
  name: string;
  email: string;
  sport: string;
  position: string;
};

const sportsPositions: { [key: string]: string[] } = {
  football: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  cricket: [
    "Batsman",
    "Bowler",
    "All-Rounder",
    "Wicket-Keeper",
    "Opening Batsman",
    "Fast Bowler",
    "Spin Bowler",
  ],
};

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/players/search")
      .then((response) => response.json())
      .then((data: Student[]) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  useEffect(() => {
    if (selectedSport) {
      setPositions(sportsPositions[selectedSport] || []);
      setSelectedPosition("");
    } else {
      setPositions([]);
    }
  }, [selectedSport]);

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSport === "" || student.sport.toLowerCase() === selectedSport.toLowerCase()) &&
      (selectedPosition === "" || student.position.toLowerCase() === selectedPosition.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Players List</h1>

      {/* Search Bar & Filters */}
      <div className="mb-4 flex justify-center gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow"
        />
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow"
        >
          <option value="">All Sports</option>
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
        </select>
        {positions.length > 0 && (
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow"
          >
            <option value="">All Positions</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Student Table */}
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
            {filteredStudents.map((student) => (
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