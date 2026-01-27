// components/Recipes/RecipeFilters.jsx
import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

const RecipeFilters = ({ difficulty, setDifficulty, cookingTime, setCookingTime, filterRecipes }) => {
  const difficultyOptions = [
    { id: 'all', label: 'All Levels' },
    { id: 'easy', label: 'Easy', color: 'text-green-600 bg-green-50' },
    { id: 'medium', label: 'Medium', color: 'text-amber-600 bg-amber-50' },
    { id: 'hard', label: 'Advanced', color: 'text-red-600 bg-red-50' },
  ];

  const timeOptions = [
    { id: 'all', label: 'Any Time' },
    { id: 'quick', label: 'Quick (<15 min)', icon: '⚡' },
    { id: 'medium', label: 'Medium (<30 min)', icon: '⏱️' },
    { id: 'long', label: 'Take Your Time', icon: '🍳' },
  ];

  return (
    <div className="space-y-6">
      {/* Difficulty Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-700" />
          Difficulty Level
        </h3>
        <div className="space-y-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setDifficulty(option.id)}
              className={`flex items-center w-full p-3 rounded-lg transition-all ${
                difficulty === option.id
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full mr-3 ${
                option.id === 'easy' ? 'bg-green-500' :
                option.id === 'medium' ? 'bg-amber-500' :
                option.id === 'hard' ? 'bg-red-500' : 'bg-gray-400'
              }`} />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Time Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-green-700" />
          Cooking Time
        </h3>
        <div className="space-y-2">
          {timeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setCookingTime(option.id)}
              className={`flex items-center w-full p-3 rounded-lg transition-all ${
                cookingTime === option.id
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{option.icon || '🕒'}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Health Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Health Benefits</h3>
        <div className="space-y-3">
          {[
            { label: 'Immunity Boosting', color: 'bg-blue-100 text-blue-800' },
            { label: 'Digestive Health', color: 'bg-green-100 text-green-800' },
            { label: 'Heart Healthy', color: 'bg-red-100 text-red-800' },
            { label: 'Diabetic Friendly', color: 'bg-purple-100 text-purple-800' },
            { label: 'Weight Management', color: 'bg-amber-100 text-amber-800' },
          ].map((benefit) => (
            <label key={benefit.label} className="flex items-center cursor-pointer">
              <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 mr-3" />
              <span className={`px-3 py-2 rounded-lg text-sm font-medium ${benefit.color}`}>
                {benefit.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;