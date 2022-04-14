import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

const data = [
  {
   image: require('./../assets/images/1.jpg'), 
   caption:"Caption",
   description:"Description Here"
  },
  {
    image:require('./../assets/images/2.jpg'), 
    caption:"Caption",
    description:"Description Here"
   },
   {
    image:require('./../assets/images/3.jpg'), 
    caption:"Caption",
    description:"Description Here"
   } 
]

function CarouselSlider() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='carouselSlider'>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} pause={false}>
            {data.map((slide, i) => {
                return (
                    <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={slide.image}
                            alt="slider image"
                            />
                            <Carousel.Caption>
                                <h3>{slide.caption}</h3>
                                <p>{slide.description}</p>
                            </Carousel.Caption>
                    </Carousel.Item>
                );
            })}
        
            </Carousel>
        </div>
  );
}

export default CarouselSlider;