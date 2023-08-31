import { MidwayConfig } from '@midwayjs/core';
import path from 'path';
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1692459102696_8922',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: path.join(__dirname, '../../test.sqlite'),
        synchronize: true,
        logging: true,
        // ...
        entities: [
          '**/entity/*.entity{.ts,.js}'
        ]
      }
    }
  },
  upload: {
    mode: 'stream',
    tmpdir: path.join(__dirname, '../../tmp'),
    // whitelist: [],
  }
} as MidwayConfig;
