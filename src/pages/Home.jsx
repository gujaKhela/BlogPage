// Home.jsx
import React from "react";
import CustomCard from "../components/MyCard";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-wrap gap-20 justify-center">
        <CustomCard isHomePageLookLike={true} /> {/* Correct casing */}
        <CustomCard isHomePageLookLike={true} /> {/* Correct casing */}
        <CustomCard isHomePageLookLike={true} /> {/* Correct casing */}
        <CustomCard isHomePageLookLike={true} /> {/* Correct casing */}
        

      </main>
    </>
  );
}

export default Home;
