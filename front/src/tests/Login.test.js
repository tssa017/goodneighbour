import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Login from '../components/user/Login';

// Mock axios post request
jest.mock('axios');
const mockAxios = axios;

describe('Login Component', () => {
    it('submits the form with valid credentials', async () => {
        const mockSetCurrUser = jest.fn();

        // Mock successful login response
        mockAxios.post.mockResolvedValueOnce({
            data: { id: 1, email: 'john.doe@example.com' },
            headers: { Authorization: 'Bearer mockToken' },
        });

        render(<Login setCurrUser={mockSetCurrUser} />);

        // Fill out form
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password' },
        });

        // Submit
        fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

        // Wait for redirect
        await waitFor(() => {
            expect(mockSetCurrUser).toHaveBeenCalledWith({
                id: 1,
                email: 'john.doe@example.com',
            });
            expect(window.localStorage.getItem('token')).toBe(
                'Bearer mockToken'
            );
            expect(window.location.pathname).toBe('/home');
        });
    });

    it('displays error message on invalid credentials', async () => {
        const mockSetCurrUser = jest.fn();

        // Mock error response with status 401
        mockAxios.post.mockRejectedValueOnce({ response: { status: 401 } });

        render(<Login setCurrUser={mockSetCurrUser} />);

        // Fill out form with invalid credentials
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'invalid.user@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'invalidPassword' },
        });

        // Submit
        fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

        // Wait for error
        await screen.findByText('Invalid credentials. Try signing up first.');

        expect(mockSetCurrUser).not.toHaveBeenCalled();
        expect(window.localStorage.getItem('token')).toBeNull();
        expect(window.location.pathname).not.toBe('/home');
    });

    it('redirects to sign up on link click', () => {
        const mockSetShow = jest.fn();

        render(<Login setShow={mockSetShow} />);

        // Click on sign up button
        fireEvent.click(screen.getByText('Sign up here'));

        expect(mockSetShow).toHaveBeenCalledWith(false);
    });
});
