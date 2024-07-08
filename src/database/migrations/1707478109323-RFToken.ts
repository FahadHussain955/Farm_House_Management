import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RFToken1707478109323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_token',
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'token', type: 'varchar', length: '255', isUnique: true },
          { name: 'user_id', type: 'int', unsigned: true },
          
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'User',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refresh_token');
  }
}
