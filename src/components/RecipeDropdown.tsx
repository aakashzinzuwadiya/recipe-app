// src/components/RecipeDropdown.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RecipeDropdownProps {
  onSelectRecipe: (recipeId: number) => void;
}

interface Recipe {
  id: number;
  name: string;
}

const RecipeDropdown: React.FC<RecipeDropdownProps> = ({ onSelectRecipe }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<number | undefined>();

  useEffect(() => {
    axios
      .get('https://dummyjson.com/recipes?select=name')
      .then((response) => setRecipes(response.data.recipes))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    setSelectedRecipe(selectedId);
    onSelectRecipe(selectedId);
  };

  return (
    <div className="w-full">
      <select
        className="w-full p-4 bg-white border border-gray-300 rounded-lg text-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 ease-in-out"
        value={selectedRecipe || ''}
        onChange={handleSelect}
      >
        <option value="" disabled>
          Select a recipe
        </option>
        {recipes.map((recipe) => (
          <option key={recipe.id} value={recipe.id} className="text-gray-700">
            {recipe.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RecipeDropdown;
