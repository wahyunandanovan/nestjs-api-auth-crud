import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Purchases } from './purchases.entity';

@Injectable()
export class PurchasesService extends TypeOrmCrudService<Purchases> {
  constructor(@InjectRepository(Purchases) repo) {
    super(repo);
  }
}
