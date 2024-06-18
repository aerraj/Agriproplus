import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  HStack,
  useToast,
  Text
} from '@chakra-ui/react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const toast = useToast();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    toast({
      title: "We heard from you",
      description: "Your message has been sent.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-left"
    });
    try {
      const res = await axios.post(
        'https://agriproplus-server.vercel.app/api/message/send',
        { name, email, subject, message },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      res.data;
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  };

  return (
    <Box p={8}>
      <Box mb={8} position="relative" textAlign="center">
      <img src="/form.jpeg" alt="Form" style={{ width: '100%', borderRadius: 'lg', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
      <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          fontSize="5xl"
          fontWeight="bold"
          textShadow="1px 1px 2px black"
        >
         We are available for you 24 X 7
        </Text>
      </Box>
      <Box p={8} boxShadow="2xl" borderRadius="lg" bg="white">
        <form onSubmit={handleSendMessage}>
          <VStack spacing={6}>
            <Heading size="lg">Write to Us</Heading>
            <HStack spacing={4} width="100%">
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl id="subject" isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                rows={6}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full">
              Send
            </Button>
          </VStack>
        </form>
      </Box>
      <Box mt={8} textAlign="center"/>
    </Box>
  );
};

export default Contact;





