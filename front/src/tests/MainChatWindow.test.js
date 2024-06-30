import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MainChatWindow from '../components/messages/MainChatWindow';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

describe('MainChatWindow Component', () => {
    const currUser = { id: 1, first_name: 'Test', last_name: 'User' };

    const mockLocationState = {
        state: {
            activeChat: { id: 1 },
            request: { title: 'Test Request', user_id: 2 },
        },
    };

    beforeEach(() => {
        useLocation.mockReturnValue(mockLocationState);
        axios.get.mockClear();
    });

    it('renders welcome message and buttons', () => {
        render(<MainChatWindow currUser={currUser} />);

        expect(
            screen.getByText('Welcome to the secure message portal 💬')
        ).toBeInTheDocument();
        expect(screen.getByText('My aid missions 💪')).toBeInTheDocument();
        expect(screen.getByText('My aid requests 🤞')).toBeInTheDocument();
    });

    it('fetches and displays chats on initial render', async () => {
        const mockChats = {
            answerer: [
                {
                    request: { title: 'Aid Mission 1' },
                    requester: { id: 2, first_name: 'John', last_name: 'Doe' },
                },
            ],
            requester: [
                {
                    request: { title: 'Aid Request 1' },
                    answerer: { id: 3, first_name: 'Jane', last_name: 'Doe' },
                },
            ],
        };

        axios.get.mockResolvedValueOnce({ data: mockChats });

        render(<MainChatWindow currUser={currUser} />);

        await waitFor(() =>
            expect(axios.get).toHaveBeenCalledWith(
                `http://localhost:3000/chats?user_id=${currUser.id}`
            )
        );

        fireEvent.click(screen.getByText('My aid missions 💪'));

        await waitFor(() => {
            expect(screen.getByText('Aid Mission 1')).toBeInTheDocument();
        });
    });

    it('displays user list when a request is selected', async () => {
        const mockChats = {
            answerer: [
                {
                    request: { title: 'Aid Mission 1' },
                    requester: { id: 2, first_name: 'John', last_name: 'Doe' },
                },
            ],
            requester: [],
        };

        axios.get.mockResolvedValueOnce({ data: mockChats });

        render(<MainChatWindow currUser={currUser} />);

        fireEvent.click(screen.getByText('My aid missions 💪'));

        await waitFor(() => {
            fireEvent.click(screen.getByText('Aid Mission 1'));
        });

        expect(screen.getByText('Select volunteer')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('fetches and displays chat messages when a user is selected', async () => {
        const mockChats = {
            answerer: [
                {
                    request: { title: 'Aid Mission 1' },
                    requester: { id: 2, first_name: 'John', last_name: 'Doe' },
                },
            ],
            requester: [],
        };

        const mockChatResponse = {
            chat: [
                {
                    id: 1,
                    requester: { id: 2, first_name: 'John', last_name: 'Doe' },
                },
            ],
        };

        axios.get.mockResolvedValueOnce({ data: mockChats });
        axios.get.mockResolvedValueOnce({ data: mockChatResponse });

        render(<MainChatWindow currUser={currUser} />);

        fireEvent.click(screen.getByText('My aid missions 💪'));

        await waitFor(() => {
            fireEvent.click(screen.getByText('Aid Mission 1'));
        });

        fireEvent.click(screen.getByText('John Doe'));

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                `http://localhost:3000/chats/chat?user_id=${currUser.id}&receiver_id=2&request_id=undefined`
            );
        });

        expect(
            screen.getByText('Hey Test, get in touch with John here ⬇️')
        ).toBeInTheDocument();
        expect(screen.getByText('Send message ✨')).toBeInTheDocument();
    });
});
