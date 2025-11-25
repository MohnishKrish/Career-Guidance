import React, { useState } from "react";
import SkillInput from "../components/skills/SkillInput.jsx";
import RadarChartBox from "../components/charts/RadarChartBox.jsx";
import BarChartBox from "../components/charts/BarChartBox.jsx";
import RoleCard from "../components/skills/RoleCard.jsx";
import JobList from "../components/jobs/JobList.jsx";
import api from "../api/api.js";
import { skillsArrayToObject } from "../utils/formatSkills.js";
import { parseAISuggestions } from "../utils/parseAISuggestions.js";
import toast from "react-hot-toast";
export default function DashboardPage(){ const [skills,setSkills]=useState([]); 
  const [roles,setRoles]=useState([]); 
  const [radar,setRadar]=useState([]); 
  const [bars,setBars]=useState([]); 
  const [loading,setLoading]=useState(false);}
  async function analyze() {
  if (skills.length === 0) {
    toast.error("Add skills first");
    return;
  }

  setLoading(true);

  try {
    const payload = { skills: skillsArrayToObject(skills) };

    const res = await api.post("/ai/suggestions", payload);

    const parsed = parseAISuggestions(res.data.suggestions);

    setRoles(parsed.roles || []);
    setRadar(parsed.radar || []);
    setBars(parsed.bars || []);

    toast.success("Analysis complete");
  } catch (err) {
    toast.error("Analysis failed");
  } finally {
    setLoading(false);
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
      <SkillInput skills={skills} onChange={setSkills} />

      <button
        onClick={analyze}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Skills"}
      </button>

      {roles.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recommended Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role, i) => (
              <RoleCard key={i} role={role} />
            ))}
          </div>
        </div>
      )}

      {radar.length > 0 && (
        <RadarChartBox data={radar} />
      )}

      {bars.length > 0 && (
        <BarChartBox data={bars} />
      )}

      <JobList skills={skills} />
    </div>
  );
}