import PropTypes from 'prop-types';
import { Link ,useNavigate} from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext'; // Adjust the path as per your project structure

const NavLink = ({ children, href }) => {
 
  return (
    <Box
      as={Link}
      to={href}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('green.200', 'green.700'),
      }}
    >
      {children}
    </Box>
  );
};

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      <Box bg={useColorModeValue('green.500', 'green.900')} w="100%" position={'fixed'} top={0} left={0} right={0} zIndex={1}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="1200px" mx="auto" px={4}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Text color="white" fontSize="lg" fontWeight="bold">
              <Link to="/">
                Agripro+
              </Link>
            </Text>
            {currentUser && (
              <>
                <NavLink href="/crops">Crops</NavLink>
                <NavLink href="/schemes">Schemes</NavLink>
                <NavLink href="/news">News</NavLink>
                <NavLink href="/library">Library</NavLink>
                <NavLink href="/support">Support</NavLink>
              </>
            )}
          </HStack>
          <Flex alignItems={'center'}>
            <HStack spacing={4}>
              {currentUser ? (
                <Button
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'green.700'}
                  _hover={{
                    bg: 'green.600',
                  }}
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    fontSize={'sm'}
                    fontWeight={400}
                    variant={'link'}
                    color={'white'}
                    style={{ textDecoration: 'none' }}
                  >
                    Log In
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'green.700'}
                    _hover={{
                      bg: 'green.600',
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

