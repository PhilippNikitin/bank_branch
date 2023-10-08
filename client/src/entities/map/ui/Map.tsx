import { Map, YMaps } from "@pbe/react-yandex-maps";
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";
import { useRef } from "react";

export const YMap = () => {
  const map = useRef<ymaps.Map>();

  const mapState = {
    center: [55.739625, 37.5412],
    zoom: 12,
  };
  const addRoute = (ymaps: YMapsApi) => {
    const pointA = [55.749, 39]; // Москва
    const pointB = [59.918072, 30.304908]; // Санкт-Петербург
    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: {
          routingMode: "pedestrian",
        },
      },

      {
        boundsAutoApply: true,
      }
    );

    map?.current?.geoObjects?.add(multiRoute);
  };
  return (
    <YMaps query={{ apikey: import.meta.env.VITE_APP_API_KEY }}>
      <input id="suggest" />
      <Map
        modules={["multiRouter.MultiRoute", "SuggestView"]}
        state={mapState}
        instanceRef={map}
        onLoad={addRoute}
        width={"100vw"}
        height={"100vh"}
      ></Map>
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      {/* <Routing /> */}
    </YMaps>
  );
};
