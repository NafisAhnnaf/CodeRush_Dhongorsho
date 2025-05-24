import React from 'react';
import Slider from 'react-slick';
import Card from './Card';

function ProductCarousel({ products }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(products.length, 4),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(products.length, 3),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(products.length, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </Slider>
  );
}

export default ProductCarousel;
