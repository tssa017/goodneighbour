import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Signup from '../components/user/Signup';

describe('Signup Component', () => {
    it('submits the form with valid data', async () => {
        const mockSetCurrUser = jest.fn();
        const mockSetShow = jest.fn();

        render(<Signup setCurrUser={mockSetCurrUser} setShow={mockSetShow} />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText('First name'), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByLabelText('Last name'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password' },
        });
        fireEvent.change(screen.getByLabelText('Confirm Password'), {
            target: { value: 'password' },
        });

        // Submit the form
        fireEvent.submit(screen.getByRole('button', { name: 'Submit ✨' }));

        // Wait for the form submission
        await screen.findByText('Once you have signed up');

        // Assertions
        expect(mockSetCurrUser).toHaveBeenCalled();
        expect(mockSetShow).not.toHaveBeenCalled();
    });

    it('displays error message on password mismatch', async () => {
        render(<Signup />);

        // Fill out the form with mismatched passwords
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password' },
        });
        fireEvent.change(screen.getByLabelText('Confirm Password'), {
            target: { value: 'password123' }, // Different password
        });

        // Submit the form
        fireEvent.submit(screen.getByRole('button', { name: 'Submit ✨' }));

        // Wait for the error message
        await screen.findByText('Passwords do not match');

        // Assertions
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    it('redirects to login on link click', () => {
        const mockSetShow = jest.fn();

        render(<Signup setShow={mockSetShow} />);

        // Click on the login link
        fireEvent.click(screen.getByText('Login here'));

        // Assertions
        expect(mockSetShow).toHaveBeenCalledWith(true);
    });
});
