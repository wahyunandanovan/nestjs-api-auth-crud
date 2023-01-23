import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService extends TypeOrmCrudService<Image> {
  constructor(@InjectRepository(Image) repo) {
    super(repo);
  }
}
