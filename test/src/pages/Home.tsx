import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Drona</h1>
      <p className="text-lg text-gray-700 mb-6">Find your perfect club or scout talent.</p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Sign In
        </Link>
        <Link to="/signup" className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;