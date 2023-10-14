import L, { Bounds } from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { AllBanks } from "@/features/bank/ui/AllBanks";
import { LocationMarker } from "@/features/locationMarker";
import { RoutingMachine } from "@/features/mapRoute/addRoute";
import { useUserStore } from "@/entities/user";
import cls from "./Map.module.css";
export const LeafletMap = () => {
  const rMachine = useRef<L.Routing.Control>(null);
  const userCoords = useUserStore((state) => state.currentCoords);
  useEffect(() => {
    if (rMachine.current) {
      rMachine.current.setWaypoints([
        L.latLng(userCoords.latitude, userCoords.longitude),
        L.latLng(55.59, 37.39),
      ]);
    }
  }, [rMachine, userCoords.latitude, userCoords.longitude]);

  return (
    <MapContainer
      attributionControl={false}
      className={cls.map}
      center={[55.582026, 37.3855235]}
      zoom={13}
      zoomControl={false}
    >
      <TileLayer
        referrerPolicy={false}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine
        waypoints={
          (L.latLng(userCoords.latitude, userCoords.longitude),
          L.latLng(55.59, 37.39))
        }
        ref={rMachine}
      />
      <AllBanks />
      {/* <Search  provider={new OpenStreetMapProvider()} /> */}
      <LocationMarker />
    </MapContainer>
  );
};
