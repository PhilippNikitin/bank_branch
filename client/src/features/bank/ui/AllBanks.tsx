import { Clusterer, Placemark } from "@pbe/react-yandex-maps";
import { Icon, divIcon, point } from "leaflet";
import L from "leaflet";
import { MarkerCluster } from "leaflet";
import { memo, useState } from "react";
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
  const [bankId, setBankId] = useState(0);
  const { data, refetch } = useGetBankDetailsById(bankId);
  const showBankDetails = (bankId: number) => {
    setBankId(bankId);
    refetch();
    console.log(data);
  };
  return (
    // <Clusterer
    //   options={{
    //     preset: "islands#invertedVioletClusterIcons",
    //     groupByCoordinates: false,
    //   }}
    // >
    <>
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {points?.map((point) => (
          <Marker
            icon={icon}
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
    // </Clusterer>
  );
};
{
  /* <Placemark
onClick={() => showBankDetails(point.id)}
properties={{ id: point.id }}
options={{
  iconLayout: "default#image",
  // iconImageHref: "VtbPointMap.svg",
  iconImageSize: [32, 32],
  // Смещение левого верхнего угла иконки относительно
  // её "ножки" (точки привязки).
  iconImageOffset: [-65, -110],
}}
// instanceRef={(ref) => {
//   if (ref) ref.events.add("click", (event) => showBankDetails(event));
// }}
key={point.id}
geometry={[point?.latitude, point?.longitude]} // Координаты точки [широта, долгота]
/> */
}
