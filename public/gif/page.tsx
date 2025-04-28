'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SignEntry {
  word: string;
  description: string;
  imageUrl?: string;
}

const DictionaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const signDictionary: SignEntry[] = [
    {
      word: 'Hello',
      description: 'Extend your right hand flat, palm facing forward, and wave from side to side.',
      imageUrl: '/images/hello.gif',
    },

    {
      word: 'Thank You',
      description: 'Touch your chin or lips with the fingertips of your flat hand, then move your hand forward.',
      imageUrl: '/images/thank-you.gif',
    },

    {
      word: 'Please',
      description: 'Rub your flat hand in a circular motion on your chest.',
      imageUrl: '/images/please.gif',
    },
    {
      word: 'Happy',
      description: 'Place both hands flat on chest, then move them up and outward in a circular motion.',
      imageUrl: '/images/happy.gif',
    },
    {
      word: 'Sorry',
      description: 'Make a fist and circle it over your chest clockwise.',
      imageUrl: '/images/sorry.gif',
    },
    {
      word: 'Yes',
      description: 'Make your hand into a fist and nod it up and down like a nodding head.',
      imageUrl: '/images/yes.gif',
    },
    {
      word: 'No',
      description: 'Extend your index and middle fingers together, then move them back and forth like a head shake.',
      imageUrl: '/images/no.gif',
    },
    {
      word: 'Understand',
      description: 'Place your index finger on your forehead, then move it forward and down with a confident motion.',
      imageUrl: '/images/understand.gif',
    },
    {
      word: 'Love You',
      description: 'Extend your thumb, index finger, and indigoy finger while keeping other fingers down.',
      imageUrl: '/images/loveyou.gif',
    }
    // Add more sign entries as needed

  ];

  const filteredSigns = signDictionary.filter((entry) =>
    entry.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600 text-center">Sign Language Dictionary</h1>
      
      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search signs..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dictionary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSigns.map((entry, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all 
                     bg-gradient-to-br from-white to-indigo-50 hover:from-indigo-50 hover:to-white
                     border-indigo-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-600">{entry.word}</h2>
            <p className="text-gray-700 mb-4">{entry.description}</p>
            {entry.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={entry.imageUrl}
                  alt={`Sign for ${entry.word}`}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSigns.length === 0 && (
        <p className="text-center text-indigo-600 mt-8">
          No signs found for `{searchTerm}`
        </p>
      )}
    </div>
  );
};

export default DictionaryPage;
