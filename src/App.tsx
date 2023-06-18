import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import './App.css'
import Map from './Components/Map/Map';
import { LatLng } from 'leaflet';
import { AlertInterface, Area, CircleArea, LocationData } from './Components/Map/types';
import PLusButton from './Components/plusButton';
import Searcher from './Components/Searcher/Searcher';
import LeftMenu from './Components/leftMenu';
import { areCircleAreasDifferent } from './Utils/areCircleAreasDifferent';
import { useQuery } from '@tanstack/react-query';
import { getUsersLocations } from './Queries/getUsersLocations';

const MapHolder = styled.div`
  width: 700px;
  height: 400px;
  border: 4px solid black;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

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

const TopBar = styled.div`
  position: fixed;
  top: 20px;
  left: 220px;
  z-index: 1000;
`;

const OtwockLocation = new LatLng(52.1, 21.3);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    data: usersData,
    isLoading: isUsersLoading,
  } = useQuery(['users'], getUsersLocations);

  console.log(usersData);

  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [locationsToDisplay, setLocationsToDisplay] = useState<LocationData[]>([]);

  const onSelectNewArea = (area: Area) => setSelectedAreas([...selectedAreas, area]);
  const onSelectNewLocation = (location: LocationData) => setLocationsToDisplay([...locationsToDisplay, location]);

  const deleteArea = useCallback((area: Area) => {
    const newAreas = selectedAreas.filter((ar) => areCircleAreasDifferent(ar.area, area.area));
    setSelectedAreas(newAreas);
  }, [selectedAreas]);

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
        {
          isMenuOpen ? null : <PLusButton onClick={() => setIsMenuOpen(true)} />
        }
        <Searcher
          onSelectLocation={onSelectNewLocation}
        />
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
  )
}

export default App
