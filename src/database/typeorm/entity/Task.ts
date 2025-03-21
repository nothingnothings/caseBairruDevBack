import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from './List';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'list_id', type: 'int', nullable: false })
  listId: number;

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

  @ManyToOne(() => List, (list) => list.tasks)
  @JoinColumn({ name: 'list_id', referencedColumnName: 'id' })
  list: List;
}
