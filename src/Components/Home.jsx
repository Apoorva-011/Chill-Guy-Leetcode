import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Home = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="bg-white relative h-screen overflow-hidden">
      {/* UI Code */}
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src="Garfieldlazy.png"
          alt="Garfield lazy"
          className="w-64 h-64 object-contain"
        />
        <h1 className="text-4xl font-bold text-black mb-6 text-center">
          Leetcode Chill Guy Analyser
        </h1>
        <div className="bg-gray-50 border border-black p-6 rounded-md w-96 flex flex-col items-center gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your LeetCode username"
            className="w-full p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to="/stats" state={{ username }} className="w-full">
            <Button variant="default" size="default" className="w-full">
              Analyse
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
