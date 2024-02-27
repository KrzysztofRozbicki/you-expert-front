import { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselController = (props) => {
  const {
    children,
    prevArrow,
    nextArrow,
    autoplay,
    slidesToScroll,
    slidesToShow,
    autoplaySpeed,
    speed,
    dots,
    infinite
  } = props;

  return (
    <div style={{ width: '100%' }}>
      <Slider
        dots={dots}
        infinite={infinite}
        slidesToShow={slidesToShow || 4}
        slidesToScroll={slidesToScroll || 1}
        autoplay={autoplay}
        speed={speed || 500}
        autoplaySpeed={autoplaySpeed || 2000}
        prevArrow={prevArrow}
        nextArrow={nextArrow}
        adaptiveHeight={true}
      >
        {children}
      </Slider>
    </div>
  );
};

export default memo(CarouselController);
