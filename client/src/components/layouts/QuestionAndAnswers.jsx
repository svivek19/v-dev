import React, { useEffect, useState } from "react";
import Axios from "../../util/Axios";
import { CodeBlock, dracula } from "react-code-blocks";
import { PulseLoader } from "react-spinners";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";

const QuestionAndAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await Axios.get("/question/get");
      setQuestions(response.data.questions || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#FFA500" size={15} />
        </div>
      ) : (
        questions.map((item, index) => (
          <div
            key={index}
            className="border border-amber-400 p-4 rounded-lg mb-4"
          >
            {/* Question */}
            <div className="mb-4">
              <Link to={`/question-details/${item._id}`}>
                <div
                  className="text-lg sm:text-xl font-medium break-words hover:text-blue-500"
                  dangerouslySetInnerHTML={{ __html: item.question }}
                />
                <p className="text-xs my-2 text-end text-slate-500">
                  {formatLocalDate(item.createdAt)}
                </p>
              </Link>
            </div>

            <hr className="text-slate-400" />

            {/* Answer */}
            <div className="my-2 sm:my-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-gray-500"
                  />
                  <div>
                    <p className="text-base capitalize font-medium text-green-600">
                      {item.user?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-sm sm:text-base break-words text-gray-700">
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
        ))
      )}
    </div>
  );
};

export default QuestionAndAnswers;
