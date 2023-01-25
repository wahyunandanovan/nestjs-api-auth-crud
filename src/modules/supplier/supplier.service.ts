import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Suppliers } from './supplier.entity';

@Injectable()
export class SuppliersService extends TypeOrmCrudService<Suppliers> {
  constructor(@InjectRepository(Suppliers) repo) {
    super(repo);
  }
  async createOne(req: CrudRequest, dto: Suppliers) {
    return super.createOne(req, dto);
  }
}
