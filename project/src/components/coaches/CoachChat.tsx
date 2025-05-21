import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { CoachMessage } from '../../types';

interface CoachChatProps {
  coachType: 'sport' | 'diet' | 'injury';
  coachName: string;
  initialMessage?: string;
  onSendMessage: (message: string) => Promise<string>;
}

const CoachChat: React.FC<CoachChatProps> = ({
  coachType,
  coachName,
  initialMessage = 'Bonjour, comment puis-je vous aider aujourd\'hui?',
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: '1',
      coachType,
      message: initialMessage,
      date: new Date(),
      isUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: CoachMessage = {
      id: Date.now().toString(),
      coachType,
      message: newMessage,
      date: new Date(),
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Get response from coach
      const response = await onSendMessage(newMessage);
      
      // Add coach response
      const coachResponse: CoachMessage = {
        id: (Date.now() + 1).toString(),
        coachType,
        message: response,
        date: new Date(),
        isUser: false,
      };
      
      setMessages((prev) => [...prev, coachResponse]);
    } catch (error) {
      console.error('Error getting response from coach:', error);
      
      // Add error message
      const errorMessage: CoachMessage = {
        id: (Date.now() + 1).toString(),
        coachType,
        message: 'Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.',
        date: new Date(),
        isUser: false,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getMessageClasses = (message: CoachMessage) => {
    if (message.isUser) {
      return 'bg-blue-100 text-blue-900 ml-auto';
    }
    
    switch (coachType) {
      case 'sport':
        return 'bg-sport-100 text-sport-900';
      case 'diet':
        return 'bg-diet-100 text-diet-900';
      case 'injury':
        return 'bg-injury-100 text-injury-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };
  
  const getAvatarClasses = () => {
    switch (coachType) {
      case 'sport':
        return 'bg-sport-600';
      case 'diet':
        return 'bg-diet-600';
      case 'injury':
        return 'bg-injury-600';
      default:
        return 'bg-gray-600';
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start">
              {!message.isUser && (
                <div className={`w-8 h-8 rounded-full ${getAvatarClasses()} flex items-center justify-center text-white font-medium mr-2 flex-shrink-0`}>
                  {coachName.charAt(0)}
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] ${getMessageClasses(
                  message
                )}`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Intl.DateTimeFormat('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(message.date))}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
              <div className={`w-8 h-8 rounded-full ${getAvatarClasses()} flex items-center justify-center text-white font-medium mr-2 flex-shrink-0`}>
                {coachName.charAt(0)}
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            className="input flex-1 mr-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez un message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`p-2 rounded-md ${
              coachType === 'sport'
                ? 'bg-sport-600 hover:bg-sport-700'
                : coachType === 'diet'
                ? 'bg-diet-600 hover:bg-diet-700'
                : 'bg-injury-600 hover:bg-injury-700'
            } text-white`}
            disabled={isLoading || !newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachChat;