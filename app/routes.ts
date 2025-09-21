import type { RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";

export default remixRoutesOptionAdapter((defineRoutes) =>
  flatRoutes("routes", defineRoutes, {
    ignoredRouteFiles: [
      "**/server/**",
      "**/components/**",
      "**/schemas/**",
      "**/meta",
    ], // ignore server, components, schemas dirs and meta files
  }),
) satisfies RouteConfig;
