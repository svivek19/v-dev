import React, { useEffect, useState, useCallback } from "react";
import Axios from "../util/Axios";
import { Link, useParams } from "react-router-dom";
import { CodeBlock, dracula } from "react-code-blocks";
import avatar from "../assets/avatar.png";
import { PulseLoader } from "react-spinners";

const QuestionDetails = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("user");

  const [ques, setQues] = useState(null);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [relatedQues, setRelatedQues] = useState([]);
  const [loading, setLoading] = useState(false);

  const getQuestion = useCallback(async () => {
    setLoading(true);
    try {
      const response = await Axios.get(`/question/get-obj/${id}`);
      setQues(response.data.response || null);
    } catch (error) {
      console.log("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const getUserDetails = useCallback(async () => {
    try {
      const response = await Axios.get("/user/get/" + userId);
      setUser(response.data.response);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [userId]);

  const getRelatedQuestion = useCallback(async () => {
    try {
      const response = await Axios.get(`/question/get-related/${id}`);
      setRelatedQues(response.data.relatedQuestions || []);
    } catch (error) {
      console.log("Error fetching related questions:", error);
    }
  }, [id]);

  useEffect(() => {
    getQuestion();
    if (userId) {
      getUserDetails();
    }
    getRelatedQuestion();
  }, [id, userId, getQuestion, getUserDetails, getRelatedQuestion]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const response = await Axios.patch("/question/create-comment", {
        id: ques._id,
        username: user.name,
        suggestions: comment,
      });
      setComment("");
      alert("Comment submitted successfully!");
      getQuestion(); // Refresh the question with the latest comment
    } catch (error) {
      alert("Error submitting comment.");
      console.log("Error:", error);
    }
  };

  const formatLocalDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString(undefined, options);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#FFA500" size={15} />
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-2/3">
        <h2 className="text-xl font-bold mb-2 underline underline-offset-2">
          Discussion Details
        </h2>

        {ques ? (
          <>
            <div
              className="text-sm sm:text-base mb-4 capitalize font-medium text-red-500"
              dangerouslySetInnerHTML={{ __html: ques.question }}
            />
            {ques.code && (
              <div className="overflow-x-auto" id="code-block">
                <CodeBlock
                  text={ques.code}
                  language="javascript"
                  theme={dracula}
                  showLineNumbers={true}
                  wrapLines={true}
                  className="text-sm sm:text-base md:text-lg"
                />
              </div>
            )}
            <div className="my-6">
              <h2 className="text-xl font-bold mb-2 underline underline-offset-2">
                What You Think
              </h2>

              <div className="flex items-center gap-4 flex-wrap">
                <input
                  type="text"
                  placeholder={
                    userId ? "Enter here..." : "Please log in to continue"
                  }
                  disabled={!userId}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userId || !comment.trim()}
                  className={`${
                    userId && comment.trim()
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  } bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition`}
                >
                  Submit
                </button>
              </div>

              {ques.suggestions && ques.suggestions.length > 0 && (
                <div className="my-4 h-64 overflow-y-scroll">
                  {[...ques.suggestions].reverse().map((item, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={avatar}
                          alt="avatar"
                          className="w-8 h-8 rounded-full border border-gray-500"
                        />
                        <div className="w-full flex items-center justify-between">
                          <p className="text-base capitalize font-medium text-pink-600">
                            {item.username}
                          </p>
                          <p className="text-sm capitalize text-gray-600">
                            {formatLocalDateTime(ques.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {item.suggestions}
                      </p>
                      <hr className="mt-4 border border-slate-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div>No Question Found</div>
        )}
      </div>

      <div className="w-full md:w-1/3">
        <h3 className="text-lg font-bold mb-2 underline underline-offset-2">
          Related Insights
        </h3>
        {relatedQues.length > 0 ? (
          relatedQues.map((item, i) => (
            <div key={i} className="bg-gray-50 p-2 rounded-md text-base">
              <Link to={`/question-details/${item._id}`} replace={true}>
                <h1 className="tracking-wider font-normal hover:text-blue-500">
                  {item.question}
                </h1>
                <div className="text-xs flex justify-end">
                  <p>{formatLocalDateTime(item.createdAt)}</p>
                </div>
              </Link>
              <hr className="border border-slate-300 my-4" />
            </div>
          ))
        ) : (
          <p className="text-red-500">No Activity Recorded</p>
        )}
      </div>
    </div>
  );
};

export default QuestionDetails;
