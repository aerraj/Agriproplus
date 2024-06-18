import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';

const Features = () => {
  return (
    <Box py={12} px={4} bg="gray.50">
      <Flex direction="column" maxW="800px" mx="auto" alignItems="center">
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          For Farmers
        </Heading>
        <VStack spacing={8} align="start" width="100%">
          <FeatureItem
            title="Connect with the Latest Advances"
            description="Stay up-to-date with the latest agricultural technology by connecting with farmers from all over India."
            imageSrc="/advances.jpeg"
            imageAlt="Connect with the Latest Advances"
          />
          <FeatureItem
            title="Crop Suggestions Based on Location"
            description="Get suggestions for crops to grow based on your specific field and family information with GPS location integration."
            imageSrc="/feature2.jpeg"
            imageAlt="Crop Suggestions Based on Location"
          />
          <FeatureItem
            title="Stay Informed of Government Schemes"
            description="Get access to information on available schemes and programs from the central and state governments."
            imageSrc="/feature3.jpeg"
            imageAlt="Stay Informed of Government Schemes"
          />
          <FeatureItem
            title="Learn Hybrid Farming Methods"
            description="Educate yourself on various hybrid farming methods and technology."
            imageSrc="/feature4.jpeg"
            imageAlt="Learn Hybrid Farming Methods"
          />
          <FeatureItem
            title="Communicate with Farmers and Experts"
            description="Use our chat system to communicate with other farmers and experts in the field."
            imageSrc="/feature5.jpeg"
            imageAlt="Communicate with Farmers and Experts"
          />
        </VStack>
      </Flex>
    </Box>
  );
};

const FeatureItem = ({ title, description, imageSrc, imageAlt }) => (
  <Flex align="start" width="100%">
    <Image src={imageSrc} alt={imageAlt} boxSize="150px" objectFit="cover" mr={4} />
    <VStack align="start" spacing={4}>
      <Heading as="h3" size="lg">
        {title}
      </Heading>
      <Text fontSize="lg" color="gray.600">
        {description}
      </Text>
    </VStack>
  </Flex>
);

FeatureItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default Features;
