import { Key, TypedRecord } from 'typed-record';
import type { MapBy } from './types';

export type Dependencies<Data = any> = PluginDefinition<Data, any[], any>[];

type DefineAPI<Deps extends Dependencies, Data = any> = (
  dependencies: ReduceDataFromDeps<Deps>
) => Promise<Data> | Data;

export type ReduceDataFromDeps<Deps extends Dependencies, Keys extends MapBy<Deps, 'name'> = MapBy<Deps, 'name'>> = {
  [K in keyof Keys]: Keys[K]['defineApi'] extends undefined
    ? undefined
    : Awaited<ReturnType<NonNullable<Keys[K]['defineApi']>>>;
};

export interface PluginDefinition<
  Data,
  Deps extends Dependencies,
  DefAPI extends DefineAPI<Deps, Data>,
  Name extends string = string
> {
  key: Key<Data>;
  name: Name;
  dependencies?: Deps;
  defineApi?: DefAPI;
}

export function definePlugin<
  Name extends string,
  Deps extends Dependencies,
  DefAPI extends DefineAPI<Deps>,
  Data extends Awaited<ReturnType<DefAPI>>
>(plugin: Omit<PluginDefinition<Data, Deps, DefAPI, Name>, 'key'>): PluginDefinition<Data, Deps, DefAPI, Name> {
  const key = TypedRecord.key<Data>(plugin.name);

  return {
    key,
    ...plugin,
  };
}
