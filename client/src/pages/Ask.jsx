import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import Axios from "../util/Axios";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

const Ask = () => {
  const { addToast } = useToasts();
  const [editorValue, setEditorValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const navigate = useNavigate();
  const codeRef = useRef(null);

  const userId = localStorage.getItem("user");

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleCodeChange = (e) => {
    setCodeValue(e.target.value);
  };

  const highlightCode = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/question/create", {
        id: userId,
        question: editorValue,
        code: codeValue,
      });
      addToast(response.data.message, { appearance: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightCode(codeValue);
      Prism.highlightElement(codeRef.current);
    }
  }, [codeValue]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="w-full">
        {/* React Quill for rich text */}
        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          className="editor mb-4"
          placeholder="Write your question here..."
        />

        <div className="">
          {/* Code editor */}
          <h2 className="text-xl mb-2">Code (Optional)</h2>
          <textarea
            value={codeValue}
            onChange={handleCodeChange}
            className="w-full p-2 border rounded-lg mb-4 resize-none"
            placeholder="Write your code here..."
            rows="8"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Post Question
        </button>
      </form>
    </div>
  );
};

export default Ask;
