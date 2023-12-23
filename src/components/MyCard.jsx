import React from "react";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import temp from "../img/blog.png";

const CustomCard = ({ isHomePageLookLike = false, isBlogPage = false }) => {
  const cardClassName = isHomePageLookLike
    ? "max-w-sm flex-shrink-0"
    : "w-5/6 mx-auto my-10";

  return (
    <>
      <div key={"tempCategor.id"} className="card-container">
        {"tempCategor.name"}
        <Card
          className={cardClassName}
          imgAlt="{Meaningful alt text for an image that is not purely decorative}"
          imgSrc={temp}
        >
          <p className="text-left pl-4">avtori aq</p>
          <p className="date text-left pl-4 text-gray-500">
            {isHomePageLookLike
              ? "Publication Date: January 1, 2023"
              : `Publication Date: January 1, 2023 ${"gmail@@@com"}`}
          </p>
          <h4 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white text-left">
            eccom ის საბჭოს შეუერთდა ნინო ეგაძე
          </h4>
          <div className="flex justify-between pl-4 pr-4">
            <div className="element">მარკეტი</div>
            <div className="element">აპლიკაცია 2</div>
            <div className="element">ხელოვნური ინტელექტი 3</div>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {isHomePageLookLike
              ? "mokle agwera--mag Here are the biggest enterprise technology acquisitions of 2021 so"
              : ""}
          </p>
          {isHomePageLookLike && (
            <Link to="/full-description" className="button">
              სრულად ნახვა
            </Link>
          )}
        </Card>
        {isBlogPage && (
          <div className="w-10/12 mx-auto ">
            <span className="">
              "aq mtliani agwera --- ragaca Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Placeat eveniet mollitia temporibus
              vitae iure totam aliquam dolorem, tenetur illum quam sint nobis,
              soluta fugiat officiis? Atque omnis maiores reiciendis nihil!"
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomCard;
