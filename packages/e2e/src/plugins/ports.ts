import { definePlugin } from '@web-tester/core';
import { Ports } from 'ensure-port';
import { fileSystemPlugin } from './file-system/file-system';

export const portsPlugin = definePlugin({
  name: 'ports',
  dependencies: [fileSystemPlugin],
  defineApi({ fileSystem }) {
    const ports = new Ports({ startPort: 8000, endPort: 9000 }, { fs: fileSystem.nodeFs });

    return {
      ensure: () => ports.ensure(),
      release: () => ports.release(),
      dispose: () => ports.dispose(),
    };
  },
});
