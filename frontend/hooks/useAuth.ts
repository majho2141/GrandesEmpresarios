import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any | null;
}

export const useAuth = () => {
    const router = useRouter();
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true,
        user: null
    });

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setAuthState({ isAuthenticated: false, isLoading: false, user: null });
                return false;
            }

            // Verificar el token con el backend
            const response = await fetch('http://localhost:8080/auth/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setAuthState({
                    isAuthenticated: true,
                    isLoading: false,
                    user: userData
                });
                return true;
            } else {
                localStorage.removeItem('token');
                setAuthState({
                    isAuthenticated: false,
                    isLoading: false,
                    user: null
                });
                return false;
            }
        } catch (error) {
            console.error('Error validando autenticación:', error);
            setAuthState({
                isAuthenticated: false,
                isLoading: false,
                user: null
            });
            return false;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                await checkAuth();
                router.push('/dashboard');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null
        });
        router.push('/login');
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return {
        ...authState,
        login,
        logout,
        checkAuth
    };
};
