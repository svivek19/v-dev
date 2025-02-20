import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const AiResponse = () => {
  const response =
    "Okay, here's a structured 2-week JavaScript learning roadmap for beginners, in a simple wireframe format:\n\n**Week 1: JavaScript Fundamentals**\n\n*   **Day 1: Introduction to JavaScript**\n    *   What is JavaScript?\n    *   JavaScript's role in web development (front-end, back-end)\n    *   Setting up a development environment (browser console, code editor)\n    *   \"Hello, World!\" example\n*   **Day 2: Variables and Data Types**\n    *   Declaring variables ( `var`, `let`, `const`)\n    *   Data types:\n        *   Numbers\n        *   Strings\n        *   Booleans\n        *   `null`\n        *   `undefined`\n    *   Typeof Operator\n*   **Day 3: Operators**\n    *   Arithmetic operators (+, -, *, /, %)\n    *   Assignment operators (=, +=, -=, etc.)\n    *   Comparison operators (==, ===, !=, !==, >, <, >=, <=)\n    *   Logical operators (&&, ||, !)\n*   **Day 4: Control Flow - Conditionals**\n    *   `if` statements\n    *   `else if` statements\n    *   `else` statements\n    *   Ternary operator\n    *   Switch statements\n*   **Day 5: Control Flow - Loops**\n    *   `for` loops\n    *   `while` loops\n    *   `do...while` loops\n    *   `break` and `continue` statements\n*   **Day 6: Functions**\n    *   Defining functions\n    *   Calling functions\n    *   Parameters and arguments\n    *   Return values\n    *   Scope\n*   **Day 7:  Practice & Mini-Project**\n    *   Review all concepts from Week 1.\n    *   Build a simple calculator or a basic number guessing game using HTML, CSS, and JavaScript.\n\n**Week 2:  Working with the DOM and Basic Events**\n\n*   **Day 8: Introduction to the DOM**\n    *   What is the DOM (Document Object Model)?\n    *   Accessing elements in the DOM ( `document.getElementById`, `document.querySelector`, `document.querySelectorAll`)\n    *   Understanding element properties ( `innerHTML`, `textContent`, `style`)\n*   **Day 9: Manipulating the DOM**\n    *   Changing element content\n    *   Changing element attributes\n    *   Adding and removing elements\n*   **Day 10: Introduction to Events**\n    *   What are events?\n    *   Common events ( `click`, `mouseover`, `mouseout`, `keydown`, `keyup`)\n    *   Event listeners ( `addEventListener`)\n*   **Day 11: Event Handling**\n    *   Attaching event listeners to elements\n    *   Event objects\n    *   `this` keyword in event handlers\n*   **Day 12:  Basic Forms and Input**\n    *   Accessing form elements ( `input`, `textarea`, `select`)\n    *   Getting and setting form values\n    *   Basic form validation\n*   **Day 13: JavaScript libraries Introduction**\n    *   What are libraries and why are they useful?\n    *   Introduction to jQuery\n    *   Importing and using jQuery\n    *   Using jQuery to manipulate the DOM and events\n*   **Day 14: Project & Review**\n    *   Review all concepts from Week 2.\n    *   Build a small interactive website (e.g., a to-do list, a simple image gallery, a basic form with validation)\n\n**Important Notes:**\n\n*   **Practice is Key:** Spend time coding every day.  The more you code, the better you'll understand.\n*   **Use Online Resources:**  MDN Web Docs, Stack Overflow, and freeCodeCamp are excellent resources.\n*   **Debugging:** Learn how to use your browser's developer tools to debug your code.\n*   **Break it Down:** Don't try to learn everything at once. Focus on one concept at a time.\n*   **Don't Be Afraid to Ask for Help:**  Join online communities or ask friends who know JavaScript.\n*   **Stay Consistent:**  Consistency is key to building a strong foundation.\n";

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        className="prose prose-lg text-gray-800"
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};

export default AiResponse;
