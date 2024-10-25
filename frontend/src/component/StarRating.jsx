import React from 'react';
import { HStack, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Icons for full, half, and empty stars

const StarRating = ( props) => {
  const stars = [];
    const rating = props.rating;
    const maxRating = 5; // Maximum rating is 5 stars
  
  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      stars.push(<Icon key={i} as={FaStar} color="yellow.400" />); // Full star
    } else if (i - 0.5 <= rating) {
      stars.push(<Icon key={i} as={FaStarHalfAlt} color="yellow.400" />); // Half star
    } else {
      stars.push(<Icon key={i} as={FaRegStar} color="gray.300" />); // Empty star
    }
  }

  return <HStack spacing={1}>{stars}</HStack>;
};

export default StarRating;
