import { useState, lazy, Suspense, useCallback } from 'react';
import { MessageSquare } from 'lucide-react';

const ChatBotModal = lazy(() => import('./ChatBotModal'));

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);

  const preloadModal = useCallback(() => {
    if (!isPreloaded) {
      setIsPreloaded(true);
      import('./ChatBotModal');
    }
  }, [isPreloaded]);

  const handleToggle = () => {
    preloadModal();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        onMouseEnter={preloadModal}
        onTouchStart={preloadModal}
        aria-label="Open TalBot AI assistant"
        className={`fixed bottom-6 left-6 p-4 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 z-[100] cursor-pointer ${
          isOpen ? 'scale-0 pointer-events-none' : 'scale-100 hover:scale-110'
        }`}
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <Suspense fallback={null}>
          <ChatBotModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default ChatBot;
