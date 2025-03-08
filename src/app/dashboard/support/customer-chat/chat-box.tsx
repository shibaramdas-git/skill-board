'use client';
import { useState } from 'react';
import ChatMessage from './chat-message';
// import ChatMessage from '@/components/chat-message';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can we assist you?', sender: 'support' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div className='w-full max-w-md rounded-lg border p-4'>
      <div className='h-64 space-y-2 overflow-y-auto'>
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      <div className='mt-2 flex'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 rounded-l-lg border px-2 py-1'
          placeholder='Type a message...'
        />
        <button
          onClick={sendMessage}
          className='rounded-r-lg bg-blue-600 px-4 text-white'
        >
          Send
        </button>
      </div>
    </div>
  );
}
