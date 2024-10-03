// src/App.tsx
import React, { useState } from 'react';
import RecipeDropdown from './components/RecipeDropdown';
import RecipeDetails from './components/RecipeDetails';

const App: React.FC = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | undefined>();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')`, // Replace with your own image URL or local image path
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/50 to-black/70"></div>

      {/* Centered Box Container */}
      <div className="relative z-10 bg-gradient-to-r from-white/70 via-white/80 to-white/70 border border-gray-200 rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-3xl text-gray-900">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-4 md:mb-6 leading-tight">
          Discover Delicious Recipes!
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-gray-600 mb-6 md:mb-8 font-light">
          Choose from a variety of recipes to satisfy your cravings.
        </p>

        {/* Recipe Dropdown */}
        <RecipeDropdown onSelectRecipe={setSelectedRecipeId} />

        {/* Recipe Details */}
        {selectedRecipeId !== undefined && (
          <div className="mt-8">
            <RecipeDetails recipeId={selectedRecipeId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
