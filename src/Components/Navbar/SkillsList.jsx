import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillsList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/skills")
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching skills:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Skills</h2>
      {skills.length === 0 ? (
        <p>Loading skills...</p>
      ) : (
        <ul className="list-disc pl-6">
          {skills.map((skill) => (
            <li key={skill._id}>{skill.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillsList;
