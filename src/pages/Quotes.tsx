import React, { useState } from 'react';
import { Heart, Share2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

const quotes: Quote[] = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Motivation"
  },
  {
    id: 2,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Inspiration"
  },
  {
    id: 3,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams"
  },
  {
    id: 4,
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    category: "Success"
  },
  {
    id: 5,
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "Innovation"
  },
  {
    id: 6,
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    id: 7,
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "Adventure"
  },
  {
    id: 8,
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "Personal Growth"
  }
];

const categories = ['All', ...Array.from(new Set(quotes.map(q => q.category)))];

const Quotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || quote.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
    toast.success(favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites');
  };

  const shareQuote = (quote: Quote) => {
    if (navigator.share) {
      navigator.share({
        title: 'Inspiring Quote',
        text: `"${quote.text}" - ${quote.author}`,
      });
    } else {
      navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      toast.success('Quote copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Inspirational Quotes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover wisdom and motivation from great minds
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search quotes or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map(quote => (
            <div
              key={quote.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 relative group"
            >
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleFavorite(quote.id)}
                  className={`p-2 rounded-full transition-colors ${
                    favorites.includes(quote.id)
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(quote.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => shareQuote(quote)}
                  className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  aria-label="Share quote"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <blockquote className="text-gray-900 dark:text-white mb-4">
                <p className="text-lg italic leading-relaxed">"{quote.text}"</p>
              </blockquote>

              <div className="flex justify-between items-center">
                <cite className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  — {quote.author}
                </cite>
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {quote.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No quotes found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
