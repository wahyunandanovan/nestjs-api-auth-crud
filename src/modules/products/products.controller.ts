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
import { Products } from './products.entity';
import { ProductsService } from './products.service';

const crudOptions: CrudOptions = {
  model: {
    type: Products,
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
        FileInterceptor('image', {
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
@Controller('products')
@ApiTags('products')
export class ProductsController implements CrudController<Products> {
  constructor(public service: ProductsService) {}

  get base(): CrudController<Products> {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Products,
    @UploadedFile() file,
  ) {
    dto.image = file?.filename;
    return this.base.createOneBase(req, dto);
  }
}
