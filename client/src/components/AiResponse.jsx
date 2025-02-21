import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const AiResponse = ({ response }) => {
  return (
    <div className="w-11/12">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        className="prose prose-lg text-gray-800 break-words max-sm:w-64"
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-red-600" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-red-500" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-red-600" {...props} />
          ),
        }}
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};

export default AiResponse;
