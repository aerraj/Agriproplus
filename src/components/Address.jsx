import {
    Box,
    Flex,
    Heading,
    Icon,
    Link,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
  
  const Address = () => {
    return (
      <Box py={12}>
        <Heading as="h2" textAlign="center" mb={8}>Reach out to us</Heading>
        <Flex justifyContent="space-around" flexWrap="wrap">
          {/* Postal Address */}
          <VStack maxW="sm" m={4} p={6} bg="white" borderRadius="xl" boxShadow="xl" textAlign="center">
            <Icon as={FiMapPin} boxSize={12} color="teal.500" />
            <Text fontSize="xl" fontWeight="bold" mb={4}>Postal Address</Text>
            <Text fontWeight="bold">
              AgriProPlus Headquarters
              <br />
              Plot No. FA7, Zone P1,
              <br />
              GT Karnal Road, Delhi-110036
            </Text>
            <Link href="https://www.google.com/maps/dir//R48J%2B6V+National+Institute+of+Technology+Delhi,+National+Institute+of+Technology+Plot+No.+FA7,Zone,+P1,+GT+Karnal+Rd,+Delhi,+110036/@28.9025366,78.1580267,6z"
              target="_blank"
              mt={4}
              fontSize="sm"
              color="teal.500"
              textDecoration="underline"
            >
              Get Directions
            </Link>
          </VStack>
  
          {/* Call Us */}
          <VStack maxW="sm" m={4} p={6} bg="white" borderRadius="xl" boxShadow="xl" textAlign="center">
            <Icon as={FiPhone} boxSize={12} color="teal.500" />
            <Text fontSize="xl" fontWeight="bold" mb={4}>Call Us</Text>
            <Link href="tel:+91-011-33833867" className="btn btn-outline-primary" mt={2} fontWeight="bold" fontSize="sm">
              Reach out to us :+91-011-33833867  
            </Link>
            <Link href="tel:+91-011-2342345" className="btn btn-outline-primary" mt={2}  fontWeight="bold"fontSize="sm">
             Dial us at : +91-6321-2342345
            </Link>
          </VStack>
  
          {/* Email Us */}
          <VStack maxW="sm" m={4} p={6} bg="white" borderRadius="xl" boxShadow="xl" textAlign="center">
            <Icon as={FiMail} boxSize={12} color="teal.500" />
            <Text fontSize="xl" fontWeight="bold" mb={4}>Email Us</Text>
            <Link href="mailto:agripro@gmail.com" className="btn btn-outline-primary" mt={2} fontWeight="bold" fontSize="sm">
              You can write to us at:agripro@gmail.com
            </Link>
          </VStack>
        </Flex>
  
        {/* Google Maps Embed */}
        <Box mt={12} p={6} bg="white" borderRadius="xl" boxShadow="xl" textAlign="center">
          <Heading as="h2" size="lg" mb={6}>Find Us on Google Maps</Heading>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13983.721902328205!2d77.1294815896788!3d28.811145645414022!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1923ada2e3%3A0x1169930518add2fe!2sNational%20Institute%20of%20Technology%20Delhi!5e0!3m2!1sen!2sin!4v1676659578362!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>
    );
  };
  
  export default Address;
  
  
