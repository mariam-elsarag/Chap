import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token"));
  const [user, setUser] = useState({
    fullName: Cookies.get("full_name"),
    avatar: Cookies.get("avatar"),
  });
  const login = (data) => {
    setToken(data.token);
    setUser({
      fullName: data?.user?.full_name,
      avatar: data?.user?.avatar,
    });
    Cookies.set("token", data?.token);
    Cookies.set("full_name", data?.user?.full_name);
    Cookies.set("avatar", data?.user?.avatar);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
