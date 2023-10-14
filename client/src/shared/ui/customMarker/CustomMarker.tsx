import { Marker } from "react-leaflet";
type CustomMarkerProps = {
  position: [number, number];
  icon: any;
};
const CustomMarker = (props: CustomMarkerProps) => {
  const { icon, position } = props;
  return <Marker position={position} icon={icon}></Marker>;
};
