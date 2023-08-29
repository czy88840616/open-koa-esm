import { createApp, close } from '@midwayjs/mock';
import { join } from 'path';

let app;
export async function mochaGlobalSetup() {
  process.env.MIDWAY_TS_MODE = 'false';
  // create app
  app = await createApp({
    appDir: process.cwd(),
    baseDir: join(process.cwd(), 'dist'),
  });
}

export async function mochaGlobalTeardown() {
  await close(app);
};

export function getApp() {
  return app;
}