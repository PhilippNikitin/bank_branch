import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet-routing-machine";
import "./addRoute.css";
type createRoutineMachineLayerType = {
  waypoints: [number, number][];
};

const createRoutineMachineLayer = (props) => {
  const { waypoints } = props;

  const instance = L.Routing.control({
    itineraryClassName:
      ".leaflet-control-container .leaflet-routing-container-hide ",

    waypoints: waypoints,
    show: false,
    addWaypoints: false,
    useZoomParameter: true,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: true,
    draggableWaypoints: false,
  });

  return instance;
};

export const RoutingMachine = createControlComponent(createRoutineMachineLayer);
