import { MessageCircle, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const initMessage = {
  text: "Hi there! 👋 I am Roovo AI, here to help you out with this hotel. Feel free to ask me anything!",
  sender: "bot",
  timestamp: new Date().toISOString(),
  suggestions: [
    "What are the amenities?",
    "Do they serve breakfast?",
    "What user say about this hotel?",
  ],
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([initMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  let pageUrl = window.location.href.split(".html")[0];
  pageUrl = pageUrl + ".html";

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getHotelId = (url: string) => {
    const hotelId = url.split(".html")[0] + ".html";

    return hotelId;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!window) {
      return;
    }

    handleGetChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGetChatHistory = async () => {
    try {
      const hotelId = getHotelId(window.location.href);
      setIsLoading(true);
      console.log("handleGetChatHistory", { hotelId });
      const response = await axios.get(
        `https://ai-reviews-be.vercel.app/api/get-chat/?hotelId=${hotelId}`
      );

      const { data = {} } = response;
      console.log(data);
      const chatHistory = (data.chat_history ?? []).map(
        ({ content, role, timestamp }) => {
          let suggestions = [],
            text = "";

          try {
            if (role === "assistant") {
              const result = JSON.parse(content);

              text = result.answer;
              suggestions = result.suggestions;
            } else {
              text = content;
              suggestions = [];
            }
          } catch {
            text = "";
            suggestions = [];
          }

          return {
            text,
            sender: role !== "assistant" ? "user" : role,
            timestamp,
            suggestions,
          };
        }
      );

      setIsLoading(false);
      setMessages((prev) => [initMessage, ...chatHistory]);
    } catch (error) {
      setIsLoading(false);
      return {
        messages: [],
      };
    }
  };

  const handleAskQuestion = async ({ prompt, url, currentQuestion = "" }) => {
    try {
      const response = await axios.post(
        "https://ai-reviews-be.vercel.app/api/ask",
        {
          question: prompt,
          url,
        }
      );

      const { data = {} } = response;

      let botMessage = {
        text: "The hotel is being added to our database. Please wait.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        suggestions: [currentQuestion],
      };

      if (data.isHotelExist) {
        const result = JSON.parse(data.response);
        botMessage.text = result.answer;
        botMessage.suggestions = result.suggestions;
      } else if (data.scrapingStatus) {
        botMessage.text =
          "We are still working on it. Please check back after 2 minutes.";
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date().toISOString(),
          suggestions: [currentQuestion],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage = {
      text: suggestion,
      sender: "user",
      timestamp: new Date().toISOString(),
      suggestions: [],
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    handleAskQuestion({
      prompt: suggestion,
      url: pageUrl,
      currentQuestion: suggestion,
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
      suggestions: [],
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentQuestion = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    handleAskQuestion({
      prompt: currentQuestion,
      url: pageUrl,
      currentQuestion,
    });
  };

  return (
    <div className="fixed bottom-16 right-16 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg sticky bottom-16 right-16"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-xl h-[70dvh] min-h-[70dvh] flex flex-col sticky bottom-16 right-16 max-h-screen border border-gray-200 w-[40dvw] max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              {/* <img
                src="https://res.cloudinary.com/dnqfxuxsm/image/upload/v1736488223/Screenshot_2025-01-10_at_11.17.16_AM_jeb0xs.png"
                alt="RoovoAI"
                className="w-8 h-8 mr-2"
              /> */}
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <h3 className="ml-3 font-semibold">RoovoAI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1  overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] w-max p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>

                {message.suggestions && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && <LoadingSpinner />}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  Searching for answers...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                rows={1}
                className="w-full pr-10 py-2 px-3 border rounded-lg resize-none min-h-[40px] max-h-[200px] overflow-y-auto focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                style={{ lineHeight: "1.5" }}
              />
              <div className="flex flex-col justify-center align-center">
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 h-[2.5rem] flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-black">loading...</p>
    </div>
  );
};

export default ChatWidget;
