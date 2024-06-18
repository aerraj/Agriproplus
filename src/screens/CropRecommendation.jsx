import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box } from '@chakra-ui/react';
import CropModel from '../components/CropModel';

export default function CropRecommendation() {
  return (
    <>
           <Navbar/>
           <Box p={5}/>
           <CropModel/>
           <img src="/Agriculture.jpeg" alt="Vegetables" style={{ width: '100%', height: 'auto', marginTop: '20px' }} />
           <Footer/>
    </>
  )
}