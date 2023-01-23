import { Controller, UploadedFile } from '@nestjs/common';
import {
  Crud,
  CrudRequest,
  CrudOptions,
  CrudController,
  Override,
  ParsedRequest,
  ParsedBody,
} from '@nestjsx/crud';

import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { Image } from './image.entity';
import { ImageService } from './image.service';

const crudOptions: CrudOptions = {
  model: {
    type: Image,
  },
  query: {
    join: {
      roles: {
        eager: true,
      },
    },
  },
  routes: {
    createOneBase: {
      interceptors: [
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        }),
      ],
    },
  },
};

@Crud(crudOptions)
@Controller('image')
@ApiTags('image')
export class ImageController implements CrudController<Image> {
  constructor(public service: ImageService) {}

  get base(): CrudController<Image> {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Image,
    @UploadedFile() file,
  ) {
    dto.name = file.filename;
    return this.base.createOneBase(req, dto);
  }
}
