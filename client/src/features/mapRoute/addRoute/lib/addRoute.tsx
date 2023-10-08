import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";

type AddRouteProps = {
  pointA: [number, number];
  pointB: [number, number];
  routingMode: "auto" | "masstransit" | "pedestrian" | undefined;
  ymaps?: YMapsApi;
  map: ymaps.Map | undefined;
};

export const addRoute = ({
  map,
  ymaps,
  pointA,
  pointB,
  routingMode,
}: AddRouteProps) => {
  const multiRoute = ymaps
    ? new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [pointA, pointB],
          params: {
            routingMode: routingMode,
          },
        },

        {
          boundsAutoApply: true,
        }
      )
    : undefined;
  if (multiRoute) map?.geoObjects?.add(multiRoute);
};
