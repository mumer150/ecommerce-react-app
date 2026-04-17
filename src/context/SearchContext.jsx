import { createContext, useState } from "react";

export const Searchcontexts = createContext();

export const SearchContext = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Searchcontexts.Provider value={{ search, setSearch }}>
        {children}
      </Searchcontexts.Provider>
    </>
  );
};
