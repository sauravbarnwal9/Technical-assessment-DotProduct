import { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Heading,
    FormControl,
    FormLabel,
    VStack,
    Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the page refresh
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            alert(err)
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
            <Heading mb={6} textAlign="center">
                Login
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
                        Login
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}
