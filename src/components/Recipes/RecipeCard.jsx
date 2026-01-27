// components/Recipes/RecipeCard.jsx
import React from 'react';
import { Clock, Users, Flame, Star, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {recipe.featured && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
          <Bookmark className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      {/* Recipe Info */}
      <div className="p-6">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.category.slice(0, 2).map((cat, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
            >
              {cat}
            </span>
          ))}
          {recipe.tags.slice(0, 1).map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center">
              <Flame className="w-4 h-4 mr-1" />
              <span>{recipe.calories} cal</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="ml-1 font-medium">{recipe.rating}</span>
            <span className="text-gray-500 ml-1">({recipe.reviewCount})</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Link
            to={`/recipes/${recipe.id}`}
            className="text-green-700 hover:text-green-800 font-medium flex items-center group"
          >
            View Recipe
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg font-medium transition-colors">
              Cook This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;