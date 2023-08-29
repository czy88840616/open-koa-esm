import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
// import { DefaultErrorFilter } from './filter/default.filter.js';
// import { NotFoundFilter } from './filter/notfound.filter.js';
import { ReportMiddleware } from '#middleware/report.middleware.js';
import DefulatConfig from './config/config.default.js';
import UnittestConfig from './config/config.unittest.js';
import * as orm from '@midwayjs/typeorm';
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

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);

    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
