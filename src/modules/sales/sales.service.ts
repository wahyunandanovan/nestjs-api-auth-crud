import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sales } from './sales.entity';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class SalesService extends TypeOrmCrudService<Sales> {
  constructor(@InjectRepository(Sales) repo) {
    super(repo);
  }
  async createOne(req: CrudRequest, dto: Sales) {
    return super.createOne(req, dto);
  }
}
