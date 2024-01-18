import { Equal, Expect } from "../helpers/type-utils";

type UserPath = "/users/:id";

type UserOrganisationPath = "/users/:id/organisations/:organisationId";

type ValidatePath<P> = P extends `:${string}` ? P : never;

type SplitPathSegments<P> = P extends `${infer First}/${infer Rest}`
  ? [ValidatePath<First>, ...SplitPathSegments<Rest>]
  : [ValidatePath<P>];

type ValidPaths<T> = SplitPathSegments<T>[number];

type ToPathParams<P extends string> = {
  [K in ValidPaths<P> as K extends `:${infer Key}` ? Key : never]: string;
};

type ExtractPathParams<T extends string> = ToPathParams<T>;

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
];
