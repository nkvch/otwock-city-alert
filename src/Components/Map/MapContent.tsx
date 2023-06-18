import { LatLng, LatLngLiteral } from 'leaflet';
import { useCallback, useEffect, useState } from 'react';
import { Circle, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import CustomPopupMarker from './components/CustomPopupMarker';
import { createUserCluserIcon } from './components/UserClusterIcon';
import UserMarker from './components/UserMarker';
import { Area, CircleArea, LocationData } from './types';
import { useQuery } from '@tanstack/react-query';
import { getUsersLocations } from '../../Queries/getUsersLocations';
import AlertLocationMarker from './components/AlertLocationMarker';

export interface MapContentProps {
  usersToDisplay?: LatLngLiteral[];
  onSelectNewArea: (area: Area) => void;
  onSelectNewLocation: (location: LocationData) => void;
  areasToDisplay?: Area[];
  locationsToDisplay?: LocationData[];
}

function MapContent(props: MapContentProps) {
  const { usersToDisplay, onSelectNewArea, onSelectNewLocation, areasToDisplay, locationsToDisplay } = props;

  const [selectedPosition, setSelectedPosition] = useState<LatLngLiteral | null>(null);

  const [centerOfSelection, setCenterOfSelection] = useState<LocationData | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number | null>(null);

  const [TODO_REMOVE_usersQueue, setTODO_REMOVE_usersQueue] = useState<any[]>([]);

  // const {
  //   data: TODO_REMOVE_usersData,
  // } = useQuery(['users'], getUsersLocations);

  // TODO_REMOVE
  // useEffect(() => {
  //   if (TODO_REMOVE_usersQueue.length === 0 && TODO_REMOVE_usersData) {
  //     setTODO_REMOVE_usersQueue(TODO_REMOVE_usersData);
  //   }
  // }, [TODO_REMOVE_usersData, TODO_REMOVE_usersQueue]);

  // console.log('TODO_REMOVE_usersData', TODO_REMOVE_usersData);

  function handleMapClick(event: any) {
    if (!selectedPosition) {
      setSelectedPosition({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    } else if (selectedPosition && selectedRadius && centerOfSelection) {
      onSelectNewArea({
        type: 'circle',
        area: {
          center: centerOfSelection,
          radius: selectedRadius,
        }
      });
      setSelectedPosition(null);
      setSelectedRadius(null);
      setCenterOfSelection(null);
    }
  }

  // function TODO_REMOVE_handleMapClick(event: any) {
  //   const newQueue = [...TODO_REMOVE_usersQueue];
  //   const user = newQueue.pop();

  //   const body = {
  //     x: event.latlng.lat,
  //     y: event.latlng.lng,
  //     radius: 1,
  //   }

  //   fetch(`http://localhost:3000/app/${user.id}/updateLocation`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   }).then((resp) => {
  //     console.log('resp', resp);
  //     setTODO_REMOVE_usersQueue(newQueue);
  //   }
  //   );
  // }

  function handleMapMouseMove(event: any) {
    if (centerOfSelection) {
      const point1 = new LatLng(Number(centerOfSelection.lat), Number(centerOfSelection.lon));
      const point2 = new LatLng(event.latlng.lat, event.latlng.lng);
      const radius = point1.distanceTo(point2);
      setSelectedRadius(radius);
    }
  }

  const onPushToSelectedLocation = useCallback((location: LocationData) => {
    setSelectedPosition(null);
    onSelectNewLocation(location);
  }, [onSelectNewLocation]);

  useMapEvents({
    // click: TODO_REMOVE_handleMapClick,
    click: handleMapClick,
    mousemove: handleMapMouseMove,
  });

  const renderArea = useCallback((area: Area) => {
    switch (area.type) {
      case 'circle':
        const circleArea = area.area as CircleArea;
        return (
          <Circle
            center={{
              lat: Number(circleArea.center.lat),
              lng: Number(circleArea.center.lon),
            }}
            radius={circleArea.radius}
          />
        );
      default:
        return null;
    }
  }, []);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. Icon by <a href="https://freeicons.io/profile/3335">MD Badsha Meah</a> and <a href="https://freeicons.io/profile/722">Fasil</a> on <a href="https://freeicons.io">freeicons.io</a>'
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
          <AlertLocationMarker location={location} />
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
        areasToDisplay?.map(renderArea)
      }
      {
        centerOfSelection && selectedRadius && (
          <Circle
            color='gray'
            center={{
              lat: Number(centerOfSelection.lat),
              lng: Number(centerOfSelection.lon),
            }}
            radius={selectedRadius}
          />
        )
      }
    </>
  )
}

export default MapContent;
