import React from 'react';
import { FaCircleArrowRight, FaCircleArrowLeft } from 'react-icons/fa6';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slider-button-right`}
      style={{ ...style, display: 'block', right: '-25px' }}
      onClick={onClick}
    >
      <FaCircleArrowRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slider-button-left`}
      style={{ ...style, display: 'block', left: '-25px' }}
      onClick={onClick}
    >
      <FaCircleArrowLeft />
    </div>
  );
};

export { NextArrow, PrevArrow };
