import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Stats = () => {
  const location = useLocation();
  const { username } = location.state || {}; // Get the username from state
  const [userData, setUserData] = useState(null); // To store API data
  const [loading, setLoading] = useState(true);
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
          setUserData(data); // Store the fetched data
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stats for {username}</h1>
      {/* Display API data */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

export default Stats;
