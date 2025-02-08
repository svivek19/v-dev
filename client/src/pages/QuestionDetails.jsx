import React, { useEffect, useState } from "react";
import Axios from "../util/Axios";
import { useParams } from "react-router-dom";
import { CodeBlock, dracula } from "react-code-blocks";
import avatar from "../assets/avatar.png";

const QuestionDetails = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("user");
  const [ques, setQues] = useState([]);
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState([]);

  const getQuestion = async () => {
    try {
      const response = await Axios.get(`/question/get-obj/${id}`);
      setQues(response.data.response || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await Axios.get("/user/get/" + userId);
      setUser(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestion();
    getUserDetails();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await Axios.patch("/question/create-comment", {
        id: userId,
        username: user.name,
        suggestions: comment,
      });
      alert("success");
      console.log(response);
      getQuestion();
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  function formatLocalDateTime(isoDate) {
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
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-2/3">
        <h2 className="text-xl font-bold mb-2 underline underline-offset-2">
          Discussion Details
        </h2>
        <div
          className="text-sm sm:text-base mb-4 capitalize font-medium text-red-500"
          dangerouslySetInnerHTML={{ __html: ques.question }}
        />
        <div className=" overflow-x-auto" id="code-block">
          <CodeBlock
            text={ques.code}
            language="javascript"
            theme={dracula}
            showLineNumbers={true}
            wrapLines={true}
            className="text-sm sm:text-base md:text-lg"
          />
        </div>

        <div className="my-6">
          <h2 className="text-xl font-bold mb-2 underline underline-offset-2">
            What You Think
          </h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter your text..."
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>

          <div className="my-4 h-64 overflow-y-scroll">
            {ques.suggestions &&
              [...ques.suggestions].reverse().map((item, i) => (
                <div key={i} className="mb-4 ">
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
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <h3 className="text-lg font-bold mb-2">Related Insights</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel
          culpa dolorum ipsam natus a accusantium. Vero alias eius incidunt
          mollitia saepe quia nisi quod iste beatae, laborum, id vitae!
        </p>
      </div>
    </div>
  );
};

export default QuestionDetails;
