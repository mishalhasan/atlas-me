import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => {
    //Save to Local Storage & Update State
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const logout = () => {
    //Clear local storage & state
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Outlet />
      {/* {children} */}
    </AuthContext.Provider>
  );
}
