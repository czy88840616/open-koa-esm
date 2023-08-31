import { Controller, Fields, File, Get, Inject, Post } from '@midwayjs/core';
import { UploadFileInfo } from '@midwayjs/upload';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';

@Controller('/')
export class HomeController {

  @Inject()
  appDir: string;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
  @Post('/upload')
  async upload(@File() file: UploadFileInfo<ReadableStream>, @Fields() fields) {
    console.log(file.filename);
    if (file.data instanceof Readable) {
      // 流式上传
      const writeableStrema = createWriteStream(join(this.appDir, 'tmp', file.filename));
      const end = new Promise<void>(resolve => {
        file.data.pipe(writeableStrema);
        writeableStrema.on('close', () => {
          resolve()
        });
      });

      await end;
    } else {
      // 普通上传到临时目录
    }
    
    return 'ok';
    
    // return {
    //   files,
    //   fields
    // }
  }
}
