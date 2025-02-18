import React, { useEffect, useState } from "react";
import Axios from "../../util/Axios";
import { CodeBlock, dracula } from "react-code-blocks";
import { PulseLoader } from "react-spinners";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BiArrowToTop } from "react-icons/bi";

const QuestionAndAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredQuestions = questions.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="w-full">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-600 rounded-lg px-10 py-1.5 w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <button className="absolute right-0.5 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg">
          <IoSearch className="text-white font-bold" size={17} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#FFA500" size={15} />
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="text-center text-red-600">
          <p>No questions found.</p>
        </div>
      ) : (
        filteredQuestions.map((item, index) => (
          <div
            key={index}
            className="border border-amber-400 p-4 rounded-lg mb-4"
          >
            <div className="mb-4">
              <Link to={`/question-details/${item._id}`} replace={true}>
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
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-opacity animate-bounce cursor-pointer"
        >
          <BiArrowToTop size={25} />
        </button>
      )}
    </div>
  );
};

export default QuestionAndAnswers;
