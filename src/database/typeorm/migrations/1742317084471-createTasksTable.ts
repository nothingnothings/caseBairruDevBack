import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTasksTable1742317084471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'list_id', // one-to-many-relation needed.
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'label',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'finished_at',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'FK_list_id',
        columnNames: ['list_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lists',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tasks', 'FK_list_id');
    await queryRunner.dropTable('tasks');
  }
}
