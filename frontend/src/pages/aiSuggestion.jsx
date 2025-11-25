import React, { useState } from "react";
import api from "../api/api.js";
import toast from "react-hot-toast";
import { parseAISuggestions } from "../utils/parseAISuggestions.js";

export default function AISuggestionsPage() {
  const [skills, setSkills] = useState({});
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(5);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Add skill dynamically
  function addSkill() {
    if (!skillName.trim()) {
      toast.error("Enter a skill name");
      return;
    }

    setSkills((prev) => ({
      ...prev,
      [skillName.trim()]: Number(skillLevel),
    }));

    setSkillName("");
    setSkillLevel(5);
  }

  // Remove skill
  function removeSkill(skill) {
    const copy = { ...skills };
    delete copy[skill];
    setSkills(copy);
  }

  // Send to backend
  async function analyze() {
    if (Object.keys(skills).length === 0) {
      toast.error("Add at least one skill");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/ai/suggestions", { skills });
      const parsed = parseAISuggestions(res.data.suggestions);

      setResult(parsed);
      toast.success("AI Analysis Complete!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch AI suggestions.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">AI Skill Analysis (Gemini)</h1>

      {/* Add Skill Box */}
      <div className="bg-white/10 p-4 rounded-xl mb-4">
        <h2 className="font-semibold mb-3">Add Your Skills</h2>

        <div className="flex gap-3 mb-4 items-center">
          <input
            type="text"
            placeholder="Skill name (e.g., React)"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="px-3 py-2 bg-white/5 rounded outline-none flex-1"
          />

          <input
            type="number"
            min="1"
            max="10"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-20 px-2 py-2 bg-white/5 rounded outline-none"
          />

          <button
            onClick={addSkill}
            className="px-4 py-2 bg-purple-600 rounded"
          >
            Add
          </button>
        </div>

        {/* Current Skills */}
        <h3 className="font-semibold mb-2">Current Skills</h3>

        <ul className="list-disc ml-6 space-y-1">
          {Object.entries(skills).map(([name, level]) => (
            <li key={name} className="flex justify-between items-center">
              <span>
                {name}: <span className="text-purple-300">{level}/10</span>
              </span>

              <button
                onClick={() => removeSkill(name)}
                className="text-red-400 text-xs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={analyze}
        className="px-4 py-2 bg-purple-600 rounded"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze My Skills"}
      </button>

      {/* AI Results */}
      {result && (
        <div className="mt-8 bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">AI Suggestions</h2>

          {/* ROLES */}
          <h3 className="text-lg font-bold mt-4">Recommended Roles</h3>
          <ul className="list-disc ml-6">
            {result.roles?.map((r, idx) => (
              <li key={idx}>
                <strong>{r.title}</strong> — {r.score}%
                {r.missing && r.missing.length > 0 && (
                  <ul className="ml-6 text-sm opacity-80">
                    {r.missing.map((m, i) => (
                      <li key={i}>
                        Learn{" "}
                        <span className="text-purple-300">{m.skill}</span> (recommended level{" "}
                        {m.recommendedLevel})
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* RADAR */}
          <h3 className="text-lg font-bold mt-4">Radar Data</h3>
          <ul className="list-disc ml-6">
            {result.radar?.map((item, idx) => (
              <li key={idx}>
                {item.skill}: {item.level}
              </li>
            ))}
          </ul>

          {/* BARS */}
          <h3 className="text-lg font-bold mt-4">Bar Chart Data</h3>
          <ul className="list-disc ml-6">
            {result.bars?.map((item, idx) => (
              <li key={idx}>
                {item.skill}: {item.level}
              </li>
            ))}
          </ul>
            {/* JOB RECOMMENDATIONS — PLACE THIS HERE */}
    <h3 className="text-lg font-bold mt-4">Recommended Jobs</h3>

    <ul className="space-y-3 mt-2">
      {result.jobs?.map((job, idx) => (
        <li key={idx} className="p-3 bg-white/10 rounded-xl">
          <h4 className="font-semibold text-purple-300">{job.title}</h4>
          <p className="text-sm opacity-80">{job.company} — {job.location}</p>
          <p className="text-green-400 text-sm mt-1">{job.salary}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {job.skills.map((s, i) => (
              <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs">
                {s}
              </span>
            ))}
          </div>

          <p className="text-xs opacity-70 mt-1">
            Match Score: {job.score}%
          </p>
        </li>
      ))}
    </ul>
        </div>
      )}
    </div>
  );
}