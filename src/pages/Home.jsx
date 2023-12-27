// Home.jsx
import React from "react";
import CustomCard from "../components/MyCard";
import Navbar from "../components/Navbars";

import Header from "../components/Header";
import { useEffect, useState } from "react";

function Home() {


  return (
    <>
            
            
      <Header />
      <Navbar />
      <main className="flex flex-wrap  justify-center">
        <CustomCard />
      </main>
     
    </>
  );
}

export default Home;