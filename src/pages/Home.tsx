import React from 'react';
import { Play, Tv2, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Launch Your Own TV Network
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Create and manage your own TV channels using YouTube playlists. Stream content 24/7 and build your audience.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Get Started
        </button>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <Tv2 className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create Channels</h3>
          <p className="text-gray-400">
            Build custom channels with your favorite YouTube content and schedule them your way.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <Play className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">24/7 Streaming</h3>
          <p className="text-gray-400">
            Your channels run non-stop, providing continuous entertainment for your viewers.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <Users className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Grow Community</h3>
          <p className="text-gray-400">
            Build an engaged audience around your curated content and interact with viewers.
          </p>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Featured Channels</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
                <img
                  src={`https://source.unsplash.com/random/150x150?tv,${i}`}
                  alt="Channel thumbnail"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold">Channel Name {i}</h4>
                  <p className="text-gray-400 text-sm">1.2k viewers</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Why Choose StreamHub?</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>Easy to use channel management</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>YouTube playlist integration</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>Customizable scheduling</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>Real-time analytics</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}