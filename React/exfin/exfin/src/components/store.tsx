import { createContext, useState } from "react"
import type { ReactNode } from "react"

// Define the context type
interface StoreContextType {
  values: number;
  addValue: (item: number) => void;
}

export const storeContext = createContext<StoreContextType | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

function StoreProvider({ children }: StoreProviderProps) {
  const [values, setValues] = useState(0)

  const addValue = (item: number): void => {
    setValues((prev) => prev + item);
  }
  
  const contextValue: StoreContextType = {
    values, 
    addValue
  }

  return (
    <storeContext.Provider value={contextValue}>
      {children}
    </storeContext.Provider>
  )
}

export default StoreProvider