import { createContext, useState } from "react";

export const PinsContext = createContext();

export function PinsProvider({ children }) {
  const [pins, setPins] = useState(null);

  return (
    <PinsContext.Provider value={{ pins }}>{children}</PinsContext.Provider>
  );
}
