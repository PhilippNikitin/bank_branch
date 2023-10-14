import { Clusterer, Placemark } from "@pbe/react-yandex-maps";
import { memo, useState } from "react";
import { useGetAllBanks, useGetBankDetailsById } from "@/entities/bank";

export const AllBanks = () => {
  const { data: points } = useGetAllBanks({
    raduis: 10,
    latitude: 55.759073,
    longitude: 37.717201,
  });
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
      {points?.map((point) => (
        <Placemark
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
        />
      ))}
    </>
    // </Clusterer>
  );
};
