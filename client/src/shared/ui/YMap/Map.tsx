import {
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";
import { useRef, useCallback, useState, useEffect } from "react";

import { AllBanksWithYMap } from "@/features/bank";
import { addRoute } from "@/features/mapRoute/addRoute/ui/RoutingMachine";
import { useGetAllBanks } from "@/entities/bank";
import { useUserStore } from "@/entities/user";
import cls from "./Map.module.css";
type YMapProps = {
  apiKey: string;
  defaultState: {
    center: [number, number];
    zoom: number;
  };
};
export const YMap = (props: YMapProps) => {
  const { apiKey } = props;
  const map = useRef<ymaps.Map>();

  const currentPosition = useUserStore((state) => state.currentCoords);
  const setCurrentPosition = useUserStore((state) => state.setCurrentCoords);

  const route = useCallback(
    (ymap: YMapsApi) =>
      addRoute({
        pointA: [55.749, 37.524],
        pointB: [currentPosition.latitude, currentPosition.longitude],
        routingMode: "auto",
        map: map.current,
        ymaps: ymap,
      }),
    [currentPosition.latitude, currentPosition.longitude]
  );

  return (
    <YMaps query={{ apikey: apiKey }}>
      <Map
        modules={["multiRouter.MultiRoute", "SuggestView"]}
        defaultState={{ center: [55.751574, 37.573856], zoom: 11 }}
        className={cls.map}
        options={{
          yandexMapDisablePoiInteractivity: true,
          copyrightUaVisible: false,
          copyrightLogoVisible: false,
          copyrightProvidersVisible: false,
          autoFitToViewport: "always",
          suppressMapOpenBlock: true,
        }}
        instanceRef={map}
        onLoad={route}
      >
        <AllBanksWithYMap />
        <ZoomControl
          options={{
            size: "small",
            position: {
              right: "16px",
              bottom: "200px",
            },
          }}
        />

        <GeolocationControl
          onClick={() =>
            navigator?.geolocation?.getCurrentPosition((data) => {
              setCurrentPosition({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
              });
              console.log(currentPosition);
            })
          }
          options={{
            position: { right: "16px", bottom: "164px" },
          }}
        />
      </Map>
    </YMaps>
  );
};
