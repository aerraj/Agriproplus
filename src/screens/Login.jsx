import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../firebase/firebase'; // Adjust the path as per your project structure
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import auth functions
import { Link ,useNavigate} from 'react-router-dom';

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate(); // Initialize useHistory hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login successful.',
        description: 'You have successfully logged in!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redirect to "/" after successful login
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box p={5}/>
      <Box maxW="md"  mx="auto" ml={550} mt={8} p={10}>
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Log In
        </Heading>
        <Box p={5} />
        <Box     boxShadow="2xl"   border="2px"
      borderColor="black.200"
      borderRadius="md" // Optional: Set border radius
      p={8}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" width="full" mt={6} onClick={handleLogin}>
          Log In
        </Button>
        <Text mt={4} textAlign="center">
          Don&apos;t have an account?<Text textDecor={'underline'}> <Link to="/signup">Sign Up</Link></Text>
        </Text>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
