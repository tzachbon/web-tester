import { defineHost } from '@web-tester/core';
import { mochaHooksPlugin } from './plugins/mocha';
import { portsPlugin } from './plugins/ports';

export const e2eHost = defineHost({
  name: 'e2e',
  dependencies: [portsPlugin, mochaHooksPlugin],
  hooks() {
    return {
      start({ mochaHooks, ports }) {
        let port: number;

        mochaHooks.beforeEach(async () => {
          port = await ports.ensure();
          console.log(port);
        });

        mochaHooks.afterEach(async () => {
          await ports.release();
        });

        mochaHooks.after(async () => {
          await ports.dispose();
        });

        mochaHooks.registerHooks();
      },
    };
  },
});

e2eHost.start();
