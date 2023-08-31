import assert from 'assert';

import DefaultConfig from '##/config/config.default.js'

import { fileShortPath } from '#@/helper.js'
import { CI } from '#@/root.config.js'

describe(fileShortPath(import.meta.url), () => {

  it('should DefaultConfig', async () => {
    assert(DefaultConfig && typeof DefaultConfig === 'object');
    assert(typeof DefaultConfig.koa === 'object');
    // assert(DefaultConfig.koa.port === 7001); // TODO: why not work?
  });

  it('should CI eq true', async () => {
    assert(CI === true);
  });

});
