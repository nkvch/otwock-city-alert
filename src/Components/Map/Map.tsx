import { MapContainerProps } from "react-leaflet";
import MapContent, { MapContentProps } from "./MapContent";
import MapRoot from "./MapRoot";

export interface MapProps extends MapContainerProps {
  content: MapContentProps;
}

function Map(props: MapProps) {
  const {
    content,
    ...rootProps
  } = props;

  return <MapRoot {...rootProps}>
    <MapContent
      {...content}
    />
  </MapRoot>;
}

export default Map;
