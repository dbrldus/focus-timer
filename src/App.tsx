import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Data from "./Pages/Data";
import Home from "./Pages/Home";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0px;
  }
`;
function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/data" element={<Data />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
