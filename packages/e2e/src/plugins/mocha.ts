import { definePlugin } from '@web-tester/core';
import { beforeEach, after, afterEach } from 'mocha';

type Callback = () => Promise<void> | void;

export const mochaHooksPlugin = definePlugin({
  name: 'mochaHooks',
  defineApi() {
    const beforeEachCallbacks = new Set<Callback>();
    const afterEachCallbacks = new Set<Callback>();
    const afterCallbacks = new Set<Callback>();
    return {
      registerHooks() {
        beforeEach(async () => {
          for (const callback of beforeEachCallbacks) {
            await callback();
          }
        });

        afterEach(async () => {
          for (const callback of afterEachCallbacks) {
            await callback();
          }
        });

        after(async () => {
          for (const callback of afterCallbacks) {
            await callback();
          }
        });
      },
      beforeEach(cb: Callback) {
        beforeEachCallbacks.add(cb);
      },
      afterEach(cb: Callback) {
        afterEachCallbacks.add(cb);
      },
      after(cb: Callback) {
        afterCallbacks.add(cb);
      },
    };
  },
});
