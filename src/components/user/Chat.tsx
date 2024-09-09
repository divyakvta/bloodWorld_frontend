import axios from "axios";
import { ArrowBigLeftDash, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define types for messages
interface Message {
  _id: string;
  text: string;
  senderId: string;
  createdAt: string;
  isOwnMessage?: boolean; // Optional to manage own messages
}

const Chat = () => {
  const { chatId } = useParams<string>();  // Get chatId from URL
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');  // State for new message

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${chatId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post(`/api/chat/${chatId}/messages`, { text: newMessage });
        setNewMessage('');  // Clear input after sending

        // Optionally, re-fetch messages or add new message to state
        // You can fetch messages again or optimistically update the UI
        setMessages(prevMessages => [...prevMessages, {
          _id: new Date().toISOString(),
          text: newMessage,
          senderId: 'currentUserId',  // Replace with actual sender ID
          createdAt: new Date().toISOString(),
          isOwnMessage: true
        }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="container max-w-3xl mx-auto flex justify-center items-center h-screen rounded-lg bg-gray-100">
      <div className="container max-w-2xl mx-auto bg-white shadow-md rounded-lg flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white py-10 shadow-md flex items-center rounded-t-lg">
          <button className="ml-2 sm:ml-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
            <ArrowBigLeftDash />
          </button>
          <h2 className="ml-4 text-lg font-bold">Neerav</h2>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`flex mb-4 ${msg.isOwnMessage ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs sm:max-w-md lg:max-w-lg p-4 rounded-xl ${msg.isOwnMessage ? "bg-blue-100 text-black" : "bg-pink-100"}`}>
                <div className="flex items-center space-x-2">
                  {!msg.isOwnMessage && (
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 flex items-center rounded-b-lg">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write something..."
            className="flex-1 border-2 border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 sm:ml-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
