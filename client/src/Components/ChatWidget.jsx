import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./ChatWidget.css";

const botReplies = [
  "Thank you for reaching out! How can I help you today?",
  "Our temple visiting hours are 9 AM – 8 PM daily.",
  "You can book a guided tour from the Tour Guide section.",
  "For donations, please visit our Donate page.",
  "Feel free to ask anything about events, seva, or parking!",
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, text: "Namaste! 🙏 Welcome to MyAkshardham. How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), text, sender: "user" };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages((m) => [...m, { id: Date.now() + 1, text: reply, sender: "bot" }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <MessageCircle size={18} />
            <div>
              <p className="chat-title">MyAkshardham Support</p>
              <p className="chat-sub">We reply instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chat-row ${m.sender === "user" ? "user" : "bot"}`}
              >
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
            />
            <button onClick={send} disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;