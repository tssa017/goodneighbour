import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestMarker from '../components/requests_map/RequestMarker';
import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import OverlayWindow from '../components/requests_map/OverlayWindow';

jest.mock('@vis.gl/react-google-maps', () => ({
    AdvancedMarker: jest.fn(({ children }) => <div>{children}</div>),
    InfoWindow: jest.fn(({ children }) => <div>{children}</div>),
    Pin: jest.fn(({ background, borderColor, glyphColor }) => (
        <div
            data-testid="pin"
            style={{ background, borderColor, color: glyphColor }}
        />
    )),
    useAdvancedMarkerRef: jest.fn(() => [jest.fn(), {}]),
}));

jest.mock('../components/requests_map/OverlayWindow', () =>
    jest.fn(() => <div>OverlayWindow</div>)
);

describe('RequestMarker Component', () => {
    const currUser = { id: 1 };
    const request = {
        id: 1,
        user_id: 2,
        title: 'Test Request',
        description: 'Test Description',
        latitude: 40.7128,
        longitude: -74.006,
        request_type: 'material',
        status: 'new',
        proposals_count: 3,
        hidden: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the marker with correct pin styles', () => {
        render(<RequestMarker request={request} currUser={currUser} />);

        const pin = screen.getByTestId('pin');
        expect(pin).toHaveStyle({ background: '#22ccff' });
        expect(pin).toHaveStyle({ borderColor: '#ffffff' });
        expect(pin).toHaveStyle({ color: '#ffffff' });
    });

    it('opens the InfoWindow when the marker is clicked', () => {
        render(<RequestMarker request={request} currUser={currUser} />);

        const marker = screen.getByTestId('pin');
        fireEvent.click(marker);

        expect(screen.getByText('Test Request')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Proposal count: 3')).toBeInTheDocument();
        expect(screen.getByText('Status: new')).toBeInTheDocument();
    });

    it('displays the "Volunteer" button and opens OverlayWindow when clicked', () => {
        render(<RequestMarker request={request} currUser={currUser} />);

        const marker = screen.getByTestId('pin');
        fireEvent.click(marker);

        const volunteerButton = screen.getByText('Volunteer 💪');
        fireEvent.click(volunteerButton);

        expect(screen.getByText('OverlayWindow')).toBeInTheDocument();
    });

    it('does not render if the request is hidden', () => {
        const hiddenRequest = { ...request, hidden: true };

        render(<RequestMarker request={hiddenRequest} currUser={currUser} />);

        expect(screen.queryByTestId('pin')).toBeNull();
    });

    it('displays a message if the current user is the request owner', () => {
        const ownedRequest = { ...request, user_id: currUser.id };

        render(<RequestMarker request={ownedRequest} currUser={currUser} />);

        const marker = screen.getByTestId('pin');
        fireEvent.click(marker);

        expect(
            screen.getByText("💡 You can't answer your own request.")
        ).toBeInTheDocument();
        expect(screen.queryByText('Volunteer 💪')).toBeNull();
    });
});
