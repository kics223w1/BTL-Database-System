// @ts-ignore
import banner1 from "../../assets/banners/banner1.png";
// @ts-ignore
import banner2 from "../../assets/banners/banner2.png";
// @ts-ignore
import banner3 from "../../assets/banners/banner3.png";
// @ts-ignore
import banner4 from "../../assets/banners/banner4.png";
// @ts-ignore
import banner5 from "../../assets/banners/banner5.png";
// @ts-ignore
import banner6 from "../../assets/banners/banner6.png";
import Banner from "./Banner";
import { FC } from "react";
import React from "react";
import { Promotion } from "../features/types";

const srcImages = [banner1, banner2, banner3, banner4, banner5, banner6];

type BannerListProps = {
  promotions: Promotion[];
};

const BannerList: FC<BannerListProps> = ({ promotions }) => {
  return (
    <div className="flex flex-col gap-4 container-max mt-10">
      <h1 className="font-bold text-2xl text-zinc-700">Best offers for you</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {promotions.map((promotion, index) => {
          const srcImage = srcImages[index % srcImages.length];
          return (
            <Banner srcImage={srcImage} key={index} promotion={promotion} />
          );
        })}
      </div>
    </div>
  );
};
export default BannerList;
