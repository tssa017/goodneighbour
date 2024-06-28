import React, { useState } from 'react';
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef,
    Pin,
} from '@vis.gl/react-google-maps';

const RequestMarker = ({ request }) => {
    const [infowindowOpen, setInfowindowOpen] = useState(true);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={{ lat: request.latitude, lng: request.longitude }}
                title={request.title}
            >
                {request.request_type === 'material' ? (
                    <Pin
                        background={'#22ccff'}
                        borderColor={'#1e89a1'}
                        glyphColor={'#0f677a'}
                    />
                ) : null}
            </AdvancedMarker>
            {infowindowOpen && marker && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={250}
                    onCloseClick={() => setInfowindowOpen(false)}
                >
                    <div className="p-1">
                        <h2 className="text-lg font-semibold mb-2">
                            {request.title}
                        </h2>
                        <p className="text-sm text-gray-700 mb-2">
                            {request.description}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">
                                Type of request:
                            </span>{' '}
                            {request.request_type.toUpperCase()}
                        </p>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};

export default RequestMarker;
