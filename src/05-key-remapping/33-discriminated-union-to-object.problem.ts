import { Equal, Expect } from "../helpers/type-utils";

type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

type RoutesObject = {
  [R in Route as R extends { route: infer TRoute }
    ? TRoute
    : never]: R extends { search: infer TSearch } ? TSearch : never;
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": {};
        "/admin": {};
        "/admin/users": {};
      }
    >
  >
];
