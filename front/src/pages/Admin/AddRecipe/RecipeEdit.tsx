import { useForm } from "react-hook-form";
import {
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {editRecipe, getRecipe} from "../../../api/recipe/recipe.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthContext";

const editRecipeSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  instructions: z.string().min(3),
  type: z.string().min(3),
});

export function RecipeEdit() {
  const { handleSubmit, register, setValue } = useForm({
    shouldUseNativeValidation: true,
    resolver: zodResolver(editRecipeSchema),
  });

  const { auth } = useAuth();

  console.log(auth);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();

  async function onEdit(values: any) {
    try {
      await editRecipe({
        ...values,
        id: params.id,
      }, imageFile)

      toast({
        description: "Recipe successfully edited.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast({
          description: "Recipe edit error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  useEffect(() => {
    getRecipe(params.id as any).then((res) => {
      setValue("title", res.title);
      setValue("description", res.description);
      setValue("instructions", res.instructions);
      setValue("type", res.type);
    });
  }, [params, setValue]);

  return (
      <HeaderTemplate>
        <div className="h-full flex flex-col items-center ">
          <div className="flex justify-between w-[70%]">
            <form onSubmit={handleSubmit(onEdit)} className="w-full">
              <div className="grid grid-cols-2 grid-flow-row gap-14">
                <div className="mt-3">
                  <label>Title *</label>
                  <input
                      type="text"
                      placeholder="Title"
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("title")}
                  />
                </div>
                <div className="mt-3">
                  <label>Description *</label>
                  <input
                      type="text"
                      placeholder="Description"
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("description")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 grid-flow-row gap-14">
                <div className="mt-3">
                  <label>Instructions *</label>
                  <input
                      type="text"
                      placeholder="Instructions"
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("instructions")}
                  />
                </div>

                <div className="mt-3">
                  <label>Type *</label>
                  <select
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("type")}
                  >
                    <option value="">Select a cuisine type</option>
                    <option value="italian">Italian</option>
                    <option value="chinese">Chinese</option>
                    <option value="mexican">Mexican</option>
                    <option value="indian">Indian</option>
                    <option value="japanese">Japanese</option>
                    <option value="french">French</option>
                    <option value="thai">Thai</option>
                    <option value="greek">Greek</option>
                    <option value="spanish">Spanish</option>
                    <option value="brazilian">Brazilian</option>
                    <option value="middleEastern">Middle Eastern</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="korean">Korean</option>
                    <option value="african">African</option>
                    <option value="mediterranean">Mediterranean</option>
                  </select>
                </div>
                <div className="mt-3">
                  <label>Image *</label>
                  <input
                      type="file"
                      placeholder="Image"
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="text-xs text-zinc-500">* Required field</div>
                <div className="flex">
                  <Link to="/admin">
                    <button
                        type="button"
                        className="bg-red mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
                      type="submit"
                      className="bg-black ml-4 mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </HeaderTemplate>
  );
}