import React, { useState } from "react";

const Roadmap = () => {
  const [step, setStep] = useState(1);
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [roadmap, setRoadmap] = useState(null);

  const handleNext = () => {
    if (!skill || !level || !duration) {
      alert("Please fill all fields.");
      return;
    }
    // Placeholder roadmap generation (Replace with Gemini API)
    setRoadmap(
      `📚 Roadmap for learning ${skill} at ${level} level in ${duration} weeks.\n\n1️⃣ Basics of ${skill}\n2️⃣ Hands-on projects\n3️⃣ Advanced topics\n4️⃣ Mastery with real-world applications`
    );
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setRoadmap(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Skill Learning Roadmap</h2>

          {/* Skill Selection */}
          <label className="block text-sm font-semibold">Select a Skill:</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            <option value="">-- Choose a Skill --</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="MongoDB">MongoDB</option>
            <option value="JavaScript">JavaScript</option>
          </select>

          {/* Learning Capability */}
          <label className="block text-sm font-semibold">Learning Level:</label>
          <div className="flex gap-4 mb-4">
            {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
              <label key={lvl} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value={lvl}
                  checked={level === lvl}
                  onChange={(e) => setLevel(e.target.value)}
                />
                {lvl}
              </label>
            ))}
          </div>

          {/* Duration */}
          <label className="block text-sm font-semibold">
            Time Duration (weeks):
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter weeks"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          {/* Next Button */}
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleNext}
          >
            Next ➡️
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Generated Roadmap</h2>
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold">Your Learning Plan:</h3>
            <p className="whitespace-pre-line">{roadmap}</p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={handleBack}
            >
              ⬅️ Back
            </button>
            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Start Learning 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
