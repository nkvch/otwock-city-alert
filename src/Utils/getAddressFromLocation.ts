import { LatLng } from 'leaflet';
import { LocationData } from '../Components/Map/types';

export function getAddressFromLatLng(latLng: LatLng): Promise<LocationData> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLng.lat}&lon=${latLng.lng}`;

  return fetch(url).then(response => response.json())
}
