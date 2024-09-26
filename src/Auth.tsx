import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IAuthData } from "./interfaces/user";

interface IAuthContextType {
  user: IAuthData | undefined;
  setUpLocalUser: (authData: IAuthData) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthData | undefined>();
  const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Load user from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      // Check expiration time
      if (
        userData &&
        userData.timestamp &&
        Date.now() - userData.timestamp < expirationTime
      ) {
        console.log(userData);
        setUser(userData);

        // Set a timeout for auto logout based on the remaining time
        const remainingTime =
          expirationTime - (Date.now() - userData.timestamp);
        const logoutTimeout = setTimeout(() => {
          logout(); // Automatically log out when time expires
        }, remainingTime);

        // Clear timeout if the component unmounts or user logs out
        return () => clearTimeout(logoutTimeout);
      } else {
        // Clear expired user data from local storage
        localStorage.removeItem("user");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUpLocalUser = (authData: IAuthData) => {
    console.log("callss...........");
    const userData: IAuthData = {
      ...authData,
      timestamp: Date.now(),
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // Set auto logout timer after setting the user
    const logoutTimeout = setTimeout(() => {
      logout();
    }, expirationTime);

    // Clear timeout if the component unmounts or user logs out
    return () => clearTimeout(logoutTimeout);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, setUpLocalUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
