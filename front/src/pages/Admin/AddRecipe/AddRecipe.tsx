import { useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/axios";
import { NormalModal } from "../../../components/Modal/NormalModal";
import { addRecipe } from "../../../api/recipe/recipe.service";
import {useAuth} from "../../../context/AuthContext";

export function AddRecipe() {
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [type, setType] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { auth } = useAuth();
  const { personId } = auth;

  function createNewRecipe(event: FormEvent) {
    event.preventDefault();

    if (!title || !description || !instructions || !type || !imageFile) {
      return;
    }

    addRecipe(
      {
        title,
        description,
        instructions,
        type,
        userId: personId
      },
      imageFile
    )
      .then(() => {
        clearForm();
        toast({
          description: "New recipe created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          description: "Error creating new recipe",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }

  function clearForm() {
    setTitle("");
    setDescription("");
    setInstructions("");
    setType("");
    setImageFile(null);
  }

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex justify-between w-[70%]">
        <form onSubmit={createNewRecipe} className="w-full">
          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Título *</label>
              <input
                type="text"
                placeholder="Título *"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>Descrição *</label>
              <input
                type="text"
                placeholder="Descrição"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Instruções *</label>
              <input
                type="text"
                placeholder="Instruções"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>Type *</label>
              <select
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
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
              <label>Imagem *</label>
              <input
                type="file"
                placeholder="Imagem"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                // @ts-ignore
                onChange={(event) => setImageFile(event.target.files?.[0])}
              />
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="text-xs text-zinc-500">* Campo Obrigatório</div>
            <div className="flex">
              <button
                onClick={() => setIsModalVisible(true)}
                className="mt-4 rounded-lg p-2 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white bg-zinc-500"
              >
                Limpar
              </button>
              <button
                type="submit"
                className="ml-4 bg-red mt-4 rounded-lg p-2 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
              >
                Criar
              </button>
            </div>
          </div>
        </form>
      </div>

      {isModalVisible ? (
        <NormalModal
          text="Are you sure you want to clear the fields?"
          onCloseModal={() => {
            setIsModalVisible(false);
          }}
          confirmClear={() => {
            setIsModalVisible(false);
            clearForm();
          }}
        />
      ) : null}
    </div>
  );
}
