import React from "react";

export default function RoleCard({ role }) {
  return (
    <div className="glass p-4 rounded-xl">
      <h3 className="font-semibold text-lg">{role.title}</h3>

      <p className="text-sm opacity-75 mt-1">
        Compatibility Score: {role.score}%
      </p>

      {role.missing && role.missing.length > 0 && (
        <div className="mt-3">
          <p className="text-xs opacity-70 mb-1">Recommended Skills:</p>
          <div className="flex flex-wrap gap-2">
            {role.missing.map((m, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded bg-white/10 text-xs"
              >
                {m.skill} → lvl {m.recommendedLevel}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}