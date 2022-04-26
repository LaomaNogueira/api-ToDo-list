import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { User } from './user';
import { TaskModel } from '../../../../domain/models';

@Entity({ name: 'task' })
export class Task implements TaskModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ name: 'end_date', nullable: false, })
  endDate: Date;

  @Column({ nullable: false })
  category: string;

  @Column({ default: false })
  done: boolean;

  @Column({ name: 'user_id', nullable: false})
  userId: string;

  @ManyToOne(() => User, user => user.id, {
    nullable: true,
    eager: true
  })
  @JoinColumn({ name: 'user_id' })
  user: string;

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
