import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from '@vis.gl/react-google-maps';

const RequestMarker = ({request }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

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
          {request.title}:
          {request.description}

        </InfoWindow>
      )}
    </>
  );
};

export default RequestMarker;
