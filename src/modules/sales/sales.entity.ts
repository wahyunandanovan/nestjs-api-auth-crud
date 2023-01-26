import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Products } from '../products/products.entity';

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
  @Column({ nullable: true })
  notes: string;

  @ApiProperty()
  @Column({ nullable: true })
  status: string;

  @ApiProperty()
  @Column({ default: 0 })
  total: number;

  @ApiProperty()
  @Column({ nullable: true })
  customer: string;

  @ApiProperty()
  @Column({ nullable: true })
  customerPhone: number;

  @ApiProperty()
  @Column({ nullable: true })
  customerEmail: string;

  // @ApiProperty()
  // @ManyToOne((type) => Products)
  // public items: Products;
}
