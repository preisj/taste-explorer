import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { NormalModal } from "../../../components/Modal/NormalModal";
import { addPerson } from "../../../api/person/person.service";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().nonempty(),
  password: z.string().min(5),
  role: z.string().min(3),
  phone: z.string().min(11).max(11),
  address: z.string().min(3),
});

type AddUserData = z.infer<typeof addUserSchema>;

export function AddUser() {
  const toast = useToast();

  const { handleSubmit, register, reset } = useForm<AddUserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
    shouldUseNativeValidation: true,
    resolver: zodResolver(addUserSchema),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFormSubmit = async (data: AddUserData) => {
    try {
      await addPerson(data);

      toast({
        description: "New user created",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        let errorDescription = "Error while creating user";

        if (error.response?.status === 409) {
          errorDescription = "E-mail already exists";
        }

        toast({
          description: errorDescription,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex justify-between w-[70%]">
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Primeiro Nome *</label>
              <input
                type="text"
                placeholder="Primeiro Nome *"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("firstName")}
              />
            </div>

            <div className="mt-3">
              <label>Sobrenome *</label>
              <input
                type="text"
                placeholder="Sobrenome"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("lastName")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Telefone *</label>
              <input
                type="text"
                placeholder="Telefone"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("phone")}
              />
            </div>

            <div className="mt-3">
              <label>Email *</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("email")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Papel *</label>
              <select
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("role")}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="mt-3">
              <label>Endereço *</label>
              <input
                type="text"
                placeholder="Endereço"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("address")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Senha *</label>
              <input
                type="text"
                placeholder="Senha"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("password")}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-xs text-zinc-500">* Campo Obrigatório</div>
            <div className="flex">
              <button
                onClick={() => setIsModalVisible(true)}
                type="button"
                className="bg-red mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
              >
                Limpar
              </button>
              <button
                type="submit"
                className="bg-black ml-4 mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
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
            reset();
          }}
        />
      ) : null}
    </div>
  );
}
