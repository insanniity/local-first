import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

const AuthLayout = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Redirect href={'/home'} />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
