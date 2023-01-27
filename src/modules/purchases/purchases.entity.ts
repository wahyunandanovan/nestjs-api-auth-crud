import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Products } from '../products/products.entity';
import { Suppliers } from '../supplier/supplier.entity';

class Items {
  @ApiProperty()
  product_id: number;

  @ApiProperty()
  product: Products;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  total: number;
}

@Entity()
export class Purchases {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  public created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  public updated_at: Date;

  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column()
  total: number;

  @ApiProperty()
  @Column()
  supplier_id: number;

  @ManyToOne(() => Suppliers, (supplier) => supplier.id)
  @JoinColumn({ name: 'supplier_id' })
  suppliers: Suppliers;

  @ApiProperty()
  @Column({ nullable: true })
  notes: string;

  @ApiProperty({
    isArray: true,
    type: Items,
  })
  @Column('longtext')
  items: string;
}
