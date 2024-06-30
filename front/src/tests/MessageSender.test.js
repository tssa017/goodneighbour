import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MessageSender from './../components/messages/MessageSender';

jest.mock('axios');

describe('MessageSender Component', () => {
    const currChat = { id: 1 };
    const currUser = { id: 1 };

    it('renders the form correctly', () => {
        render(
            <MessageSender
                currChat={currChat}
                currUser={currUser}
                setRefreshMessages={() => {}}
            />
        );

        expect(
            screen.getByPlaceholderText('Type your message here...')
        ).toBeInTheDocument();
        expect(screen.getByText('Send message ✨')).toBeInTheDocument();
    });

    it('allows the user to type a message', () => {
        render(
            <MessageSender
                currChat={currChat}
                currUser={currUser}
                setRefreshMessages={() => {}}
            />
        );

        const textarea = screen.getByPlaceholderText(
            'Type your message here...'
        );
        fireEvent.change(textarea, { target: { value: 'Hello, world!' } });
        expect(textarea.value).toBe('Hello, world!');
    });

    it('submits the message when the form is submitted', async () => {
        axios.post.mockResolvedValueOnce({});

        const setRefreshMessages = jest.fn();

        render(
            <MessageSender
                currChat={currChat}
                currUser={currUser}
                setRefreshMessages={setRefreshMessages}
            />
        );

        const textarea = screen.getByPlaceholderText(
            'Type your message here...'
        );
        const submitButton = screen.getByText('Send message ✨');

        fireEvent.change(textarea, { target: { value: 'Hello, world!' } });
        fireEvent.click(submitButton);

        expect(submitButton).toHaveTextContent('Sending...');
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/messages',
            {
                message: {
                    chat_id: currChat.id,
                    user_id: currUser.id,
                    content: 'Hello, world!',
                },
            }
        );

        // Wait for the state update
        await screen.findByText('Send message ✨');
        expect(setRefreshMessages).toHaveBeenCalledWith(true);
        expect(textarea.value).toBe('');
    });

    it('displays an error message if the message fails to send', async () => {
        axios.post.mockRejectedValueOnce(new Error('Error sending message'));

        render(
            <MessageSender
                currChat={currChat}
                currUser={currUser}
                setRefreshMessages={() => {}}
            />
        );

        const textarea = screen.getByPlaceholderText(
            'Type your message here...'
        );
        const submitButton = screen.getByText('Send message ✨');

        fireEvent.change(textarea, { target: { value: 'Hello, world!' } });
        fireEvent.click(submitButton);

        expect(submitButton).toHaveTextContent('Sending...');

        // Wait for the state update
        await screen.findByText('Send message ✨');
        expect(submitButton).toHaveTextContent('Send message ✨');
    });
});
