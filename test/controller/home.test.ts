import { createHttpRequest } from '@midwayjs/mock';
import { Application } from '@midwayjs/koa';
import assert from 'assert';

import { fileShortPath } from '#@/helper.js'
import { getApp } from '#@/setup.mjs';

describe(fileShortPath(import.meta.url), () => {

  it('should GET /', async () => {
    const app: Application = getApp();
    // make request
    const result = await createHttpRequest(app).get('/');

    // use expect by jest
    assert(result.status === 200);
    assert(result.text === 'Hello Midwayjs!');
  });

});
