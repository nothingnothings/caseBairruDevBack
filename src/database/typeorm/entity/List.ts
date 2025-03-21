import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';
import { Task } from './Task';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'label', type: 'varchar', nullable: false })
  label: string;

  @Column({
    name: 'finished_at',
    type: 'timestamptz',
    nullable: true, // when false, list is still not finished.
  })
  finishedAt: Date | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date | null; // when null, list is still not deleted.

  @ManyToOne(() => User, (user) => user.lists)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];
}
