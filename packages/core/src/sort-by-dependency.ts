/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Key } from 'typed-record';
import type { Dependencies, PluginDefinition } from './plugin';

export function depsToMapDeps(deps: Dependencies) {
  return new Map(deps.map((dep) => [dep.key, dep]));
}

export function sortByDependency<Deps extends Dependencies>(
  dependencies: Map<Key<any>, PluginDefinition<any, Dependencies, any>>,
  rankedDependencies = new Map<Key<any>, number>()
): Deps {
  for (const [key, dependency] of dependencies) {
    rankedDependencies.set(
      key,
      getRank(
        dependency.key,
        dependency.dependencies
          ? depsToMapDeps(dependency.dependencies)
          : new Map<Key<any>, PluginDefinition<any, any[], any>>(),
        rankedDependencies,
        dependencies
      )
    );

    if (dependency.dependencies) {
      for (const dep of dependency.dependencies) {
        dependencies.set(dep.key, dep);
      }

      sortByDependency(depsToMapDeps(dependency.dependencies), rankedDependencies);
    }
  }

  const sortedDependencies = Array.from(rankedDependencies.entries()).sort(([, a], [, b]) => a - b);
  return sortedDependencies.map(([key]) => dependencies.get(key)!) as Deps;
}

function getRank(
  key: Key<any>,
  dependencies: Map<Key<any>, PluginDefinition<any, Dependencies, any>>,
  ranks: Map<Key<any>, number>,
  allDependencies: Map<Key<any>, PluginDefinition<any, Dependencies, any>>
): number {
  let rank = ranks.get(key) ?? 0;

  for (const [key, dep] of dependencies) {
    rank = Math.max(
      getRank(
        key,
        dep.dependencies
          ? depsToMapDeps(dep.dependencies)
          : new Map<Key<any>, PluginDefinition<any, Dependencies, any>>(),
        ranks,
        allDependencies
      ) + 1,
      rank
    );
  }

  return rank;
}
