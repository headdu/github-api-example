import React from "react";
import "./App.css";
import Header from "./Header";
import SearchResults from "./SearchResults";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <SearchResults />
    </>
  );
};

export default App;
