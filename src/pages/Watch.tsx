import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Users, ThumbsUp, Share2, MessageCircle } from 'lucide-react';

interface VideoData {
  title: string;
  url: string;
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  avatar: string;
}

export default function Watch() {
  const { channelId } = useParams();
  const [currentVideo, setCurrentVideo] = useState<VideoData>({
    title: 'Current Video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  });
  const [viewers, setViewers] = useState(245);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Simulate real-time viewer updates
    const viewerInterval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    // Simulate incoming chat messages
    const chatInterval = setInterval(() => {
      const randomMessage: ChatMessage = {
        id: Date.now(),
        user: `User${Math.floor(Math.random() * 100)}`,
        message: ['Amazing stream! 🎉', 'Great content!', 'Love this channel!'][Math.floor(Math.random() * 3)],
        avatar: `https://source.unsplash.com/random/32x32?face,${Math.random()}`,
      };
      setChatMessages(prev => [...prev.slice(-49), randomMessage]);
    }, 8000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      avatar: `https://source.unsplash.com/random/32x32?face,me`,
    };
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <ReactPlayer
            url={currentVideo.url}
            width="100%"
            height="100%"
            playing
            controls
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4">{currentVideo.title}</h1>
          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-purple-400 font-medium">{viewers} watching</span>
              </div>
              <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <ThumbsUp className="h-5 w-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Up Next</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <div className="w-32 h-20 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/128x72?video,${i}`}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium line-clamp-2">Upcoming Video {i}</h3>
                  <p className="text-sm text-purple-400">Starting in {i * 15} minutes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg">
          <div className="p-4 border-b border-gray-700 flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold">Live Chat</h2>
          </div>
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <img
                    src={msg.avatar}
                    alt={msg.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="font-medium text-sm text-purple-400">{msg.user}</span>
                    <p className="text-sm text-gray-300">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Send a message..."
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}