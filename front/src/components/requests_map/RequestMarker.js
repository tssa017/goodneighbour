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
  if (request.hidden){
    return
  };
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: request.latitude, lng: request.longitude }}
        title={request.title}>
        {request.request_type === "material" ? (
          <Pin
            background={'#22ccff'}
            borderColor={'#1e89a1'}
            glyphColor={'#0f677a'}
          />
        ) : null}
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          <div>
            <strong>{request.title}</strong>
            <p>{request.description}</p>
            <p>Proposal counts {request.proposals_count}, {request.status}</p>
            {
              request.user_id === currUser.id ? (
                <div>You can't answer your own request</div>
              ):(
                <button onClick={handleProposeClick}>Propose yourself?</button>
              )
            }
          </div>
        </InfoWindow>
      )}
      {showOverlay && <OverlayWindow request={request} currUser={currUser} onClose={handleCloseOverlay} />}
    </>
  );
};

export default RequestMarker;
