import { useState } from "react";
import { Carousel } from "react-bootstrap";
import ImageLazy from "./UI/lazy-image";

const Carousels = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="carsouel__item">
        <ImageLazy
          className="lazy-carousel"
          style={{ width: "1600px" }}
          imageUrl="https://cdn.shopify.com/s/files/1/2301/4381/files/MSI_BANNER_1080x.jpg?v=1641895460"
        />
      </Carousel.Item>
      <Carousel.Item className="carsouel__item">
        <ImageLazy
          className="lazy-carousel"
          style={{ width: "1600px" }}
          imageUrl="/images/p2.jpg"
        />
      </Carousel.Item>
      <Carousel.Item className="carsouel__item">
        <ImageLazy
          style={{ width: "1600px" }}
          className="lazy-carousel"
          imageUrl="https://www.sammobile.com/wp-content/uploads/2020/01/galaxy-s20-wallpaper-note-10.jpg"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
