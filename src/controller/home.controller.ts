import { Controller, Fields, File, Get, Inject, Post } from '@midwayjs/core';
import { UploadFileInfo } from '@midwayjs/upload';
import { createWriteStream } from 'fs';
import { join } from 'path';

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
    const writeableStrema = createWriteStream(join(this.appDir, 'tmp', file.filename));
    const end = new Promise<void>(resolve => {
      file.data.pipe(writeableStrema);
      writeableStrema.on('close', () => {
        resolve()
      });
    });

    await end;

    return 'ok';
    
    // return {
    //   files,
    //   fields
    // }
  }
}
