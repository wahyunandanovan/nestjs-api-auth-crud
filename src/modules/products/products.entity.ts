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
import { Category } from '../category/category.entity';
import { Suppliers } from '../supplier/supplier.entity';

@Entity()
export class Products {
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
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  image: string;

  @ApiProperty()
  @Column()
  unit: string;

  @ApiProperty()
  @Column({ default: 0 })
  purchase_price: number;

  @ApiProperty()
  @Column({ default: 0 })
  sell_price: number;

  @ApiProperty()
  @Column({ default: 0 })
  stock: number;

  @ApiProperty()
  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty()
  @Column()
  supplier_id: number;

  @ManyToOne(() => Suppliers, (supplier) => supplier.id)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Suppliers;
}
