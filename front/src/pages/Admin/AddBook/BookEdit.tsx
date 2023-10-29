import { useForm } from "react-hook-form";
import {
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {editBook, getBook} from "../../../api/book/book.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";
import {useEffect, useState} from "react";

const editBookSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  description: z.string().min(3),
  price: z.number().min(0),
  type: z.string().min(3),
});

export function BookEdit() {
  const { handleSubmit, register, setValue } = useForm({
    shouldUseNativeValidation: true,
    resolver: zodResolver(editBookSchema),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();

  async function onEdit(values: any) {
    try {
      await editBook({
        ...values,
        id: params.id,
      }, imageFile)

      toast({
        description: "Book successfully edited.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast({
          description: "Book edit error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  useEffect(() => {
    getBook(params.id as any).then((res) => {
      setValue("title", res.title);
      setValue("author", res.author);
      setValue("description", res.description);
      setValue("price", res.price);
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
                  <label>Author *</label>
                  <input
                      type="text"
                      placeholder="Author"
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("author")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 grid-flow-row gap-14">
                <div className="mt-3">
                  <label>Description *</label>
                  <input
                      type="text"
                      placeholder="Description"
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("description")}
                  />
                </div>

                <div className="mt-3">
                  <label>Type *</label>
                  <select
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("type")}
                  >
                    <option value="">Select a type</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Sci-fi">Sci-fi</option>
                    <option value="Romance">Romance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 grid-flow-row gap-14">
                <div className="mt-3">
                  <label>Price *</label>
                  <input
                      type="number"
                      placeholder="Price"
                      className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                      {...register("price")}
                  />
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