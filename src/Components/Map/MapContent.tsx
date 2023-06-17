import { LatLngLiteral, point, divIcon } from 'leaflet';
import { useCallback, useState } from 'react';
import { Circle, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import CustomPopupMarker from './components/CustomPopupMarker';
import { CircleArea, CustomArea, LocationData, SquareArea } from './types';
import UserMarker from './components/UserMarker';
import { createUserCluserIcon } from './components/UserClusterIcon';
// import 'leaflet/dist/leaflet.css';

export interface MapContentProps {
  usersToDisplay?: LatLngLiteral[];
  onSelectNewArea: (area: CircleArea | SquareArea | CustomArea) => void;
  onSelectNewLocation: (location: LocationData) => void;
  areasToDisplay?: (CircleArea | SquareArea | CustomArea)[];
  locationsToDisplay?: LocationData[];
}

function MapContent(props: MapContentProps) {
  const { usersToDisplay, onSelectNewArea, onSelectNewLocation, areasToDisplay, locationsToDisplay } = props;

  const [selectedPosition, setSelectedPosition] = useState<LatLngLiteral | null>(null);

  const [centerOfSelection, setCenterOfSelection] = useState<LatLngLiteral | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number | null>(null);


  function handleMapClick(event: any) {
    if (!selectedPosition) {
      setSelectedPosition({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    } else if (selectedPosition && selectedRadius) {
      onSelectNewArea({
        center: selectedPosition,
        radius: selectedRadius,
      });
      setSelectedPosition(null);
      setSelectedRadius(null);
      setCenterOfSelection(null);
    }
  }

  function handleMapMouseMove(event: any) {
    if (centerOfSelection) {
      const radius = Math.sqrt(
        Math.pow(centerOfSelection.lat - event.latlng.lat, 2) +
        Math.pow(centerOfSelection.lng - event.latlng.lng, 2)
      );
      setSelectedRadius(radius);
    }
  }

  const onPushToSelectedLocation = useCallback((location: LocationData) => {
    setSelectedPosition(null);
    onSelectNewLocation(location);
  }, [onSelectNewLocation]);

  useMapEvents({
    click: handleMapClick,
    mousemove: handleMapMouseMove,
  });

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. Icon by <a href="https://freeicons.io/profile/3335">MD Badsha Meah</a> on <a href="https://freeicons.io">freeicons.io</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        iconCreateFunction={createUserCluserIcon}
      >
        {
          usersToDisplay?.map((user) => (
            <UserMarker position={user} />
          ))
        }
      </MarkerClusterGroup>
      {
        locationsToDisplay?.map((location) => (
          <Marker position={{
            lat: Number(location.lat),
            lng: Number(location.lon),
          }} />
        ))
      }
      {
        selectedPosition && (
          <CustomPopupMarker
            position={selectedPosition}
            onPushToSelectedLocation={onPushToSelectedLocation}
            onSelectArea={setCenterOfSelection}
            defaultOpen
          />
        )
      }
      {
        (areasToDisplay as CircleArea[])?.map((area) => (
          <Circle
            color='red'
            center={area.center}
            radius={area.radius * 50000}
          />
        ))
      }
      {
        centerOfSelection && selectedRadius && (
          <Circle
            center={centerOfSelection}
            radius={selectedRadius * 50000}
          />
        )
      }
    </>
  )
}

export default MapContent;
