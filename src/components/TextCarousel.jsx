import { useState, useEffect } from 'react';
import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const feedbacks = [
  {
    message: "Agripro's crop suggestions were spot on! It helped me maximize my yield.",
    name: "Rajesh Kumar",
    location: "Punjab, India"
  },
  {
    message: "I learned so much about hybrid farming methods from Agripro.",
    name: "Sunita Devi",
    location: "Bihar, India"
  },
  {
    message: "Agripro's support team is always responsive and helpful.",
    name: "Ramesh Singh",
    location: "Uttar Pradesh, India"
  },
  {
    message: "Government scheme information provided by Agripro saved me a lot of time and effort.",
    name: "Amit Patel",
    location: "Gujarat, India"
  },
];

const TextCarousel = () => {
  const [currentFeedback, setCurrentFeedback] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedback((currentFeedback + 1) % feedbacks.length);
    }, 5000); // Change every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [currentFeedback]);

  const nextFeedback = () => {
    setCurrentFeedback((currentFeedback + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    setCurrentFeedback((currentFeedback - 1 + feedbacks.length) % feedbacks.length);
  };

  return (
    <Box py={8} bg="gray.100" height="400px" borderRadius="lg" boxShadow="md" p={4}>
      <Flex alignItems="center" justifyContent="space-between" height="100%">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={prevFeedback}
          bg="transparent"
          _hover={{ bg: 'transparent' }}
        />
        <Box textAlign="center" maxW="80%">
          <Text fontSize="xl" fontWeight="bold" mb={4}>{feedbacks[currentFeedback].message}</Text>
          <Text fontSize="md" fontStyle="italic">{feedbacks[currentFeedback].name}, {feedbacks[currentFeedback].location}</Text>
        </Box>
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={nextFeedback}
          bg="transparent"
          _hover={{ bg: 'transparent' }}
        />
      </Flex>
    </Box>
  );
};

export default TextCarousel;
