import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Customers } from './customers.entity';

@Injectable()
export class CustomersService extends TypeOrmCrudService<Customers> {
  constructor(@InjectRepository(Customers) repo) {
    super(repo);
  }
  async createOne(req: CrudRequest, dto: Customers) {
    return super.createOne(req, dto);
  }
}
