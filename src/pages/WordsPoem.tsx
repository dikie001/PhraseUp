import React, { useState, useEffect } from "react";
import {
  BookOpen,
  RefreshCw,
  Star,
  Volume2,
  Lightbulb,
  Heart,
  Feather,
} from "lucide-react";

interface Word {
  word: string;
  definition: string;
  pronunciation: string;
  example: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  partOfSpeech: string;
}

interface Poem {
  title: string;
  author: string;
  lines: string[];
  theme: string;
}

const WordLearningApp: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [favoriteWords, setFavoriteWords] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"words" | "poems">("words");
  const [learnedWords, setLearnedWords] = useState<number[]>([]);

  const words: Word[] = [
    {
      word: "Serendipity",
      definition:
        "The occurrence of pleasant discoveries by accident or when looking for something else",
      pronunciation: "/ˌserənˈdipədē/",
      example: "Finding that wonderful book was pure serendipity.",
      difficulty: "intermediate",
      partOfSpeech: "noun",
    },
    {
      word: "Ephemeral",
      definition: "Lasting for a very short time; transitory",
      pronunciation: "/əˈfem(ə)rəl/",
      example: "The beauty of cherry blossoms is ephemeral but unforgettable.",
      difficulty: "advanced",
      partOfSpeech: "adjective",
    },
    {
      word: "Luminous",
      definition: "Giving off light; bright or shining, especially in the dark",
      pronunciation: "/ˈlo͞omənəs/",
      example: "The luminous moon cast silver shadows across the lake.",
      difficulty: "intermediate",
      partOfSpeech: "adjective",
    },
    {
      word: "Resilient",
      definition: "Able to recover quickly from difficult conditions; flexible",
      pronunciation: "/rəˈzilyənt/",
      example: "Children are remarkably resilient in the face of change.",
      difficulty: "intermediate",
      partOfSpeech: "adjective",
    },
    {
      word: "Ubiquitous",
      definition: "Present, appearing, or found everywhere",
      pronunciation: "/yo͞oˈbikwədəs/",
      example: "Smartphones have become ubiquitous in modern society.",
      difficulty: "advanced",
      partOfSpeech: "adjective",
    },
    {
      word: "Mellifluous",
      definition: "Sweet or musical; pleasant to hear",
      pronunciation: "/məˈliflo͞oəs/",
      example: "Her mellifluous voice captivated the entire audience.",
      difficulty: "advanced",
      partOfSpeech: "adjective",
    },
  ];

  const poems: Poem[] = [
    {
      title: "Morning Light",
      author: "Anonymous",
      lines: [
        "Golden rays dance through the trees,",
        "Whispers carried on the breeze,",
        "Nature wakes with gentle ease,",
        "Morning brings such sweet release.",
      ],
      theme: "nature",
    },
    {
      title: "Dreams",
      author: "Anonymous",
      lines: [
        "In the realm of sleep we fly,",
        "Beyond the earth, beyond the sky,",
        "Where imagination runs free,",
        "And we become all we can be.",
      ],
      theme: "inspiration",
    },
    {
      title: "Friendship",
      author: "Anonymous",
      lines: [
        "A friend is like a shining star,",
        "That lights our way from near and far,",
        "Through stormy nights and sunny days,",
        "Their love will guide us through life's maze.",
      ],
      theme: "friendship",
    },
    {
      title: "Ocean's Song",
      author: "Anonymous",
      lines: [
        "Waves that crash upon the shore,",
        "Tell tales of depths and so much more,",
        "The ocean sings its ancient song,",
        "Of journeys vast and currents strong.",
      ],
      theme: "nature",
    },
  ];

  const currentWord = words[currentWordIndex];
  const currentPoem = poems[currentPoemIndex];

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
    setShowDefinition(false);
  };

  const previousWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + words.length) % words.length);
    setShowDefinition(false);
  };

  const nextPoem = () => {
    setCurrentPoemIndex((prev) => (prev + 1) % poems.length);
  };

  const previousPoem = () => {
    setCurrentPoemIndex((prev) => (prev - 1 + poems.length) % poems.length);
  };



  const markAsLearned = (index: number) => {
    setLearnedWords((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "nature":
        return "bg-green-100 text-green-800";
      case "friendship":
        return "bg-blue-100 text-blue-800";
      case "inspiration":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <BookOpen className="text-indigo-600" />
            Word & Poetry Explorer
          </h1>
          <p className="text-gray-600 text-lg">
            Expand your vocabulary and discover beautiful poetry
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 flex shadow-md border border-indigo-950">
            <button
              onClick={() => setActiveTab("words")}
              className={`px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2 ${
                activeTab === "words"
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Words
            </button>
            <button
              onClick={() => setActiveTab("poems")}
              className={`px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2 ${
                activeTab === "poems"
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              <Feather className="w-4 h-4" />
              Poems
            </button>
          </div>
        </div>

        {activeTab === "words" && (
          <div className="space-y-6">
            {/* Word Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                      currentWord.difficulty
                    )}`}
                  >
                    {currentWord.difficulty}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentWord.partOfSpeech}
                  </span>
                </div>
                <div className="flex gap-2">
         
                  <button
                    onClick={() => markAsLearned(currentWordIndex)}
                    className={`p-2 rounded-full transition-colors ${
                      learnedWords.includes(currentWordIndex)
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400 hover:text-green-500"
                    }`}
                  >
                    <Star
                      className="w-5 h-5"
                      fill={
                        learnedWords.includes(currentWordIndex)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-5xl font-bold text-gray-800 mb-2">
                  {currentWord.word}
                </h2>
                <p className="text-gray-500 text-lg mb-2">
                  {currentWord.pronunciation}
                </p>
                <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowDefinition(!showDefinition)}
                  className="w-full bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-600 transition-colors"
                >
                  {showDefinition ? "Hide Definition" : "Show Definition"}
                </button>

                {showDefinition && (
                  <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                    <p className="text-gray-800 text-lg mb-4 font-medium">
                      {currentWord.definition}
                    </p>
                    <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                      <p className="text-gray-600 italic">
                        "{currentWord.example}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={previousWord}
                className="bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium shadow-md border transition-colors"
              >
                Previous Word
              </button>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  {currentWordIndex + 1} of {words.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentWordIndex(
                      Math.floor(Math.random() * words.length)
                    );
                    setShowDefinition(false);
                  }}
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={nextWord}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-md transition-colors"
              >
                Next Word
              </button>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Your Progress
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {learnedWords.length}
                  </div>
                  <div className="text-gray-600">Words Learned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {favoriteWords.length}
                  </div>
                  <div className="text-gray-600">Favorites</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "poems" && (
          <div className="space-y-6">
            {/* Poem Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getThemeColor(
                      currentPoem.theme
                    )}`}
                  >
                    {currentPoem.theme}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentPoem.title}
                </h2>
                <p className="text-gray-600 text-lg">by {currentPoem.author}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
                <div className="space-y-3">
                  {currentPoem.lines.map((line, index) => (
                    <p
                      key={index}
                      className="text-gray-800 text-lg leading-relaxed text-center font-medium"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={previousPoem}
                className="bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium shadow-md border transition-colors"
              >
                Previous Poem
              </button>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  {currentPoemIndex + 1} of {poems.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentPoemIndex(
                      Math.floor(Math.random() * poems.length)
                    )
                  }
                  className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={nextPoem}
                className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md transition-colors"
              >
                Next Poem
              </button>
            </div>

            {/* Poem Collection */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Poem Collection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {poems.map((poem, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPoemIndex(index)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      index === currentPoemIndex
                        ? "bg-purple-100 border-2 border-purple-300"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="font-medium text-gray-800">
                      {poem.title}
                    </div>
                    <div className="text-sm text-gray-600">{poem.author}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordLearningApp;
