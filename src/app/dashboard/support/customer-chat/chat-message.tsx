interface ChatMessageProps {
  text: string;
  sender: 'user' | 'support' | string;
}

export default function ChatMessage({ text, sender }: ChatMessageProps) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs rounded-lg px-3 py-2 ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
      >
        {text}
      </div>
    </div>
  );
}
