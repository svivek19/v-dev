import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";

const QuestionAndAnswers = () => {
  const currentTime = new Date().toLocaleString();

  return (
    <div className="border border-amber-400 p-4 rounded-lg mb-4 w-full">
      {/* Question */}
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl font-medium break-words">
          How to create an automation script to apply for jobs on LinkedIn
        </h1>
        <p className="text-xs my-2 text-end text-slate-500">{currentTime}</p>
      </div>

      <hr className="text-slate-400" />

      {/* Answer */}
      <div className="my-2 sm:my-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-green-600">John Doe</p>
              <p className="text-xs text-slate-500">{currentTime}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="bg-gray-800 text-sm font-medium text-white p-2 rounded-full text-end">
              {10}
            </p>
          </div>
        </div>
        <div className="text-sm sm:text-base break-words text-gray-700">
          <p className="mb-4">
            Here's how you can create a LinkedIn job application automation
            script:
          </p>
          <div className="w-full overflow-x-auto" id="code-block">
            <CodeBlock
              text={`
                const currentTime = new Date().toLocaleString();
                
                `}
              language="javascript"
              theme={dracula}
              showLineNumbers={true}
              wrapLines={true}
              className="text-sm sm:text-base md:text-lg"
            />
          </div>

          <p className="mt-4">
            Make sure to handle the authentication and job search parameters
            carefully. Remember to respect LinkedIn's terms of service when
            using automation scripts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionAndAnswers;
