import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";
import { getPerson } from "../api/person/person.service";

export interface Auth {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  personId: string;
}

interface AuthContextProps {
  auth: Auth;
  login: (token: string, personId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  auth: { isAuthenticated: false, isLoading: true, isAdmin: false, personId: "" },
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [personId, setPersonId] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const personId = localStorage.getItem("personId");

      const person = await checkIfPersonExists(personId!);

      if (token && personId && person) {
        setPersonId(personId);
        setIsAdmin(person.role === "admin");
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setPersonId("");
        setLoading(false);
        navigate("/authenticate");
      }
    })();
  }, []);

  const login = async (token: string, personId: string) => {
    const person = await checkIfPersonExists(personId);

    if (token && personId && person) {
      localStorage.setItem("token", token);
      localStorage.setItem("personId", personId);
      setIsAuthenticated(true);
      setIsAdmin(person.role === "admin");
      setPersonId(personId);
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("personId");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setPersonId("");
    navigate("/authenticate");
  };

  const checkIfPersonExists = async (personId: string) => {
    const person = await getPerson(personId);
    if (person === null) {
      logout();
      return null;
    }

    return person;
  }

  const auth = { isAuthenticated, isLoading, isAdmin, personId };

  return (
      <AuthContext.Provider value={{ auth, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
