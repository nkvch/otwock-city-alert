import { LatLng, LatLngBounds } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { CircleArea } from './types';
// import 'leaflet/dist/leaflet.css';


const getUsersInAreaMockResponse = {
  users: [
    {
      id: 1,
      lat: 52.1,
      lng: 21.33,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 2,
      lat: 52.1,
      lng: 21.3,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 3,
      lat: 52.1,
      lng: 21.31,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 4,
      lat: 52.1,
      lng: 21.32,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 5,
      lat: 52.1,
      lng: 21.34,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 6,
      lat: 52.12,
      lng: 21.3,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 7,
      lat: 52.11,
      lng: 21.3,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 8,
      lat: 52.23,
      lng: 21.3,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
    {
      id: 9,
      lat: 52.13,
      lng: 21.3,
      whenLastUpdate: '2021-05-01T12:00:00Z',
    },
  ],
};



function MapContent() {
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number | null>(null);

  const [selectedArea, setSelectedArea] = useState<CircleArea[]>([]);

  function handleMapClick(event: any) {
    if (!selectedPosition) {
      setSelectedPosition([event.latlng.lat, event.latlng.lng]);
      setSelectedRadius(0);
    } else if (selectedPosition && selectedRadius) {
      setSelectedArea([
        ...selectedArea,
        {
          center: selectedPosition,
          radius: selectedRadius,
        }
      ]);
      setSelectedPosition(null);
      setSelectedRadius(null);
    }
  }

  function handleMapMouseMove(event: any) {
    if (selectedPosition) {
      const radius = Math.sqrt(
        Math.pow(selectedPosition[0] - event.latlng.lat, 2) +
        Math.pow(selectedPosition[1] - event.latlng.lng, 2)
      );
      setSelectedRadius(radius);
    }
  }

  useMapEvents({
    click: handleMapClick,
    mousemove: handleMapMouseMove,
  });

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {
          getUsersInAreaMockResponse.users.map((user) => (
            <Marker position={
              new LatLng(user.lat, user.lng)
            }>
              <Popup>
                {user.id}
              </Popup>
            </Marker>
          ))
        }
      </MarkerClusterGroup>
      {/* <Marker position={
        otwockLocation
      }>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {selectedPosition && selectedRadius && (
        <Circle center={selectedPosition} radius={selectedRadius * 50000} />
      )}
      {selectedArea.map((area) => (
        <Circle color='red' center={area.center} radius={area.radius * 50000} />
      ))}
    </>
  )
}

export default MapContent;
