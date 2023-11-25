const Banner = ({ srcImage }) => {
  return (
    <div className="keen-slider__slide">
      <img className="block w-full" src={srcImage} alt="" />
    </div>
  );
};

export default Banner;
