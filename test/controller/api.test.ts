import { createHttpRequest } from '@midwayjs/mock';
import { Application } from '@midwayjs/koa';
import assert from 'assert';

import { fileShortPath } from '#@/helper.js'
import { getApp } from '#@/setup.mjs';

describe(fileShortPath(import.meta.url), () => {

  it('should POST /api/get_user', async function (this: any) {
    const app: Application = getApp();
    // make request
    const result = await createHttpRequest(app).get('/api/get_user').query({ uid: 123 });

    // use expect by jest
    assert(result.status ===200);
    assert(result.body.message === 'OK');
  });
});
