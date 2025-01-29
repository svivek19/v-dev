import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const Ask = () => {
  const [editorValue, setEditorValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const codeRef = useRef(null);

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleCodeChange = (e) => {
    setCodeValue(e.target.value);
  };

  const highlightCode = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Question:", editorValue);
    console.log("Code:", codeValue);
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightCode(codeValue);
      Prism.highlightElement(codeRef.current);
    }
  }, [codeValue]);

  return (
    <div className="ask-container">
      <h1 className="text-2xl font-semibold mb-4">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="w-full">
        {/* React Quill for rich text */}
        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          className="editor mb-4"
          placeholder="Write your question here..."
        />

        {/* Code editor */}
        <h2 className="text-xl mb-2">Code (Optional)</h2>
        <textarea
          value={codeValue}
          onChange={handleCodeChange}
          className="w-full p-2 border rounded-lg mb-4 resize-none"
          placeholder="Write your code here..."
          rows="8"
        />

        {/* Code block with syntax highlighting */}
        {codeValue && (
          <div className="mb-4">
            <h3 className="text-lg mb-2">Code Preview</h3>
            <pre className="language-javascript">
              <code
                ref={codeRef}
                className="language-javascript"
                dangerouslySetInnerHTML={{ __html: highlightCode(codeValue) }}
              ></code>
            </pre>
          </div>
        )}

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
