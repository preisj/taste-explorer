import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Recipe } from "../../../interfaces/RecipeInterface";
import { RecipesList } from "./RecipesList";
import { deleteRecipe, getRecipes } from "../../../api/recipe/recipe.service";

export function RecipesTable() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchRecipes = () => {
    getRecipes()
        .then((data) => setRecipes(data))
        .catch((error) => {
          toast({
            position: "top-right",
            description: "Error fetching recipes",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onEditRecipe = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}/update`);
  };

  const onDeleteRecipe = async (recipe: Recipe) => {
    try {
      await deleteRecipe(recipe.id);
      toast({
        position: "top-right",
        description: "Recipe deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      fetchRecipes();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Error deleting recipe",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
      <>
        <RecipesList onDelete={onDeleteRecipe} onEdit={onEditRecipe} recipes={recipes} />
      </>
  );
}
