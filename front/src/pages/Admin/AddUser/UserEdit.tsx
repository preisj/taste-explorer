import { useForm } from "react-hook-form";
import {
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPerson, getPerson } from "../../../api/person/person.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";
import { useEffect } from "react";

const editUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().nonempty(),
  password: z.string().min(5),
  role: z.string().min(3),
  phone: z.string().min(11).max(11),
  address: z.string().min(3),
});

export function UserEdit() {
  const { handleSubmit, register, setValue } = useForm({
    shouldUseNativeValidation: true,
    resolver: zodResolver(editUserSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();

  async function onEdit(values: any) {
    try {
      await editPerson({
        ...values,
        id: params.id,
      });

      toast({
        description: "User successfully edited.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast({
          description: "User edit error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  useEffect(() => {
    getPerson(params.id as any).then((res) => {
      setValue("firstName", res.firstName);
      setValue("lastName", res.lastName);
      setValue("phone", res.phone);
      setValue("email", res.email);
      setValue("address", res.address);
      setValue("role", res.role);
      setValue("password", res.password);
    });
  }, [params, setValue]);

  return (
    <HeaderTemplate>
      <div className="h-full flex flex-col items-center ">
        <div className="flex justify-between w-[70%]">
          <form onSubmit={handleSubmit(onEdit)} className="w-full">
            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>First name *</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("firstName")}
                />
              </div>

              <div className="mt-3">
                <label>Last name *</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("lastName")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Phone *</label>
                <input
                  type="text"
                  placeholder="Phone"
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
                <label>Address *</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("address")}
                />
              </div>

              <div className="mt-3">
                <label>Role *</label>
                <select
                    className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                    {...register("role")}
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Password *</label>
                <input
                  type="text"
                  placeholder="Password"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("password")}
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
