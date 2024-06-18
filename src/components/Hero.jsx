
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <Box>
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        minH="70vh"
        px={8}
        mb={16}
      >
        <Box
          w={{ base: '80%', sm: '50%', md: '50%' }}
          mb={{ base: 12, md: 0 }}
        >
          <Image src="/farmer.jpeg" rounded="lg" shadow="2xl" />
        </Box>
        <Box
          w={{ base: '80%', sm: '60%', md: '50%' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Heading
            size="xl"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
          >
            Welcome to AgriPro+
          </Heading>
          <Text
            mt={5}
            fontSize="xl"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
Join us in celebrating the heart of agriculture: the hardworking farmers who bring food to our tables. Discover how our innovative solutions are tailored to support farming families, ensuring their happiness and success in every harvest. Together, let&apos;s cultivate a future where farming thrives and communities flourish
          </Text>
          <Button
            as={Link}
            to="/"
            colorScheme="green"
            size="lg"
            mt={8}
            px={10}
          >
            Get Started
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
