import { ReactNode } from 'react';
import { MapContainer, MapContainerProps } from 'react-leaflet';

type MapRootProps = MapContainerProps & {
  children: ReactNode;
};

function MapRoot({ children, ...rest }: MapRootProps) {
  return <MapContainer
    style={{
      position: 'fixed',
      inset: '0',
    }}
    {...rest}
  >{children}</MapContainer>;
}

export default MapRoot;
