// import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box } from '@chakra-ui/react';
import Contact from '../components/Contact';
import Address from '../components/Address';

export default function Support() {
  return (
    <>
    <Navbar/>
    <Box>
      <Contact/>
      <Address/>
    </Box>
    <Footer/>
    </>
  )
}
