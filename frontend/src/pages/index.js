import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import
import { Spinner, Center } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user, loading } = useAuth();
    const navigate = useNavigate(); // ✅ useNavigate instead of useRouter

    useEffect(() => {
        if (!loading) {
            if (user) {
                navigate('/dashboard', { replace: true }); // ✅ navigate instead of router.replace
            } else {
                navigate('/login', { replace: true });
            }
        }
    }, [loading, user, navigate]);

    return (
        <Center h="100vh">
            <Spinner size="xl" />
        </Center>
    );
}
