// import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <Box
      as="footer"
      bg="white"
      color="black"
      py={4}
      textAlign="center"
      borderTop="1px solid #e2e8f0"  // light gray border on top
      bottom={0}
      left={0}
      right={0}
      zIndex={10}
      width="100%"
      position={'fixed'}
    >
      <Text fontSize="sm">
        Built with ❤️ for 100+ million farmers across India <span><Link to="/">&copy; 2024 Agripro+</Link></span>
      </Text>

    </Box>
  )
}

export default Footer
