import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Marker, MarkerProps, Popup } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { getAddressFromLatLng } from '../../../Utils/getAddressFromLocation';
import { LocationData } from '../types';

type CustomPopupProps = MarkerProps & {
  defaultOpen?: boolean;
  onPushToSelectedLocation: (location: LocationData) => void;
  onSelectArea: (center: LatLngLiteral) => void;
};

function CustomPopupMarker({ defaultOpen = false, children, onPushToSelectedLocation, onSelectArea, ...rest }: CustomPopupProps) {
  const popupRef = useRef(null);
  const [center, setCenter] = useState<LatLngLiteral | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    if (defaultOpen && popupRef.current) {
      popupRef.current?.openPopup();

      const location = popupRef.current?.getLatLng();

      setCenter(location);
      getAddressFromLatLng(location).then(setLocationData);
    }
  }, [defaultOpen]);

  const onAddPointClick = useCallback(() => {
    onPushToSelectedLocation(locationData!);
  }, [locationData, onPushToSelectedLocation]);

  const onSelectAreaClick = useCallback(() => {
    onSelectArea(center!);
  }, [center, onSelectArea]);

  return (
    <Marker ref={popupRef} {...rest}>
      <Popup>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ flexGrow: 1, marginBottom: "1rem" }}
        >
          {locationData?.display_name ?? "Ładowanie..."}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            padding: "0.2rem",
          }}
        >
          <Button
            id="points-selector"
            variant="contained"
            sx={{
              padding: "0.2rem 0.5rem",
              fontSize: "0.8rem",
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
            onClick={onAddPointClick}
          >
            Dodaj ten punkt
          </Button>
          <Button
            id="area-selector"
            variant="contained"
            onClick={onSelectAreaClick}
            sx={{
              padding: "0.2rem 0.5rem",
              fontSize: "0.8rem",
              backgroundColor: "#2196f3",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            Wybierz obszar
          </Button>
        </Box>
      </Popup>
    </Marker>
  );
}

export default CustomPopupMarker;
