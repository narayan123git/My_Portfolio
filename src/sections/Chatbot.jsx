import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { sender: 'user'|'bot', text }
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setOpen((v) => !v);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    // Add user message + typing indicator
    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
      { sender: "bot", text: "..." }
    ]);
    setInput("");

    try {
      const res = await fetch("https://my-portfolio-sigma-three-87.vercel.app/api/genai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }), // just send user input now
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status} ${errText}`);
      }

      const data = await res.json();
      const botText = data?.reply ?? "Sorry, I could not respond.";

      // Replace last "..." with bot response
      setMessages((prev) => {
        const copy = [...prev];
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].sender === "bot" && copy[i].text === "...") {
            copy[i] = { sender: "bot", text: botText };
            break;
          }
        }
        return copy;
      });
    } catch (err) {
      console.error("Frontend fetch error:", err);
      setMessages((prev) => {
        const copy = [...prev];
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].sender === "bot" && copy[i].text === "...") {
            copy[i] = { sender: "bot", text: "Error contacting API." };
            break;
          }
        }
        return copy;
      });
    }
  };

  return (
    <div className="chatbot-root fixed right-5 bottom-5 z-50 flex flex-col items-end font-sans">
      {/* Chat panel */}
      <div
        className="rounded-xl shadow-xl mb-2 transition-all"
        style={{
          width: 360,
          maxWidth: "calc(100vw - 40px)",
          backgroundColor: "#0f172a",
          color: "#e6eef9",
          transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(.98)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div className="chatbot-header flex justify-between items-center border-b border-gray-700 px-4 py-2">
          <h4 style={{ color: "#e6eef9", fontWeight: 600 }}>Ask Me Anything</h4>
          <button onClick={toggleChat} className="text-white font-bold">
            ✖
          </button>
        </div>

        {/* Messages */}
        <div
          className="chatbot-body flex flex-col gap-2 p-3 max-h-80 overflow-y-auto"
          aria-live="polite"
        >
          {messages.map((msg, i) => {
            const isUser = msg.sender === "user";
            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  style={{
                    backgroundColor: isUser ? "#1f6feb" : "#111827",
                    color: "#e6eef9",
                    padding: "8px 10px",
                    borderRadius: 10,
                    maxWidth: "85%",
                    boxShadow: "0 6px 18px rgba(2,6,23,0.35)",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.4,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input flex gap-2 p-2 border-t border-gray-700">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1,
              backgroundColor: "#0b1220",
              color: "#e6eef9",
              borderRadius: 8,
              padding: "8px 10px",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: "linear-gradient(90deg,#4dd0e1,#62e0ff 40%,#6d45ce)",
              color: "#06121a",
              borderRadius: 8,
              padding: "8px 12px",
              border: "none",
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button
        className="chatbot-toggle flex-center text-2xl transition-all duration-300 w-14 h-14 rounded-full shadow-lg"
        onClick={toggleChat}
        style={{
          background: "linear-gradient(90deg,#4dd0e1,#62e0ff 40%,#6d45ce)",
          color: "#04121a",
          zIndex: 60,
        }}
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
