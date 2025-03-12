import {  index, route } from "@react-router/dev/routes";
import type {RouteConfig} from "@react-router/dev/routes";

export default [
  index("routes/settings.tsx"),
  route("game", "routes/game.tsx"),
] satisfies RouteConfig;
