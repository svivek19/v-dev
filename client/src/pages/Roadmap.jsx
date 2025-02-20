import React, { useState, useEffect } from "react";
import Axios from "../util/Axios";
import AiResponse from "../components/AiResponse";

const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText";

const Roadmap = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    skill: "",
    level: "",
    duration: "",
    search: "",
  });
  const [roadmap, setRoadmap] = useState("");
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const levels = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.post(`${API_URL}/ai/generate`, {
        prompt: "List common programming and technology skills.",
      });

      const skillList =
        response.data?.candidates?.[0]?.output
          ?.split("\n")
          .map((skill) => skill.trim())
          .filter(Boolean) || [];

      setSkills(skillList.length ? skillList : DEFAULT_SKILLS);
      setError("");
    } catch (err) {
      console.error("Error fetching skills:", err);
      setSkills(DEFAULT_SKILLS);
      setError("Failed to fetch skills. Using default list.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateRoadmap = async () => {
    if (!formData.skill || !formData.level || !formData.duration) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await Axios.post(`${API_URL}/ai/generate`, {
        prompt: `Generate a detailed learning roadmap for mastering ${formData.skill} 
        at ${formData.level} level in ${formData.duration} weeks. 
        Include step-by-step topics, hands-on projects, and advanced concepts.`,
      });

      const generatedText = response.data?.candidates?.[0]?.output;
      if (!generatedText) {
        throw new Error("No roadmap content received");
      }

      setRoadmap(generatedText);
      setStep(2);
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const filteredSkills = skills
    .filter((s) => s.toLowerCase().includes(formData.search.toLowerCase()))
    .slice(0, 10);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">
        {step === 1 ? "Skill Learning Roadmap" : "Generated Roadmap"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {step === 1 ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Search & Select a Skill:
            </label>
            <input
              type="text"
              placeholder="Search skill..."
              value={formData.search}
              onChange={(e) => handleInputChange("search", e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((s, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded transition ${
                    formData.skill === s
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500 hover:text-white`}
                  onClick={() => handleInputChange("skill", s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Learning Level:
            </label>
            <div className="flex gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  className={`px-4 py-2 rounded transition ${
                    formData.level === lvl
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500 hover:text-white`}
                  onClick={() => handleInputChange("level", lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Time Duration (weeks):
            </label>
            <input
              type="number"
              min="1"
              max="52"
              placeholder="Enter weeks"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            className={`w-full py-2 rounded transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            onClick={generateRoadmap}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Roadmap"}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-medium mb-4">Your Learning Plan:</h3>
            <div className="whitespace-pre-line">
              <AiResponse />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              disabled={isLoading}
            >
              Start Learning
            </button>
          </div>
        </div>
      )}

      <AiResponse />
    </div>
  );
};

const DEFAULT_SKILLS = [
  "React",
  "Node.js",
  "MongoDB",
  "JavaScript",
  "Python",
  "TypeScript",
  "AWS",
  "Docker",
  "SQL",
  "Git",
];

export default Roadmap;
