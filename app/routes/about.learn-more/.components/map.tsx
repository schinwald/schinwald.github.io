import mapboxgl, { type Map } from "mapbox-gl";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "~/utils/classname";

const DISTANCE_PER_DEGREE = 111.11;

const interpolatePosition = (
  source: [number, number],
  destination: [number, number],
  t: number,
) => {
  const [sourceLongitude, sourceLatitude] = source;
  const [destinationLongitude, destinationLatitude] = destination;
  return [
    t * destinationLongitude + (1 - t) * sourceLongitude,
    t * destinationLatitude + (1 - t) * sourceLatitude,
  ];
};

type MapboxContextValue = {
  source: [number, number];
  destination: [number, number];
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
};

const MapboxContext = createContext<MapboxContextValue>({
  source: [0, 0],
  destination: [0, 0],
  distance: 0,
  setDistance: () => {},
});

const useMapbox = () => {
  const context = useContext(MapboxContext);
  if (!context)
    throw new Error("useMapbox must be used within a MapboxProvider");
  return context;
};

type MapboxProviderProps = {
  children: React.ReactNode;
  source: [number, number];
  destination: [number, number];
};

export const MapboxProvider: React.FC<MapboxProviderProps> = ({
  children,
  source,
  destination,
}) => {
  const [distance, setDistance] = useState(0);

  return (
    <MapboxContext.Provider
      value={{ source, destination, distance, setDistance }}
    >
      {children}
    </MapboxContext.Provider>
  );
};

type MapboxProps = {
  className?: string;
};

export const Mapbox: React.FC<MapboxProps> = ({ className }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  const hasEnteredRef = useRef<boolean>(null);
  const { source, destination, setDistance } = useMapbox();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2NoaW53YWxkIiwiYSI6ImNtN29iOG9rNjA5eGMyaXB3bmpwNHAzZ2QifQ.c2pxRviVec12sQf1U2Tl5Q";

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    const positions = [source, destination].filter((position) =>
      Boolean(position),
    ) as [number, number][];

    const { longitudes, latitudes } = positions.reduce(
      (accumulator, position) => {
        accumulator.longitudes.push(position[0]);
        accumulator.latitudes.push(position[1]);
        return accumulator;
      },
      {
        longitudes: [] as number[],
        latitudes: [] as number[],
      },
    );

    const bounds = {
      minLongitude: Math.min(...longitudes),
      minLatitude: Math.min(...latitudes),
      maxLongitude: Math.max(...longitudes),
      maxLatitude: Math.max(...latitudes),
    };

    const distance = {
      longitude: bounds.maxLongitude - bounds.minLongitude,
      latitude: bounds.maxLatitude - bounds.minLatitude,
    };

    const padding = {
      longitude: distance.longitude * 0.3 + 1,
      latitude: distance.latitude * 0.3 + 1,
    };

    setDistance(
      Math.sqrt(distance.longitude ** 2 + distance.latitude ** 2) *
        DISTANCE_PER_DEGREE,
    );

    mapRef.current.on("load", () => {
      if (!mapRef.current) return;
      if (hasEnteredRef.current) return;

      hasEnteredRef.current = true;

      mapRef.current.fitBounds([
        [
          bounds.minLongitude - padding.longitude,
          bounds.minLatitude - padding.latitude,
        ],
        [
          bounds.maxLongitude + padding.longitude,
          bounds.maxLatitude + padding.latitude,
        ],
      ]);

      new mapboxgl.Marker({ color: "#ff0000" })
        .setLngLat(source)
        .addTo(mapRef.current);

      new mapboxgl.Marker({ color: "#ff0000" })
        .setLngLat(destination)
        .addTo(mapRef.current);

      const coordinates = [];
      for (const t of [0, 0.25, 0.5, 0.75, 1]) {
        const coordinate = interpolatePosition(
          source,
          destination ?? source,
          t,
        );
        coordinates.push(coordinate);
      }

      mapRef.current.addSource("line", {
        type: "geojson",
        lineMetrics: true,
        data: {
          type: "Feature",
          properties: {
            color: "#ff0000",
          },
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });

      mapRef.current.addLayer({
        id: "line",
        type: "line",
        source: "line",
        paint: {
          "line-width": 2,
          "line-dasharray": [2, 1],
          "line-color": ["get", "color"],
        },
      });
    });
  }, []);

  return <div className={cn(className)} ref={mapContainerRef}></div>;
};

type MapboxDetailsProps = {
  children: (options: { distance: number }) => React.ReactNode;
};

export const MapboxDetails: React.FC<MapboxDetailsProps> = ({ children }) => {
  const { distance } = useMapbox();
  return children({ distance });
};
