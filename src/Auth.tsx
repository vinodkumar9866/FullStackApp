import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface IAuthContextType {
  user: string;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState("");

  // Load user from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Check expiration time (10 minutes)
      const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds
      if (
        userData &&
        userData.timestamp &&
        Date.now() - userData.timestamp < expirationTime
      ) {
        setUser(userData.username);
      } else {
        // Clear expired user data from local storage
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (username: string) => {
    const userData = {
      username,
      timestamp: Date.now(),
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
