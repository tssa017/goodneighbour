import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MessagesChannel from '../components/messages/MessagesChannel';

jest.mock('axios');

describe('MessagesChannel Component', () => {
    const currChat = { id: 1 };
    const currUser = { id: 1 };

    it('renders a message when messages are fetched', async () => {
        const mockMessages = [
            {
                id: 1,
                user_id: 1,
                content: 'Hello',
                created_at: '2024-06-30T12:00:00Z',
            },
            {
                id: 2,
                user_id: 2,
                content: 'Hi there',
                created_at: '2024-06-30T12:05:00Z',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: { messages: mockMessages } });

        render(
            <MessagesChannel
                currChat={currChat}
                currUser={currUser}
                refreshMessages={true}
            />
        );

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        await waitFor(() => {
            expect(screen.getByText('Hello')).toBeInTheDocument();
            expect(screen.getByText('Hi there')).toBeInTheDocument();
        });
    });

    it('renders "No messages here 👀" when no messages are present', async () => {
        axios.get.mockResolvedValueOnce({ data: { messages: [] } });

        render(
            <MessagesChannel
                currChat={currChat}
                currUser={currUser}
                refreshMessages={true}
            />
        );

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        await waitFor(() => {
            expect(screen.getByText('No messages here 👀')).toBeInTheDocument();
        });
    });

    it('renders messages in sorted order by created_at', async () => {
        const mockMessages = [
            {
                id: 2,
                user_id: 2,
                content: 'Hi there',
                created_at: '2024-06-30T12:05:00Z',
            },
            {
                id: 1,
                user_id: 1,
                content: 'Hello',
                created_at: '2024-06-30T12:00:00Z',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: { messages: mockMessages } });

        render(
            <MessagesChannel
                currChat={currChat}
                currUser={currUser}
                refreshMessages={true}
            />
        );

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        await waitFor(() => {
            const messages = screen.getAllByRole('listitem');
            expect(messages[0]).toHaveTextContent('Hello');
            expect(messages[1]).toHaveTextContent('Hi there');
        });
    });

    it('applies correct classes to messages based on the sender', async () => {
        const mockMessages = [
            {
                id: 1,
                user_id: 1,
                content: 'Hello',
                created_at: '2024-06-30T12:00:00Z',
            },
            {
                id: 2,
                user_id: 2,
                content: 'Hi there',
                created_at: '2024-06-30T12:05:00Z',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: { messages: mockMessages } });

        render(
            <MessagesChannel
                currChat={currChat}
                currUser={currUser}
                refreshMessages={true}
            />
        );

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        await waitFor(() => {
            const userMessage = screen.getByText('Hello');
            const otherMessage = screen.getByText('Hi there');

            expect(userMessage).toHaveClass('bg-blue-500 text-white');
            expect(otherMessage).toHaveClass('bg-pink-400 text-gray-800');
        });
    });
});
