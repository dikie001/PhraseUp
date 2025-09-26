import {
  BookOpen,
  Feather,
  Lightbulb,
  RefreshCw,
  Star,
  Volume2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import allWords from "../assets/jsons/words.json";
import allPoems from "../assets/jsons/poems.json";

interface Word {
  word: string;
  definition: string;
  pronunciation: string;
  example: string;
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
  const [poems, setPoems] = useState<Poem[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentWord = words[currentWordIndex];
  const currentPoem = poems[currentPoemIndex];

  //   Load the words and poems from json
  useEffect(() => {
    const InitialLoad = () => {
      console.log(allPoems);
      setPoems(allPoems);
      setWords(allWords);
      console.log(allWords);
    };
    InitialLoad();
  }, []);


const sentences = [
  "Words that shine.",
  "Poetry in motion.",
  "Unlock expression.",
  "Feel the rhythm.",
  "Verses that live.",
  "Language reimagined.",
  "Echoes of meaning.",
  "Discover your voice.",
  "Where words dance.",
  "Infinite inspiration.",
];


  //   Auto updating text with typing effect
  useEffect(() => {
    const currentWord = sentences[wordIndex];

    let typingSpeed = deleting ? 40 : 100; 
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < currentWord.length) {
        setDisplayedText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (deleting && charIndex > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!deleting && charIndex === currentWord.length) {
        // pause before deleting
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        if(wordIndex === sentences.length - 1){
            setWordIndex(0);
        } else{
            setWordIndex((prev) => prev + 1);
        }
        
        // setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
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
          <div className="flex justify-center h-14">
            {" "}
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              {displayedText}
            </h1>
          </div>
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
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentWord?.partOfSpeech}
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

              <div className="text-center mb-2">
                <h2 className="text-5xl font-bold text-gray-800 mb-2">
                  {currentWord?.word}
                </h2>
                <p className="text-gray-500 text-lg mb-2">
                  {currentWord?.pronunciation}
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
            <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="text-center mb-2">
                <div className="flex justify-start mb-2">
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

              <div className="mb-4 bg-gradient-to-r  from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
                <div className="space-y-4">
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
