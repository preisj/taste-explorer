import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { addPerson } from "../../api/person/person.service";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().nonempty(),
  password: z.string().min(5),
  role: z.string().optional().nullable(),
  phone: z.string().min(11).max(11),
  address: z.string().min(3),
});

type RegisterUserData = z.infer<typeof registerUserSchema>;

export function Register() {
  const toast = useToast();

  const { handleSubmit, register, reset } = useForm<RegisterUserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
    shouldUseNativeValidation: true,
    resolver: zodResolver(registerUserSchema),
  });

  const onFormSubmit = async (data: RegisterUserData) => {
    try {
      await addPerson(data);

      toast({
        description: "Registration successful!",
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
    <>
      <div className="flex-col flex items-center w-full justify-center h-full mt-32">
        <strong className="text-4xl font-extrabold text-zinc-100">
          Cadastro
        </strong>
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center justify-center mt-4 w-full">
              <input
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Nome"
                autoFocus
                {...register("firstName")}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <input
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Sobrenome"
                autoFocus
                {...register("lastName")}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <input
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Email"
                autoFocus
                {...register("email")}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <input
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Senha"
                type="password"
                autoFocus
                {...register("password")}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <input
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Telefone"
                autoFocus
                {...register("phone")}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <input
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Endereço"
                autoFocus
                {...register("address")}
              />
            </div>

            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                className="text-black bg-white w-[150px] p-4 rounded cursor-pointer transition-all font-bold "
                type="submit"
              >
                Cadastre-se
              </button>
              <Link to="/authenticate">
                <button className="text-white bg-black w-[150px] p-4 rounded cursor-pointer transition-all font-bold">
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
