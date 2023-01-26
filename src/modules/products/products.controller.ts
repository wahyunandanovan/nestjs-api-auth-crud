import { Controller, UploadedFile, UseGuards } from '@nestjs/common';
import {
  Crud,
  CrudRequest,
  CrudOptions,
  CrudController,
  ParsedRequest,
  ParsedBody,
  Override,
} from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Products } from './products.entity';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';

const crudOptions: CrudOptions = {
  model: {
    type: Products,
  },
  query: {
    join: {
      roles: {
        eager: true,
      },
      category: {
        eager: true,
      },
      supplier: {
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
              return cb(null, `${randomName}-${file.originalname}`);
            },
          }),
        }),
      ],
    },
    updateOneBase: {
      interceptors: [
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}-${file.originalname}`);
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
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
    dto.image = `${process.env.HOSTNAME}/files/${file?.filename}`;
    return this.base.createOneBase(req, dto);
  }

  @Override()
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Products,
    @UploadedFile() file,
  ) {
    dto.image = `${process.env.HOSTNAME}/files/${file?.filename}`;
    return this.base.updateOneBase(req, dto);
  }
}
