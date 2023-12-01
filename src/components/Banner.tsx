import { Promotion } from "../features/types";
import React, { FC } from "react";

type BannerProps = {
  promotion: Promotion;
  srcImage: string;
};

const Banner: FC<BannerProps> = ({ srcImage, promotion }) => {
  return (
    <div>
      <div className="overlay-container">
        <img
          src={srcImage}
          alt="restaurant"
          className="relative w-full min-h-[180px] overflow-hidden aspect-video object-cover block rounded-md"
        />
        <div className="overlay w-full rounded-md p-2 px-3 ">
          <p className="text-xl font-bold flex gap-2 flex-wrap"></p>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <h2 className="text-lg font-semibold mt-2 text-zinc-800">
          {promotion.promotion_name}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-zinc-800 font-medium">Type:</p>
        <p className="text-zinc-600">{promotion.promotion_type}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-zinc-800 font-medium">Start time:</p>
        <p className="text-zinc-600">{promotion.start_time}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-zinc-800 font-medium">End time:</p>
        <p className="text-zinc-600">{promotion.end_time}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-zinc-800 font-medium">Reduce percent:</p>
        <p className="text-zinc-600">{promotion.reduced_percent}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-zinc-800 font-medium">Reduce price:</p>
        <p className="text-zinc-600">{promotion.reduced_price}</p>
      </div>
    </div>
  );
};

export default Banner;
