import React, { useState, useEffect } from "react";
import Axios from "../util/Axios";
import AiResponse from "../components/AiResponse";
import { Link, useNavigate } from "react-router-dom";

const Roadmap = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
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
    setSkills(DEFAULT_SKILLS);
  }, []);

  const generateRoadmap = async () => {
    if (!formData.skill || !formData.level || !formData.duration) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await Axios.post(`/ai/generate`, {
        prompt: `Generate a structured ${formData.duration}-week learning roadmap for a ${formData.level} in ${formData.skill}. Break it down week-wise with bullet points.`,
      });
      setRoadmap(response.data.response || {});
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
          {/* Skill Search and Selection */}
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
                  className={`px-4 py-2 rounded transition cursor-pointer ${
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

          {/* Learning Level Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Learning Level:
            </label>
            <div className="flex gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  className={`px-4 py-2 rounded transition cursor-pointer ${
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

          {/* Duration Input */}
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

          {/* Generate Roadmap Button */}
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
          {/* Generated Roadmap Display */}
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-medium mb-4">Your Learning Plan:</h3>
            <div className="whitespace-pre-line">
              {roadmap && <AiResponse response={roadmap} />}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              Back
            </button>
            <button className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              <Link to={"/home"}>Start Learning</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Default skills list
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
