// src/tests/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
    it('renders Nav component', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        // Check that Nav component renders
        expect(screen.getByText(/GoodNeighbour/)).toBeInTheDocument();
    });

    it('navigates to Home page', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <App />
            </MemoryRouter>
        );

        // Check that Home page content renders
        expect(screen.getByText(/Track the aid requests!/)).toBeInTheDocument();
    });

    it('navigates to Signup page', () => {
        render(
            <MemoryRouter initialEntries={['/signup']}>
                <App />
            </MemoryRouter>
        );

        // Check that Signup page content renders
        expect(screen.getByText(/Create an account/)).toBeInTheDocument();
    });
});
