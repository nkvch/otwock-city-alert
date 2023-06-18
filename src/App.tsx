import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Map from './Components/Map/Map';
import { LatLng } from 'leaflet';
import {
  AlertInterface,
  Area,
  CircleArea,
  LocationData,
} from './Components/Map/types';
import PLusButton from './Components/plusButton';
import Searcher from './Components/Searcher/Searcher';
import LeftMenu from './Components/leftMenu';
import { areCircleAreasDifferent } from './Utils/areCircleAreasDifferent';
import { useQuery } from '@tanstack/react-query';
import { getUsersLocations } from './Queries/getUsersLocations';

const TopBar = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  transition: all 0.3s ease-in-out;
  gap: 10px;
`;

const OtwockLocation = new LatLng(52.1, 21.3);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: usersData, isLoading: isUsersLoading } = useQuery(
    ['users'],
    getUsersLocations
  );

  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [locationsToDisplay, setLocationsToDisplay] = useState<LocationData[]>(
    []
  );

  const onSelectNewArea = useCallback(
    (area: Area) => {
      setIsMenuOpen(true);
      setSelectedAreas([...selectedAreas, area]);
    },
    [selectedAreas]
  );

  const onSelectNewLocation = useCallback(
    (location: LocationData) => {
      setIsMenuOpen(true);
      setLocationsToDisplay([...locationsToDisplay, location]);
    },
    [locationsToDisplay]
  );

  const deleteArea = useCallback(
    (area: Area) => {
      const newAreas = selectedAreas.filter((ar) =>
        areCircleAreasDifferent(ar.area, area.area)
      );
      setSelectedAreas(newAreas);
    },
    [selectedAreas]
  );

  return (
    <>
      <LeftMenu
        areasData={selectedAreas}
        onDeleteArea={deleteArea}
        locationsData={locationsToDisplay}
        setLocationsData={setLocationsToDisplay}
        open={isMenuOpen}
        setOpen={setIsMenuOpen}
        alert={{} as AlertInterface}
      />
      <TopBar>
        {isMenuOpen ? null : <PLusButton onClick={() => setIsMenuOpen(true)} />}
        <Searcher onSelectLocation={onSelectNewLocation} />
      </TopBar>
      <Map
        center={OtwockLocation}
        scrollWheelZoom={true}
        zoom={13}
        content={{
          onSelectNewArea,
          areasToDisplay: selectedAreas,
          usersToDisplay: usersData ?? [],
          locationsToDisplay,
          onSelectNewLocation,
        }}
      />
    </>
  );
}

export default App;
