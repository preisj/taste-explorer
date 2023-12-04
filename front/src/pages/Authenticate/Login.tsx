import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { validateLogin } from "../../api/person/person.service";
import { useAuth } from "../../context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}

export function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LoginData = {
      email,
      password,
    };

    try {
      const res = await validateLogin(data);
      login(res.token!, res.id!);

      if (res.id != null) {
        toast({
          description: `Welcome ` + res.name,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          description: `Invalid credentials`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex-col flex items-center w-full justify-center h-full mt-72">
        <strong className="text-4xl font-extrabold text-zinc-100">Login</strong>
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center justify-center mt-4 w-full">
              <input
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Email"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <input
                type="password"
                className="text-black border-solid border-[1px] border-[#eeeeee] p-3 rounded flex items-center placeholder:text-black placeholder:opacity-50 w-1/4"
                placeholder="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                className="text-black bg-white w-[100px] p-4 rounded cursor-pointer transition-all font-bold "
                type="submit"
              >
                Login
              </button>
              <Link to="/register">
                <button className="text-white bg-black w-[100px] p-4 rounded cursor-pointer transition-all font-bold ">
                  Sign up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
