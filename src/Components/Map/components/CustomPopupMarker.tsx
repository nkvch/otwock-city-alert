import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Marker, MarkerProps, Popup } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { getAddressFromLatLng } from '../../../Queries/getAddressFromLocation';
import { LocationData } from '../types';
import styled from '@emotion/styled';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

type CustomPopupProps = MarkerProps & {
  defaultOpen?: boolean;
  onPushToSelectedLocation: (location: LocationData) => void;
  onSelectArea: (center: LocationData) => void;
};

const PopupButton = styled(Button)`
  /* padding: 1rem; */
  margin: 0.2rem;
  height: 80px;
  width: 80px;
  color: #fff;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .MuiButton-startIcon {
    margin-right: 0;
    .MuiSvgIcon-root {
      font-size: 30px;
    }
  }
`;

const AddLocationButton = styled(PopupButton)`
  background-color: #f08e1f;
  &:hover {
    background-color: #f0af66;
  }
`;

const SelectAreaButton = styled(PopupButton)`
  background-color: #2792eb;
  &:hover {
    background-color: #62abe7;
  }
`;

function CustomPopupMarker({
  defaultOpen = false,
  children,
  onPushToSelectedLocation,
  onSelectArea,
  ...rest
}: CustomPopupProps) {
  const popupRef = useRef(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    if (defaultOpen && popupRef.current) {
      popupRef.current?.openPopup();

      const location = popupRef.current?.getLatLng();

      getAddressFromLatLng(location).then(setLocationData);
    }
  }, [defaultOpen]);

  const onAddPointClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      onPushToSelectedLocation(locationData!);
    },
    [locationData, onPushToSelectedLocation]
  );

  const onSelectAreaClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      onSelectArea(locationData!);
    },
    [locationData, onSelectArea]
  );

  return (
    <Marker ref={popupRef} {...rest}>
      <Popup>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            flexGrow: 1,
            marginBottom: '1rem',
          }}
        >
          {locationData?.display_name ?? 'Ładowanie...'}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          sx={{
            padding: '0.2rem',
          }}
        >
          <AddLocationButton
            startIcon={<AddLocationIcon />}
            onClick={onAddPointClick}
          >
            Punkt
          </AddLocationButton>
          <SelectAreaButton
            startIcon={<ShareLocationIcon />}
            onClick={onSelectAreaClick}
          >
            Obszar
          </SelectAreaButton>
        </Box>
      </Popup>
    </Marker>
  );
}

export default CustomPopupMarker;
