import { Box } from "@chakra-ui/react";
import L, { Icon } from "leaflet";
import { useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import { useUserStore } from "@/entities/user";
import CurrentLocation from "@/shared/assets/CurrentLocation.svg";
import NavigateDefault from "@/shared/assets/NavigateDefault.svg?react";
import cls from "./LocationMarker.module.css";
export const LocationMarker = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const userLocation = useUserStore((state) => state.setCurrentCoords);

  const map = useMap();
  const icon = new Icon({
    iconUrl: CurrentLocation,
    iconSize: [70, 70],
  });
  const location = () => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      userLocation({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
      map.flyTo(e.latlng, map.getZoom());
      // const radius = e.accuracy;
      // const circle = L.circle(e.latlng, 1000, { opacity: 0.1 });
      // circle.addTo(map);
    });
  };

  return (
    <Box>
      <NavigateDefault
        className={cls.locationMarker}
        // style={{ position: "absolute", zIndex: 1000 }}
        onClick={() => location()}
      />
      {position && <Marker icon={icon} position={position} />}
    </Box>
  );
};
