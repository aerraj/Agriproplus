import PropTypes from 'prop-types';
import { Box, Text, Stack, Badge, Image, Button, Link } from '@chakra-ui/react';

// Define your images with corresponding keys
const images = {
  feature1: '/farmer2.jpeg',
  feature2: '/feature2.jpeg',
  feature3: '/feature3.jpeg',
  feature4: '/farmer3.jpeg',
  feature5: '/feature5.jpeg',
  feature6: '/advances.jpeg',
  feature7: '/farmer4.jpeg',
};

const SchemeCard = ({ scheme, randomImage }) => {
  return (
    <Box
      bg="teal.50"
      boxShadow="0px 8px 20px rgba(0, 128, 128, 0.2)" // Increased depth and peach green light color
      borderRadius="lg"
      p={4}
      m={{ base: '10%', md: '5%' }}
      width={{ base: '90%', md: '80%', lg: '70%' }}
      maxWidth="xl"
      mx="auto"
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {scheme.title}
      </Text>
      <Text fontSize="md" color="gray.600" mb={4}>
        {scheme.description}
      </Text>
      <Stack direction="row" spacing={4} align="center" mb={4}>
        <Badge colorScheme="blue" variant="solid" fontSize="sm">
          {scheme.ministry}
        </Badge>
      </Stack>
      <Stack direction="row" spacing={4} align="center" mb={4}>
      <Link href="https://www.myscheme.gov.in/search/category/Agriculture,Rural%20&%20Environment" isExternal>
        <Button colorScheme="teal" variant="solid">
          Apply
        </Button>
      </Link>
      </Stack>
      <Image src={images[randomImage]} alt="Scheme Image" borderRadius="md" mb={4} />
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Text fontSize="sm" color="gray.800">
          Tags: {scheme.tags.join(', ')}
        </Text>
      </Stack>
        
    </Box>
  );
};

SchemeCard.propTypes = {
  scheme: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ministry: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  randomImage: PropTypes.string.isRequired,
};

export default SchemeCard;


