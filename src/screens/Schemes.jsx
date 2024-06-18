import { useState, useEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import SchemeCard from '../components/SchemeCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('https://agriproplus-server.vercel.app/api/schemes/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSchemes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schemes:', error);
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const getCircularImageKey = (index) => {
    return `feature${(index % 7) + 1}`; // Adjusted for 7 images
  };

  return (
    <>
      <Navbar />
      <Flex direction="column" align="center">
        <h1>Schemes List</h1>
        <Flex wrap="wrap" justify="center" gap={4}>
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} scheme={scheme} randomImage={getCircularImageKey(index)} />
          ))}
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default Schemes;


