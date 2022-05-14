import { definePlugin } from '@web-tester/core';
import { nodeFs } from '@file-services/node';

export const fileSystemPlugin = definePlugin({
  name: 'fileSystem',
  defineApi() {
    return {
      nodeFs,
    };
  },
});
