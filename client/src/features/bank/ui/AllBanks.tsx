import L, { Icon, MarkerCluster, divIcon } from "leaflet";
import { useEffect } from "react";
import { Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useGetAllBanks } from "@/entities/bank";
import { useBankStore } from "@/entities/bank/model/bankStore";
import { useUserStore } from "@/entities/user";
import VtbPointMap from "@/shared/assets/VtbPointMap.svg";
import cls from "./AllBank.module.css";
export const AllBanks = () => {
  const currentPosition = useUserStore((state) => state.currentCoords);
  const setCurrentBankId = useBankStore((state) => state.setCurrentBank);
  const { data: points, refetch } = useGetAllBanks({
    raduis: 10,
    latitude: currentPosition.latitude,
    longitude: currentPosition.longitude,
  });
  useEffect(() => {
    refetch();
  }, [currentPosition]);
  const icon = new Icon({
    iconUrl: VtbPointMap,
    iconSize: [70, 70],
  });
  const createClusterCustomIcon = function (cluster: MarkerCluster) {
    return divIcon({
      //iconUrl: VtbPointMap,
      //iconUrl: VtbPointMap,
      className: cls.marker,
      iconSize: L.point(33, 33, false),
      html: `<span style={display:block}>${cluster.getChildCount()}</span>`,
    });
  };
  return (
    <>
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {points?.map((point) => (
          <Marker
            icon={icon}
            eventHandlers={{ click: () => setCurrentBankId(point.id) }}
            key={point.id}
            position={{
              lat: point.latitude,
              lng: point.longitude,
              alt: point.id,
            }}
          ></Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
};
