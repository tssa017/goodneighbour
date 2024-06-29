// RequestMarker.js
import React, { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from '@vis.gl/react-google-maps';
import OverlayWindow from './OverlayWindow';

const RequestMarker = ({ request, currUser }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleProposeClick = () => {
    setShowOverlay(true);
    setInfowindowOpen(false); // Optionally close the InfoWindow when opening the overlay
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  if (request.hidden) {
    return null;
  }

  const getPinStyles = () => {
    const isNewOrReopened = request.status === 'new' || request.status === 'reopened';
    const isCurrentUser = request.user_id === currUser.id;
    return {
      background: request.request_type === 'material' ? '#22ccff' : '#ff0000',
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
          <div>
            <strong>{request.title}</strong>
            <p>{request.description}</p>
            <p>
              Proposal counts {request.proposals_count}, {request.status}
            </p>
            {request.user_id === currUser.id ? (
              <div>You can't answer your own request</div>
            ) : (
              <button onClick={handleProposeClick}>Propose yourself?</button>
            )}
          </div>
        </InfoWindow>
      )}
      {showOverlay && (
        <OverlayWindow request={request} currUser={currUser} onClose={handleCloseOverlay} />
      )}
    </>
  );
};

export default RequestMarker;
