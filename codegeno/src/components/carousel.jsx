import { useRef, useEffect } from 'react';
import '../css/carousel.css';

const Carousel = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const handleScroll = (event) => {
            const delta = Math.sign(event.deltaY);
            carouselRef.current.scrollLeft += delta * 50;
        };

        const carousel = carouselRef.current;
        carousel.addEventListener('wheel', handleScroll);

        return () => {
            carousel.removeEventListener('wheel', handleScroll);
        };
    }, []);

    return (
        <div className="carousel" ref={carouselRef}>
            <div className="picture"></div>
            <div className="picture"></div>
            <div className="picture"></div>
            {/* Add more pictures as needed */}
        </div>
    );
}

export default Carousel;
