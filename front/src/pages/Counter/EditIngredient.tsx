import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editIngredient,
  getIngredient,
} from "../../api/ingredient/ingredient.service";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { useEffect, useState } from "react";

const editIngredientSchema = z.object({
  name: z.string().min(3),
  qtd: z.string().min(3),
  tags: z.string().min(3),
});

export function IngredientEdit() {
  const { handleSubmit, register, setValue } = useForm({
    shouldUseNativeValidation: true,
    resolver: zodResolver(editIngredientSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();

  async function onEdit(values: any) {
    try {
      await editIngredient({
        ...values,
        id: params.id,
      });

      toast({
        description: "Ingrediente editado com sucesso",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast({
          description: "Ingrediente não pode ser editado",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  useEffect(() => {
    getIngredient(params.id as any).then((res) => {
      setValue("name", res.name);
      // setValue("author", res.author);
      setValue("qtd", res.qtd);
      setValue("tags", res.tags);
      // setValue("price", res.price);
      // setValue("type", res.type);
    });
  }, [params, setValue]);

  return (
    <HeaderTemplate>
      <div className="h-full flex flex-col items-center ">
        <div className="flex justify-between w-[70%]">
          <form onSubmit={handleSubmit(onEdit)} className="w-full">
            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Nome *</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("title")}
                />
              </div>
              <div className="mt-3">
                <label>Quantidade *</label>
                <input
                  type="text"
                  placeholder="Quantidade"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("qtd")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Tags</label>
                <input
                  type="text"
                  placeholder="Tags"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("tags")}
                />
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="text-xs text-zinc-500">* Campo Obrigatório</div>
              <div className="flex">
                <Link to="/admin">
                  <button
                    type="button"
                    className="bg-red mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                  >
                    Cancelar
                  </button>
                </Link>
                <button
                  type="submit"
                  className="bg-black ml-4 mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                >
                  Editar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HeaderTemplate>
  );
}
