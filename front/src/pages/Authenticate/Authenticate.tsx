import { Login } from "./Login";
import { Register } from "./Register";
import cover from "../../assets/greekCuisineCover.jpg";

export function Authenticate({ login = false }) {
  return (
    <div className="flex h-full w-full bg-[#131313]">
      <div className="justify-center items-center overflow-y-hidden">
        <img src={cover} alt="" />\
      </div>

      <div className="flex justify-start absolute  w-full transition-all">
        {login ? <Login /> : <Register />}
      </div>
    </div>
  );
}
