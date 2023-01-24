import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ApiProperty()
  @Column()
  customer: string;

  @ApiProperty()
  @Column({ nullable: true })
  customerPhone: number;

  @ApiProperty()
  @Column({ nullable: true })
  customerEmail: string;

  @ApiProperty()
  @Column('simple-array')
  items: string[];

  @ApiProperty()
  @Column({ nullable: true })
  notes: string;
}
