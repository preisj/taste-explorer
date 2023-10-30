import { useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/axios";
import { NormalModal } from "../../../components/Modal/NormalModal";
import {addRecipe} from "../../../api/recipe/recipe.service";

export function AddRecipe() {
  const toast = useToast();

  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  // const [type, setType] = useState("");
  // const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  function createNewRecipe(event: FormEvent) {
    event.preventDefault();

    // if (!title || !author || !type || !price || !description || !imageFile) {
    //   return;
    // }
    if (!title || !description || !instructions || !imageFile) {
      return;
    }

    addRecipe({
      title,
      // author,
      description,
      instructions,
      // type,
      // price
    }, imageFile).then(() => {
      clearForm();
      toast({
        description: "New recipe created",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }).catch((error) => {
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
    // setAuthor("");
    setDescription("")
    setInstructions("")
    // setType("");
    // setPrice(0);
    setImageFile(null);
  }

  return (
      <div className="h-full flex flex-col items-center ">
        <div className="flex justify-between w-[70%]">
          <form onSubmit={createNewRecipe} className="w-full">
            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Title *</label>
                <input
                    type="text"
                    placeholder="Title *"
                    className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              {/*<div className="mt-3">*/}
              {/*  <label>Author *</label>*/}
              {/*  <input*/}
              {/*      type="text"*/}
              {/*      placeholder="Author"*/}
              {/*      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"*/}
              {/*      value={author}*/}
              {/*      onChange={(event) => setAuthor(event.target.value)}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="mt-3">
                <label>Description *</label>
                <input
                    type="text"
                    placeholder="Description"
                    className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
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
                    value={description}
                    onChange={(event) => setInstructions(event.target.value)}
                />
              </div>

              {/*<div className="mt-3">*/}
              {/*  <label>Type *</label>*/}
              {/*  <select*/}
              {/*      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"*/}
              {/*      value={type}*/}
              {/*      onChange={(event) => setType(event.target.value)}*/}
              {/*  >*/}
              {/*    <option value="">Select a type</option>*/}
              {/*    <option value="Fantasy">Fantasy</option>*/}
              {/*    <option value="Thriller">Thriller</option>*/}
              {/*    <option value="Sci-fi">Sci-fi</option>*/}
              {/*    <option value="Romance">Romance</option>*/}
              {/*  </select>*/}
              {/*</div>*/}
              <div className="mt-3">
                <label>Image *</label>
                <input
                    type="file"
                    placeholder="Image"
                    className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                    // @ts-ignore
                    onChange={(event) => setImageFile(event.target.files?.[0])}
                />
              </div>
            </div>

            {/*<div className="grid grid-cols-2 grid-flow-row gap-14">*/}
            {/*  <div className="mt-3">*/}
            {/*    <label>Price *</label>*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        step="0.01"*/}
            {/*        placeholder="Price"*/}
            {/*        className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"*/}
            {/*        value={price}*/}
            {/*        onChange={(event) => setPrice(parseFloat(event.target.value))}*/}
            {/*    />*/}
            {/*  </div>*/}

            {/*  <div className="mt-3">*/}
            {/*    <label>Image *</label>*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        placeholder="Image"*/}
            {/*        className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"*/}
            {/*        // @ts-ignore*/}
            {/*        onChange={(event) => setImageFile(event.target.files?.[0])}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="w-full flex justify-between items-center">
              <div className="text-xs text-zinc-500">* Required field</div>
              <div className="flex">
                <button
                    onClick={() => setIsModalVisible(true)}
                    className="mt-4 rounded-lg p-2 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white bg-zinc-500"
                >
                  Clear
                </button>
                <button
                    type="submit"
                    className="ml-4 bg-red mt-4 rounded-lg p-2 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                >
                  Create
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