import { Configuration, App, Inject } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
// import { DefaultErrorFilter } from './filter/default.filter.js';
// import { NotFoundFilter } from './filter/notfound.filter.js';
import { ReportMiddleware } from '#middleware/report.middleware.js';
import DefulatConfig from './config/config.default.js';
import UnittestConfig from './config/config.unittest.js';
import * as orm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
// import { join } from 'node:path';
// import { dirname } from 'node:path'
// import { fileURLToPath } from 'node:url'

// const __dirname = dirname(fileURLToPath(import.meta.url))

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    upload,
  ],
  importConfigs: [
    // join(__dirname, 'config'),
    {
      default: DefulatConfig,
      unittest: UnittestConfig,
    }
  ],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  @Inject()
  appDir: string;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);

    if (!existsSync(join(this.appDir, 'tmp'))) {
      // 创建文件夹
      mkdirSync(join(this.appDir, 'tmp'));
    }

    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
