// Home.jsx
import React from "react";
import CustomCard from "../components/MyCard";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Login from "../components/Login";

function Home() {


  return (
    <>
      <Header />
      <main className="flex flex-wrap gap-20 justify-center">
        <CustomCard  />
      </main>
      <Login />
    </>
  );
}

export default Home;
