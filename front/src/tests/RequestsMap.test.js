import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import RequestMap from '../components/requests_map/RequestMap';
import RequestMarker from '../components/requests_map/RequestMarker';
import MarkerLegend from '../components/requests_map/MarkerLegend';
import { Map, APIProvider } from '@vis.gl/react-google-maps';
import useGeoLocation from '../components/geolocation/Geolocation';

jest.mock('axios');
jest.mock('../components/RequestMarker', () =>
    jest.fn(() => <div>RequestMarker</div>)
);
jest.mock('../components/MarkerLegend', () =>
    jest.fn(() => <div>MarkerLegend</div>)
);
jest.mock('@vis.gl/react-google-maps', () => ({
    Map: jest.fn(({ children }) => <div>{children}</div>),
    APIProvider: jest.fn(({ children }) => <div>{children}</div>),
}));
jest.mock('../geolocation/Geolocation', () => jest.fn());

describe('RequestMap Component', () => {
    const currUser = { id: 1 };

    beforeEach(() => {
        useGeoLocation.mockReturnValue({ lat: 40.7128, lon: -74.006 });
        jest.clearAllMocks();
    });

    it('renders the map and markers', async () => {
        axios.get.mockResolvedValue({
            data: [
                { id: 1, status: 'new', hidden: false },
                { id: 2, status: 'closed', hidden: false },
                { id: 3, status: 'new', hidden: true },
            ],
        });

        render(<RequestMap currUser={currUser} />);

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        expect(screen.getByText('RequestMarker')).toBeInTheDocument();
        expect(screen.getByText('MarkerLegend')).toBeInTheDocument();
        expect(
            screen.getByText('Unfulfilled requests count: 1')
        ).toBeInTheDocument();
    });

    it('does not render the map if currUser is not provided', () => {
        render(<RequestMap currUser={null} />);

        expect(screen.queryByText('RequestMarker')).toBeNull();
        expect(screen.queryByText('MarkerLegend')).toBeNull();
    });

    it('fetches requests at regular intervals', async () => {
        jest.useFakeTimers();

        axios.get.mockResolvedValue({
            data: [{ id: 1, status: 'new', hidden: false }],
        });

        render(<RequestMap currUser={currUser} />);

        expect(axios.get).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(5000);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

        jest.advanceTimersByTime(5000);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));

        jest.useRealTimers();
    });
});
