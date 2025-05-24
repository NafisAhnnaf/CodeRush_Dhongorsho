// import React, { useState } from "react";
// import { BsAppIndicator } from "react-icons/bs";


// function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div className="chatbot-container">
//         {/* Chat Window */}
//         {isOpen && (
//           <div className="chat-popup">
//             <div className="chat-header">Dhongorsho Assistant</div>
//             <div className="chat-body">
//               {/* You can put chat content here */}
//               <p>Hi there! How can I help you?</p>
//             </div>
//           </div>
//         )}

//         <div className="chatbot-float" onClick={toggleChat}>
//         <BsAppIndicator className="robot-icon"/>

//         </div>
//       </div>
//     </>
//   );
// }

// export default Chatbot;


import React, { useState, useRef, useEffect } from "react";
import { BsAppIndicator } from "react-icons/bs";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const apiKey = import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const generateAnswer = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");

    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: "Sorry - Something went wrong. Please try again!" },
      ]);
    }

    setGeneratingAnswer(false);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">Dhongorsho Assistant</div>
          <div className="chat-body" ref={chatContainerRef}>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chat-bubble ${chat.type === "question" ? "user" : "ai"}`}
              >
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            ))}
            {generatingAnswer && (
              <div className="chat-bubble ai">
                <em>Thinking...</em>
              </div>
            )}
          </div>
          <form className="chat-input-area" onSubmit={generateAnswer}>
            <textarea
              className="chat-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your message..."
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button type="submit" disabled={generatingAnswer} className="send-btn">
              Send
            </button>
          </form>
        </div>
      )}
      <div className="chatbot-float" onClick={toggleChat}>
        <BsAppIndicator className="robot-icon" />
      </div>
    </div>
  );
}

export default Chatbot;