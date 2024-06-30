import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from '../components/user/UserInfo';

describe('UserInfo Component', () => {
    const mockUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
    };

    it('renders user information correctly', () => {
        render(<UserInfo currUser={mockUser} />);

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('First name:')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Last name:')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('Email:')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(
            screen.getByText(/Since all profiles must be validated/)
        ).toBeInTheDocument();
        expect(screen.getByText('Contact us')).toHaveAttribute(
            'href',
            '/contact'
        );
    });

    it('updates user information when currUser changes', () => {
        const updatedUser = {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
        };

        render(<UserInfo currUser={mockUser} />);

        render(
            <Router>
                <UserInfo currUser={updatedUser} />
            </Router>
        );

        expect(screen.getByText('Jane')).toBeInTheDocument();
        expect(screen.getByText('Smith')).toBeInTheDocument();
        expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    });

    it('displays message when currUser is null', () => {
        render(<UserInfo currUser={null} />);

        expect(screen.queryByText('Profile')).toBeNull();
        expect(screen.queryByText('First name:')).toBeNull();
        expect(screen.queryByText('Last name:')).toBeNull();
        expect(screen.queryByText('Email:')).toBeNull();
        expect(
            screen.queryByText(/Since all profiles must be validated/)
        ).toBeNull();
        expect(screen.queryByText('Contact us')).toBeNull();
    });
});
