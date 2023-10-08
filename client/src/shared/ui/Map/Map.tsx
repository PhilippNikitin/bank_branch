import {
  GeolocationControl,
  Map,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";
import { useRef } from "react";

import { addRoute } from "@/features/mapRoute/addRoute/lib/addRoute";
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
  const route = (ymap: YMapsApi) =>
    addRoute({
      pointA: [55.749, 37.524],
      pointB: [59.918072, 30.304908],
      routingMode: "auto",
      map: map.current,
      ymaps: ymap,
    });

  return (
    <YMaps query={{ apikey: apiKey }}>
      <Map
        modules={["multiRouter.MultiRoute", "SuggestView"]}
        defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
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
          options={{
            position: { right: "16px", bottom: "164px" },
          }}
        />
      </Map>
    </YMaps>
  );
};
