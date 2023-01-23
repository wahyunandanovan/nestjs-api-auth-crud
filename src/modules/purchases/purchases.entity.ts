import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column({ default: 0 })
  price: number;

  @ApiProperty()
  @Column()
  supplier: string;

  @ApiProperty()
  @Column({ nullable: true })
  supplierPhone: number;

  @ApiProperty()
  @Column({ nullable: true })
  supplierEmail: string;

  @ApiProperty()
  @Column('simple-array')
  items: string[];

  @ApiProperty()
  @Column({ nullable: true })
  description: string;
}
