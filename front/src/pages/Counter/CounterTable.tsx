import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CounterList } from "./CounterList";
import {
  deleteIngredient,
  getIngredients,
} from "../../api/ingredient/ingredient.service";
import { Ingredient } from "../../interfaces/IngredientInterface";

export function CounterTable() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchIngredients = () => {
    getIngredients()
      .then((data) => setIngredients(data))
      .catch((error) => {
        toast({
          position: "top-right",
          description: "Error fetching ingredients",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const onEditIngredient = (ingredient: Ingredient) => {
    navigate(`/ingredient/${ingredient.id}/update`);
  };

  const onDeleteIngredient = async (ingredient: Ingredient) => {
    try {
      await deleteIngredient(ingredient.id);
      toast({
        position: "top-right",
        description: "Ingrediente excluido",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      fetchIngredients();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Erro ao deletar ingrediente",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <CounterList
        onDelete={onDeleteIngredient}
        onEdit={onEditIngredient}
        ingredients={ingredients}
      />
    </>
  );
}
