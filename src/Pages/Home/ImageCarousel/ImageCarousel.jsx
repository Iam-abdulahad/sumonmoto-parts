import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image1 from '../../../assets/Images/ImageCarousel/image1.jpg';
import Image2 from '../../../assets/Images/ImageCarousel/image2.jpg';
import Image3 from '../../../assets/Images/ImageCarousel/image3.jpg';


const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear'
  };

  const images = [
    { src: `${Image1}`, alt: 'Image 1', caption: 'High-Quality Parts' },
    { src: `${Image2}`, alt: 'Image 2', caption: 'Precision Engineering' },
    { src: `${Image3}`, alt: 'Image 3', caption: 'Reliable Performance' },
    // Add more images as needed
  ];

  return (
    <div className="w-full h-screen mx-auto py-10 relative">
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="relative text-center">
          <img src={image.src} alt={image.alt} className="w-full rounded-lg shadow-lg" />
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
            {image.caption}
          </div>
          <div className="absolute top-5 right-5 bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Feature {index + 1}</h3>
            <p className="mt-2">Detailed information about this feature. This can include benefits, usage, or any other relevant details.</p>
          </div>
          <div className="absolute bottom-5 right-5 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-md">
            <h4 className="text-md font-semibold">Additional Info</h4>
            <p className="mt-1">Some extra information about the image or product displayed.</p>
          </div>
        </div>
      ))}
    </Slider>
  </div>
  );
};

export default ImageCarousel;
