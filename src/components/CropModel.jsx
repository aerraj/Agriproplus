// CropModel.js
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Flex, useToast } from '@chakra-ui/react';

const CropModel = () => {
    const [conditions, setConditions] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        pH: '',
        rainfall: ''
    });

    const [recommendedCrop, setRecommendedCrop] = useState('');
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConditions({ ...conditions, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        for (const key in conditions) {
            if (conditions[key] === '' || isNaN(conditions[key])) {
                toast({
                    title: "Invalid input",
                    description: "Please enter valid numbers for all fields.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', conditions);
            setRecommendedCrop(response.data.recommended_crop);
            toast({
                title: "Success",
                description: "Recommended crop received successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Clear form
            setConditions({
                N: '',
                P: '',
                K: '',
                temperature: '',
                humidity: '',
                pH: '',
                rainfall: ''
            });
        } catch (error) {
            console.error('There was an error making the request:', error);
            toast({
                title: "Error",
                description: "There was an error making the request.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={20}>
            <Box p={4} borderRadius="md" boxShadow="md">
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <Flex wrap="wrap" justify="space-between">
                        <FormControl id="N" width="30%">
                            <FormLabel>Nitrogen (N)</FormLabel>
                            <Input type="number" name="N" value={conditions.N} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="P" width="30%">
                            <FormLabel>Phosphorus (P)</FormLabel>
                            <Input type="number" name="P" value={conditions.P} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="K" width="30%">
                            <FormLabel>Potassium (K)</FormLabel>
                            <Input type="number" name="K" value={conditions.K} onChange={handleChange} />
                        </FormControl>
                    </Flex>
                    <Flex wrap="wrap" justify="space-between">
                        <FormControl id="temperature" width="30%">
                            <FormLabel>Temperature</FormLabel>
                            <Input type="number" name="temperature" value={conditions.temperature} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="humidity" width="30%">
                            <FormLabel>Humidity</FormLabel>
                            <Input type="number" name="humidity" value={conditions.humidity} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="pH" width="30%">
                            <FormLabel>pH</FormLabel>
                            <Input type="number" name="pH" value={conditions.pH} onChange={handleChange} />
                        </FormControl>
                    </Flex>
                    <Flex wrap="wrap" justify="space-between">
                        <FormControl id="rainfall" width="30%">
                            <FormLabel>Rainfall</FormLabel>
                            <Input type="number" name="rainfall" value={conditions.rainfall} onChange={handleChange} />
                        </FormControl>
                    </Flex>
                    <Button type="submit" colorScheme="teal">Get Recommended Crop</Button>
                </VStack>
            </form>
            </Box>
            {recommendedCrop && (
                <Box mt={4} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
                <Text fontSize="xl" fontWeight="bold">Recommended Crop for your field:</Text>
                <Text fontSize="2xl" mt={2} color="teal.500">{recommendedCrop}</Text>
               </Box>
            )}

        </Box>
    );
};

export default CropModel;

