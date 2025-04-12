import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

interface Company {
  CompanyName: string;
  SecurityScore: number;
}

function Leaderboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dummyData: Company[] = [
        { CompanyName: "TechCorp", SecurityScore: 95 },
        { CompanyName: "SecureSolutions", SecurityScore: 88 },
        { CompanyName: "CyberSafe Inc.", SecurityScore: 92 },
        { CompanyName: "DataDefenders", SecurityScore: 85 },
        { CompanyName: "ShieldTech", SecurityScore: 90 },
      ];

      setTimeout(() => {
        setCompanies(
          dummyData.sort((a, b) => b.SecurityScore - a.SecurityScore)
        ); // Sort by SecurityScore descending
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading Leaderboard...</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Company Name</th>
            <th>Security Score</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{company.CompanyName}</td>
              <td>{company.SecurityScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
