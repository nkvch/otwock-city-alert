import { LatLng } from "leaflet";
import MapRoot from "./MapRoot";
import MapContent from "./MapContent";

const otwockLocation = new LatLng(52.1, 21.3);

function Map() {
  return <MapRoot center={otwockLocation} zoom={13}>
    <MapContent />
  </MapRoot>;
}

export default Map;
