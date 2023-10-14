import L from "leaflet";
import "leaflet-routing-machine";

type CreateRoutineMachineLayerType = {
    itineraryClassName: string
}
export const createRoutineMachineLayer = (props: CreateRoutineMachineLayerType) => {
    const { itineraryClassName } = props
    const instance = L.Routing.control({
        itineraryClassName:
            itineraryClassName,
        waypoints: [

        ],
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
    });

    return instance;
};