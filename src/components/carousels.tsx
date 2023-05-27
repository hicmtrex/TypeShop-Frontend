import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const Carousels = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className='carsouel__item'>
        <img
          loading='lazy'
          className='d-block w-full '
          src='https://cdn.shopify.com/s/files/1/2301/4381/files/MSI_BANNER_1080x.jpg?v=1641895460'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item className='carsouel__item'>
        <img
          loading='lazy'
          className='d-block w-full '
          src='/images/p2.jpg'
          alt='Second slide'
        />
      </Carousel.Item>
      <Carousel.Item className='carsouel__item'>
        <img
          loading='lazy'
          className='d-block w-full '
          src='https://www.sammobile.com/wp-content/uploads/2020/01/galaxy-s20-wallpaper-note-10.jpg'
          alt='Third slide'
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
