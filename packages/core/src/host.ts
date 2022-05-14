import type { Dependencies, ReduceDataFromDeps } from './plugin';
import { depsToMapDeps, sortByDependency } from './sort-by-dependency';

export interface Host<Deps extends Dependencies, StartReturnType = any, EndReturnType = any> {
  name: string;
  dependencies: Deps;
  hooks(): {
    start: (deps: ReduceDataFromDeps<Deps>) => StartReturnType;
    stop?: (deps: ReduceDataFromDeps<Deps>) => EndReturnType;
  };
}

export function defineHost<Deps extends Dependencies, StartReturnType, EndReturnType>(
  host: Host<Deps, StartReturnType, EndReturnType>
) {
  const apis: Record<string, object> = {};
  const lifeCycles = host.hooks();

  return {
    async start() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const sortedDependencies = sortByDependency(depsToMapDeps(host.dependencies));
      console.log(sortedDependencies);

      for (const dep of sortedDependencies) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const api = (await dep.defineApi(apis)) as object;

        if (api) {
          apis[dep.name] = api;
        }
      }

      return lifeCycles.start(apis as ReduceDataFromDeps<Deps>);
    },
    stop() {
      return lifeCycles.stop?.(apis as ReduceDataFromDeps<Deps>);
    },
  };
}
