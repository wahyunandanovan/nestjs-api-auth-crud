import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersController } from './supplier.controller';
import { Suppliers } from './supplier.entity';
import { SuppliersService } from './supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Suppliers])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
