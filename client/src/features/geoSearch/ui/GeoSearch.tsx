import { GeoSearchControl } from "leaflet-geosearch";
import AbstractProvider from "leaflet-geosearch/dist/providers/provider";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
type SearchType = {
  provider: AbstractProvider;
};
// make new leaflet element
export const Search = (props: SearchType) => {
  const map = useMap();

  const { provider } = props;

  useEffect(() => {
    const searchControl = GeoSearchControl({
      style: "bar",
      provider,
    });

    map.addControl(searchControl); // this is how you add a control in vanilla leaflet
    return () => {
      map.removeControl(searchControl);
    };
  }, [map, props, provider]);

  return null; // don't want anything to show up from this comp
};
