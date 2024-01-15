// Might come in handy!
import { S } from "ts-toolbelt";
// https://millsp.github.io/ts-toolbelt/modules/string_split.html

import { Equal, Expect } from "../helpers/type-utils";

type Path = "Users/John/Documents/notes.txt";

type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Lead}${Delimiter}${infer Rest}`
  ? [Lead, ...Split<Rest, Delimiter>]
  : [S];

type SplitPath = Split<Path, "/">;

type tests = [
  Expect<Equal<SplitPath, ["Users", "John", "Documents", "notes.txt"]>>
];
