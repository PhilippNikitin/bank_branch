import { Clusterer, Placemark } from "@pbe/react-yandex-maps";
import { Icon, divIcon, point } from "leaflet";
import L from "leaflet";
import { MarkerCluster } from "leaflet";
import { memo, useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useGetAllBanks, useGetBankDetailsById } from "@/entities/bank";
import VtbPointMap from "@/shared/assets/VtbPointMap.svg";
import cls from "./AllBank.module.css";
export const AllBanks = () => {
  const { data: points } = useGetAllBanks({
    raduis: 10,
    latitude: 55.759073,
    longitude: 37.717201,
  });

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
            eventHandlers={{ click: () => showBankDetails(point.id) }}
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
