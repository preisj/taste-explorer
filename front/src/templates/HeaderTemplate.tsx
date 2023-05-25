import { PropsWithChildren } from "react";
import { Header } from "../components/Header/Header";

export function HeaderTemplate({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="user-flex-wrapper h-full ml-[5rem]">{children}</div>
      </div>
    </div>
  );
}
