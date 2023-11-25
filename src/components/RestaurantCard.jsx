import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ restaurant }) => {
  const { info } = restaurant;

  return (
    <>
      <div className="overlay-container">
        <img
          src={CDN_URL + info.cloudinaryImageId}
          alt="restaurant"
          className="relative w-full min-h-[180px] overflow-hidden aspect-video object-cover block rounded-md"
        />
        <div className="overlay w-full rounded-md p-2 px-3 ">
          <p className="text-xl font-bold flex gap-2 flex-wrap">
            {info?.aggregatedDiscountInfoV3?.header
              ? info.aggregatedDiscountInfoV3.header
              : ""}{" "}
            {info?.aggregatedDiscountInfoV3?.subHeader
              ? info.aggregatedDiscountInfoV3.subHeader
              : ""}
          </p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-2 text-zinc-800">{info.name}</h2>

      <p className="text-zinc-600">{info.locality}</p>
    </>
  );
};

export default RestaurantCard;
