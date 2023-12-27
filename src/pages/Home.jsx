// Home.jsx
import React from "react";
import CustomCard from "../components/MyCard";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-wrap  justify-center">
        <CustomCard />
      </main>
     
    </>
  );
}

export default Home;