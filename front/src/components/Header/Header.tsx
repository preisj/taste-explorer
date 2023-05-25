import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  Wrench,
  UserCircle,
  House,
  ShoppingCart,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Cart } from "../Cart/Cart";

export function Header() {
  const { auth, logout } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <div className="fixed flex flex-col h-full bg-blue-500 shadow-md w-20 justify-between items-center z-10">
        <div className="mb-4">
          <div className="flex flex-col justify-center items-center">
            <Link to="/">
              <House
                  size={36}
                  className="my-2 text-white cursor-pointer hover:opacity-80 transition-all rounded-full h-8 w-8 mt-6"
              />
            </Link>

            {auth.isAdmin && (
                <Link to="/admin">
                  <Wrench
                      size={36}
                      className="my-2 text-white cursor-pointer hover:opacity-80 transition-all rounded-full h-8 w-8"
                  />
                </Link>
            )}

            <ShoppingCart
                className="my-2 text-white cursor-pointer hover:opacity-80 transition-all rounded-full h-8 w-8"
                onClick={onOpen}
            />

            {auth.isAuthenticated && (
                <Menu>
                  <MenuButton>
                    <UserCircle
                        size={36}
                        className="my-2 text-white cursor-pointer hover:opacity-80 transition-all rounded-full h-8 w-8"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
            )}

            {!auth.isAuthenticated && (
                <Link to="/authenticate">
                  <UserCircle
                      size={36}
                      className="my-2 text-white cursor-pointer hover:opacity-80 transition-all rounded-full h-8 w-8"
                  />
                </Link>
            )}

            {auth.isAuthenticated && (
                <Cart onClose={onClose} isOpen={isOpen}/>
            )}
          </div>
        </div>
      </div>
  );
}
