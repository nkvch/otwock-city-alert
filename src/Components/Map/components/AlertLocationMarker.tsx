import L from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LocationData } from '../types';

interface AlertLocationMarkerProps {
  location: LocationData;
}

const AlertLocationMarker: React.FC<AlertLocationMarkerProps> = ({ location }) => {
  const icon = new L.Icon({
    iconUrl: '/location.svg',
    iconSize: [50, 50],
  });

  return (
    <Marker position={[Number(location.lat), Number(location.lon)]} icon={icon}>
      <Popup>
        {location.display_name}
      </Popup>
    </Marker>
  );
};

export default AlertLocationMarker;
