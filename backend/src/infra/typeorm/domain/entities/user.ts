import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserModel } from '../../../../domain/models';


@Entity({ name: 'user' })
export class User implements UserModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: null,
    nullable: true,
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    default: null,
    nullable: true,
    type: 'timestamp without time zone',
  })
  deletedAt: Date;
}
