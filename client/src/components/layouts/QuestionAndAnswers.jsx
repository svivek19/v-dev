import React, { useEffect, useState } from "react";
import Axios from "../../util/Axios";
import { CodeBlock, dracula } from "react-code-blocks";

const QuestionAndAnswers = () => {
  const [questions, setQuestions] = useState([]);

  function formatLocalDate(utcDate) {
    const date = new Date(utcDate);

    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }

  async function getQuestions() {
    try {
      const response = await Axios.get("/question/get");
      setQuestions(response.data.questions || []);
      console.log(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="w-full">
      {questions.map((item, index) => (
        <div
          key={index}
          className="border border-amber-400 p-4 rounded-lg mb-4 "
        >
          {/* Question */}
          <div className="mb-4">
            <div
              className="text-lg sm:text-xl font-medium break-words"
              dangerouslySetInnerHTML={{ __html: item.question }}
            />
            <p className="text-xs my-2 text-end text-slate-500">
              {formatLocalDate(item.createdAt)}
            </p>
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
                  <p className="text-base capitalize font-medium text-green-600">
                    {item.user.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-sm sm:text-base break-words text-gray-700">
              <p>Here's </p>
              <div
                className="text-sm sm:text-base mb-4"
                dangerouslySetInnerHTML={{ __html: item.question }}
              />
              <div className="w-full overflow-x-auto" id="code-block">
                <CodeBlock
                  text={item.code}
                  language="javascript"
                  theme={dracula}
                  showLineNumbers={true}
                  wrapLines={true}
                  className="text-sm sm:text-base md:text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionAndAnswers;
