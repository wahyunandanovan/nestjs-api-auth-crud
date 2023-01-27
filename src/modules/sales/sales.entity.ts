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
import { Customers } from '../customers/customers.entity';
import { Products } from '../products/products.entity';

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
export class Sales {
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
  @Column({ default: 0 })
  total: number;

  @ApiProperty({ default: 1 })
  @Column({ default: 1 })
  customer_id: number;

  @ManyToOne(() => Customers, (customer) => customer.id)
  @JoinColumn({ name: 'customer_id' })
  customers: Customers;

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
