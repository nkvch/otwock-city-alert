import { Icon } from 'leaflet';
import { Marker, MarkerProps } from 'react-leaflet';

type CustomPopupProps = MarkerProps & {
  id?: string;
}

const userIcon = new Icon({
  iconUrl: '/user-location.svg',
  iconSize: [50, 50],
});

function UserMarker({ id, ...rest }: CustomPopupProps) {
  return (
    <Marker {...rest} icon={userIcon} />
  );
}

export default UserMarker;
