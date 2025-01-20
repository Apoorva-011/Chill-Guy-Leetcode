import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Stats = () => {
  const location = useLocation();
  const { username } = location.state || {}; // Get username passed through state
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${username}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setUserData(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    }
  }, [username]);

  // Calculate Chill Guy Percentage
  const calculateChillGuyPercentage = () => {
    if (!userData) return 0;

    const totalSolved = userData.totalSolved;
    const easySolved = userData.easySolved;
    const mediumSolved = userData.mediumSolved;
    const hardSolved = userData.hardSolved;

    const w1 = 1; // Weight for easy problems
    const w2 = 2; // Weight for medium problems
    const w3 = 3; // Weight for hard problems

    if (totalSolved === 0) return 0;

    // Calculate the weighted sum
    const weightedSum =
      (easySolved / totalSolved) * w1 +
      (mediumSolved / totalSolved) * w2 +
      (hardSolved / totalSolved) * w3;

    // Normalize by dividing by the sum of the weights to keep it within 0-100 range
    const chillGuyPercentage = (weightedSum / (w1 + w2 + w3)) * 100;

    return chillGuyPercentage.toFixed(2);
  };

  return (
    <div>
      {userData ? (
        <>
          <div className="h-[85vh]">
            <div className="flex flex-row items-center justify-center mt-4 mb-4">
              <img
                src="Garfield.png"
                alt="Garfield"
                className="w-64 h-96 object-contain bg-white"
              />
              <h1 className="text-5xl font-bold text-black">
                Your Chill Guy Percentage is <br />
                <h1 className="mt-1">{calculateChillGuyPercentage()}%</h1>
              </h1>
            </div>
            <img
              src="Leetcode.png"
              alt="Leetcode logo"
              className="absolute top-2 right-4 w-20 h-20 rounded-full object-cover border border-gray-300"
            />
            <h2 className="text-3xl font-bold text-black text-center">
              Total Questions Solved: {userData.totalSolved}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-green-100 border border-green-300 p-4 rounded-md text-center">
                <h3 className="text-xl font-bold text-green-800">Easy</h3>
                <p className="text-2xl font-bold">{userData.easySolved}</p>
              </div>
              <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md text-center">
                <h3 className="text-xl font-bold text-yellow-800">Medium</h3>
                <p className="text-2xl font-bold">{userData.mediumSolved}</p>
              </div>
              <div className="bg-red-100 border border-red-300 p-4 rounded-md text-center">
                <h3 className="text-xl font-bold text-red-800">Hard</h3>
                <p className="text-2xl font-bold">{userData.hardSolved}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Fetching data...</p>
      )}
    </div>
  );
};

export default Stats;
