// src/components/RecipeDetails.tsx
import React, { useEffect, useState } from 'react';

interface RecipeDetailsProps {
  recipeId: number | undefined;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  difficulty: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);

  useEffect(() => {
    if (recipeId) {
      // Use fetch instead of axios to allow service worker caching
      fetch(`https://dummyjson.com/recipes/${recipeId}`)
        .then((response) => response.json())
        .then((data) => setRecipeDetails(data))
        .catch((error) => console.error('Error fetching recipe details:', error));
    }
  }, [recipeId]);

  if (!recipeDetails) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{recipeDetails.name}</h2>
      <p className="mb-2">
        <strong>Ingredients:</strong> {recipeDetails.ingredients.join(', ')}
      </p>
      <p className="mb-2">
        <strong>Instructions:</strong> {recipeDetails.instructions}
      </p>
      <p>
        <strong>Difficulty:</strong> {recipeDetails.difficulty}
      </p>
    </div>
  );
};

export default RecipeDetails;
