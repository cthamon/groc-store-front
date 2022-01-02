import { useQuery, useMutation, UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';

import axios from './axios';

export function fetchProducts() {
    return useQuery('products', () =>
        axios.get(`/api/product`)
    );
}

export function useLogin(): UseMutationResult<AxiosResponse<any>, any, { email: string; password: string; }, unknown> {
    return useMutation('useLogin', ({ email, password }) =>
        axios.post(`/api/user/login`, { email, password }), {
        onSuccess: ({ data }) => {
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('accessToken', data.accessToken);
        },
    });
}

export function useRegister() {
    return useMutation('useRegister', (formData: any) =>
        axios.post(`/api/user/register`, formData), {
        onSuccess: ({ data }) => {
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('accessToken', data.accessToken);
        },
        onError: (error: any) => {
            console.log({ message: error.response.data });
        }
    });
}

export function useProfile() {
    return useMutation('useProfile', (formData: any) =>
        axios.patch(`/api/user/update`, formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } }), {
        onError: (error: any) => {
            console.log({ message: error.response.data });
        }
    });
}

export function useAddProduct() {
    return useMutation('useAddProduct', (formData: any) =>
        axios.post(`/api/product/create`, formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } }), {
        onError: (error: any) => {
            console.log({ message: error.response.data });
        }
    });
}

export function useProductEdit(id: any) {
    return useMutation('useProductEdit', (formData: any) =>
        axios.patch(`/api/product/${id}`, formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } }), {
        onError: (error: any) => {
            console.log({ message: error.response.data });
        }
    });
}