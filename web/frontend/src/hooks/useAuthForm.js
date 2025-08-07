import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const useAuthForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        password: '',
        password_confirmation: '',
        user_type: 'client',
        address: '' // Adicionado para resolver o warning
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (credentials) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.login(credentials);
            if (response?.token) {
                navigate('/dashboard');
                return true;
            }
        } catch (error) {
            setError(error.message || 'Erro ao fazer login');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.register(formData);
            if (response?.token) {
                navigate('/dashboard');
                return true;
            }
        } catch (error) {
            setError(error.message || 'Erro ao registrar');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        formData, 
        handleChange, 
        handleLogin,
        handleRegister,
        error, 
        isLoading 
    };
};