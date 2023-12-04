import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";
import {useToast} from "@chakra-ui/react";
import {getRecipe, getImage} from "../../../api/recipe/recipe.service";
import {getPerson} from "../../../api/person/person.service";

export function RecipeVisualize() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        id: "",
        title: "",
        instructions: "",
        description: "",
        type: "",
        image: "",
    });
    const [user, setUser] = useState({});
    const [recipeImage, setRecipeImage] = useState("");

    useEffect(() => {
        if (!id) return;
        getRecipe(id).then((recipe) => {
            setRecipe(recipe);
        });
    }, [id]);

    useEffect(() => {
        (async () => {
            if (recipe) {
                const imageData = await getImage(recipe.image);
                const imageUrl = URL.createObjectURL(imageData);
                setRecipeImage(imageUrl);

                const createdBy = await getPerson(recipe.userId);
                if (createdBy) {
                    setUser(createdBy);
                }
            }
        })();
    }, [recipe]);

    return (
        <HeaderTemplate>
            <div className="h-full flex flex-col items-center">
                <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center md:items-start mt-12 mb-16 px-6">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <img
                            className="object-contain h-64 w-full"
                            src={recipeImage}
                            alt="Recipe cover"
                        />
                    </div>
                    <div className="w-full md:w-2/3 mt-8 md:mt-0 md:pl-8">
                        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
                        <h2 className="text-xl font-bold mb-4">{recipe.description}</h2>
                        <p className="text-lg mb-6">{recipe.instructions}</p>
                        <p className="text-lg mb-6">Type: {recipe.type}</p>
                        <p className="text-lg mb-6">Published by: {user.firstName} {user.lastName}</p>
                    </div>
                </div>
            </div>
        </HeaderTemplate>
    );
}
