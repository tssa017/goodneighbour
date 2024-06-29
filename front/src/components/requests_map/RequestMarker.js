import React, { useState } from 'react';
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef,
    Pin,
} from '@vis.gl/react-google-maps';
import OverlayWindow from './OverlayWindow';

const RequestMarker = ({ request, currUser }) => {
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [showOverlay, setShowOverlay] = useState(false);

    const handleProposeClick = () => {
        setShowOverlay(true);
        setInfowindowOpen(false);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    if (request.hidden) {
        return null;
    }

    const getPinStyles = () => {
        const isNewOrReopened =
            request.status === 'new' || request.status === 'reopened';
        const isCurrentUser = request.user_id === currUser.id;
        return {
            background:
                request.request_type === 'material' ? '#22ccff' : '#ff0000',
            borderColor: isNewOrReopened ? '#ffffff' : '#1e89a1',
            glyphColor: isCurrentUser ? '#a020f0' : '#ffffff',
        };
    };

    const pinStyles = getPinStyles();

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={{ lat: request.latitude, lng: request.longitude }}
                title={request.title}
            >
                <Pin
                    background={pinStyles.background}
                    borderColor={pinStyles.borderColor}
                    glyphColor={pinStyles.glyphColor}
                />
            </AdvancedMarker>
            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfowindowOpen(false)}
                >
                    <div className="info-window">
                        <h2 className="p-2 text-xl font-black">
                            {request.title}
                        </h2>
                        <p className="text-md">{request.description}</p>
                        <p className="text-md pt-2 pb-2">
                            <strong>Proposal count:</strong>{' '}
                            {request.proposals_count}
                        </p>
                        <p className="text-md pb-2">
                            <strong>Status:</strong> {request.status}
                        </p>
                        {request.user_id === currUser.id ? (
                            <p className="font-black p-2 italic">
                                💡 You can't answer your own request.
                            </p>
                        ) : (
                            <button
                                className="font-black text-lg p-2"
                                onClick={handleProposeClick}
                            >
                                Volunteer 💪
                            </button>
                        )}
                    </div>
                </InfoWindow>
            )}
            {showOverlay && (
                <OverlayWindow
                    request={request}
                    currUser={currUser}
                    onClose={handleCloseOverlay}
                />
            )}
        </>
    );
};

export default RequestMarker;
