// components/Recipes/FeaturedRecipe.jsx
import React from 'react';
import { Clock, Users, Flame, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedRecipe = ({ recipe }) => {
  return (
    <section className="container mx-auto px-4 -mt-12 relative z-10">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-64 md:h-auto">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent"></div>
            <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full font-medium">
              Recipe of the Week
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-4">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="ml-2 font-medium">{recipe.rating} ({recipe.reviewCount} reviews)</span>
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              {recipe.title}
            </h2>
            
            <p className="text-gray-600 mb-6 text-lg">
              {recipe.description}
            </p>
            
            {/* Recipe Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-700">{recipe.prepTime + recipe.cookTime}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <div className="text-2xl font-bold text-amber-700">{recipe.servings}</div>
                <div className="text-sm text-gray-600">Servings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-700">{recipe.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
            </div>
            
            {/* Key Ingredients */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-700 mb-3">Key Ingredients:</h4>
              <div className="flex flex-wrap gap-3">
                {recipe.ingredients.slice(0, 4).map((ing, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                    {ing.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/recipes/${recipe.id}`}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-medium text-center transition-colors flex items-center justify-center"
              >
                View Full Recipe
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="flex-1 border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg font-medium transition-colors">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipe;