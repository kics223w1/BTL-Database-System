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
import { useKeenSlider } from "keen-slider/react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import React from "react";

const srcImages = [banner1, banner2, banner3, banner4, banner5, banner6];

const BannerList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(min-width: 480px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
  });

  return (
    <div className="container-max ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-zinc-700">
          Best offers for you
        </h1>

        {instanceRef.current && (
          <div className="flex gap-2 items-center">
            <button
              disabled={currentSlide === 0}
              onClick={() => instanceRef.current?.prev()}
              className="bg-gray-100 p-2 rounded-full disabled:text-gray-300"
            >
              <ArrowLongLeftIcon className="w-4 h-4" />{" "}
            </button>
            <button
              disabled={
                currentSlide ===
                instanceRef?.current?.track?.details?.slides?.length - 1
              }
              onClick={() => instanceRef.current?.next()}
              className="bg-gray-100 p-2 rounded-full disabled:text-gray-300"
            >
              <ArrowLongRightIcon className="w-4 h-4" />{" "}
            </button>
          </div>
        )}
      </div>

      <div ref={sliderRef} className="keen-slider">
        {srcImages.map((src, index) => {
          return <Banner srcImage={src} key={index} />;
        })}
      </div>
    </div>
  );
};
export default BannerList;
