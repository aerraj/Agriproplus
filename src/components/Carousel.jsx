import  { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  return (
    <Box position="relative" overflow="hidden">
      <Flex width="100%" transform={`translateX(-${currentSlide * 100}%)`} transition="transform 0.5s ease">
        {images.map((image, index) => (
          <Box key={index} flexShrink={0} width="100%" maxW="100%" position="relative">
            <Image src={image} alt={`Slide ${index + 1}`} height="300px" objectFit="cover" />
          </Box>
        ))}
      </Flex>
      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon />}
        onClick={prevSlide}
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        bg="gray.200"
        _hover={{ bg: 'gray.300' }}
        zIndex={1}
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon />}
        onClick={nextSlide}
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        bg="gray.200"
        _hover={{ bg: 'gray.300' }}
        zIndex={1}
      />
    </Box>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
