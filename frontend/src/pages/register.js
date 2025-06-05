import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import
import {
    Box,
    Button,
    Input,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    VStack,
    Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate(); // ✅ useNavigate instead of useRouter

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
            <Heading mb={6} textAlign="center">
                Register
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    {error && (
                        <Text color="red.500" fontSize="sm" align="center">
                            {error}
                        </Text>
                    )}

                    <Button type="submit" colorScheme="blue" width="full">
                        Register
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}
