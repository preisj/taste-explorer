import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getRecipesByType, getImage} from "../../../api/recipe/recipe.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";

const cuisineTypes: any = {
    "italian": "Italian",
    "chinese": "Chinese",
    "mexican": "Mexican",
    "indian": "Indian",
    "japanese": "Japanese",
    "french": "French",
    "thai": "Thai",
    "greek": "Greek",
    "spanish": "Spanish",
    "brazilian": "Brazilian",
    "middleEastern": "Middle Eastern",
    "vietnamese": "Vietnamese",
    "korean": "Korean",
    "african": "African",
    "mediterranean": "Mediterranean",
};

export function CategoryVisualize() {
    const { type } = useParams() as any;
    const [recipes, setRecipes] = useState([]);
    const [recipeImages, setRecipeImages] = useState([]);

    useEffect(() => {
        if (!type) return;
        getRecipesByType(type).then((recipes) => {
            // @ts-ignore
            setRecipes(recipes);
        });
    }, [type]);

    useEffect(() => {
        const fetchRecipeImages = async () => {
            if (recipes) {
                const imageLinks = await Promise.all(
                    recipes.map(async (recipe) => {
                        const imageData = await getImage(recipe.image);
                        const imageUrl = URL.createObjectURL(imageData);
                        return {
                            id: recipe.id,
                            cover: imageUrl,
                            label: recipe.title,
                            //author: recipe.author,
                            description: recipe.instructions,
                        };
                    })
                );
                setRecipeImages(imageLinks);
            }
        };

        fetchRecipeImages();
    }, [recipes]);

    return (
        <HeaderTemplate>
            <div className="m-12">
                <h1 className="text-3xl font-bold mb-8">{cuisineTypes[type]} Recipes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipeImages.map((recipe) => (
                        // @ts-ignore
                        <Link to={`/recipe/${recipe.id}/visualize`} key={recipe.id}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="h-64 bg-gray-300">
                                    <img
                                        className="object-contain h-full w-full"
                                        src={recipe.cover}
                                        alt="Recipe cover"
                                    />
                                </div>
                                <div className="p-4">
                                    {/*@ts-ignore*/}
                                    <h2 className="text-lg font-bold mb-2">{recipe.label}</h2>
                                    {/*@ts-ignore*/}
                                    <p className="text-gray-600 text-sm">{recipe.author}</p>
                                    {/*@ts-ignore*/}
                                    <p className="text-gray-600 text-sm">{recipe.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </HeaderTemplate>
    );
}
