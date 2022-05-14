import type { TypedRecord } from 'typed-record';
// import type { Plugin } from './plugin';
// import { sortByDependency } from './sort-by-dependency';

export type Context = Pick<TypedRecord, 'get' | 'has'> & {
  lifeCycle: 'beforeAll' | 'before' | 'after' | 'afterAll';
};

// export type PluginApis = Map<Key<any>, Omit<Plugin<any>, 'data'>>;

// export type PluginWithKey<T extends object> = Plugin<T> & { key: Key<T> };

// export class WebTester {
//   private pluginsData = new TypedRecord();
//   public _pluginsApis: PluginApis = new Map();
//   public pluginsApis: PluginApis | undefined;

//   private createContext(lifeCycle: Context['lifeCycle']): Context {
//     return {
//       lifeCycle,
//       get: this.pluginsData.get.bind(this.pluginsData),
//       has: this.pluginsData.has.bind(this.pluginsData),
//     };
//   }

//   register<T extends object>(key: Key<T>, plugin: Plugin<T>) {
//     this._pluginsApis.set(key, plugin);

//     return key;
//   }

//   public preparePlugins() {
//     const plugins = sortByDependency(this._pluginsApis);
//     this.pluginsApis = plugins;
//   }

//   async beforeAll() {
//     if (!this.pluginsApis) {
//       throw pluginNotPreparedError();
//     }

//     const context = this.createContext('beforeAll');

//     for (const [key, plugin] of this.pluginsApis) {
//       await plugin.beforeAll?.(context, context.get(key));
//     }
//   }

//   async before() {
//     if (!this.pluginsApis) {
//       throw pluginNotPreparedError();
//     }

//     const context = this.createContext('before');

//     for (const [key, plugin] of this.pluginsApis) {
//       await plugin.before?.(context, context.get(key));
//     }
//   }

//   async after() {
//     if (!this.pluginsApis) {
//       throw pluginNotPreparedError();
//     }

//     const context = this.createContext('after');

//     for (const [key, plugin] of this.pluginsApis) {
//       await plugin.after?.(context, context.get(key));
//     }
//   }

//   async afterAll() {
//     if (!this.pluginsApis) {
//       throw pluginNotPreparedError();
//     }

//     const context = this.createContext('afterAll');

//     for (const [key, plugin] of this.pluginsApis) {
//       await plugin.afterAll?.(context, context.get(key));
//     }
//   }
// }

// const pluginNotPreparedError = () => new Error('Plugins not prepared');
